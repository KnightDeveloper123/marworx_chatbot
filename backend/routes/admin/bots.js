const express = require('express');
const router = express.Router();
const connection = require('../../database/db');
const executeQuery = require('../../utils/executeQuery');
// const multer = require('multer')
const { middleware } = require('../../middleware/middleware');


const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../../uploads');
    console.log('Upload path:', path.join(__dirname, '../../uploads'));

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const { fileName } = req.query;
    console.log("file", fileName)
    if (!fileName) return cb(new Error('fileName is required'), null);
    cb(null, fileName + path.extname(file.originalname));
  }
});

const upload = multer({ storage });
router.post('/upload-image', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      console.error("No file uploaded");
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const originalName = req.query.fileName; // from frontend (without extension)
    const baseName = path.basename(originalName, path.extname(originalName)); // removes extension
    const extension = path.extname(req.file.originalname); // ✅ use req.file here

    const fileName = `${Date.now()}-${baseName}${extension}`;

    // Move file to uploads directory with new name
    const fs = require("fs");
    const uploadPath = path.join(__dirname, "../../uploads", fileName);

    fs.rename(req.file.path, uploadPath, (err) => {
      if (err) {
        console.error("Rename failed:", err);
        return res.status(500).json({ error: "File rename failed" });
      }

      return res.json({ success: true, fileName });
    });

  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Server Error" });
  }
});

const sheetStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const sheetPath = path.join(__dirname, '../../uploadFiles');
    if (!fs.existsSync(sheetPath)) {
      fs.mkdirSync(sheetPath, { recursive: true });
    }
    cb(null, sheetPath);
  },
  filename: (req, file, cb) => {
    const { fileName } = req.query;
    if (!fileName) return cb(new Error('fileName is required'), null);
    cb(null, fileName + path.extname(file.originalname));
  }
});
const uploadSheet = multer({ storage: sheetStorage });


router.post('/upload-sheet', uploadSheet.single('file'), (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const originalName = req.query.fileName;
    const baseName = path.basename(originalName, path.extname(originalName));
    const extension = path.extname(req.file.originalname);
    const fileName = `${Date.now()}-${baseName}${extension}`;

    const finalPath = path.join(__dirname, "../../uploadFiles", fileName);

    fs.rename(req.file.path, finalPath, (err) => {
      if (err) return res.status(500).json({ error: "File rename failed" });
      return res.json({ success: true, fileName });
    });

  } catch (error) {
    console.error("GoogleSheet upload error:", error);
    res.status(500).json({ error: "Server Error" });
  }
});


const videoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const videoPath = path.join(__dirname, '../../videoFiles');
    if (!fs.existsSync(videoPath)) {
      fs.mkdirSync(videoPath, { recursive: true });
    }
    cb(null, videoPath);
  },
  filename: (req, file, cb) => {
    const { fileName } = req.query;
    if (!fileName) return cb(new Error('Missing fileName query parameter'), null);
    const ext = path.extname(file.originalname);
    cb(null, `${fileName}${ext}`);
  }
});

const uploadVideo = multer({
  storage: videoStorage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("video/")) {
      cb(null, true);
    } else {
      cb(new Error("Only video files are allowed"));
    }
  },
});

router.post('/upload-video', (req, res) => {
  uploadVideo.single('video')(req, res, (err) => {
    if (err instanceof multer.MulterError || err) {
      console.error("🚨 Multer upload error:", err.message);
      return res.status(400).json({ error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    res.json({ fileName: req.file.filename });
  });
});

router.post('/upload-video', uploadVideo.single('video'), (req, res) => {
  res.json({ fileName: req.file.filename });
});

router.post('/add', async (req, res) => {
  const { flowName, nodes, edges, sector_id, bot_type, admin_id } = req.body;
  const checkResult = await executeQuery(`SELECT * FROM bots WHERE name = ?`, [flowName]);
  if (checkResult.length > 0) {
    return res.status(400).json({ error: "Bot name already exists." });
  }
  const sql = `INSERT INTO bots(name, nodes, edges,sector_id,bot_type, admin_id) VALUES (?, ?, ?, ?, ?, ?)`;
  connection.query(sql, [flowName, JSON.stringify(nodes), JSON.stringify(edges), sector_id, bot_type, admin_id], (err, result) => {
    if (err) {
      console.error('Error saving flow:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    res.status(200).json({ message: 'Bot saved successfully.', flowId: result.insertId });
  });
});

router.get('/getAll', async (req, res) => {
  try {
    const { admin_id } = req.query;
    const data = await executeQuery(`SELECT 
    bots.*, 
    sector.id AS sectorId, 
    sector.name AS sector_name
  FROM bots
  LEFT JOIN sector ON bots.sector_id = sector.id
  WHERE bots.admin_id = ${admin_id} AND bots.status = 0 ORDER BY created_at DESC;
  `)
    return res.json({ data })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: "Internal Server Error" })
  }
});

// router.get('/getAll', async (req, res) => {
//   try {
//     const { admin_id } = req.query;
//     const data = await executeQuery(`SELECT * FROM bots where status=0 AND admin_id=${admin_id} ORDER BY created_at DESC`)
//     return res.json({ data })
//   } catch (error) {
//     console.log(error)
//     return res.status(500).json({ error: "Internal Server Error" })
//   }
// });

router.get('/getbyid', async (req, res) => {
  try {
    const { id } = req.query;
    const data = await executeQuery(`SELECT * FROM bots where id=${id}`)
    res.json({ data: data[0] });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: "Internal Server Error" })
  }
});

router.post("/update", (req, res) => {
  const { id, nodes, edges, } = req.body;

  const query = `
        UPDATE bots
        SET nodes = ?, edges = ?
        WHERE id = ?
      `;

  connection.query(query, [nodes, edges, id], (err, result) => {
    if (err) {
      console.error("MySQL Error:", err);
      return res.status(500).json({ error: "Failed to update Bot" });
    }

    res.status(200).json({ success: "Bot updated successfully", result });
  });
});

router.post('/track-user-bot', async (req, res) => {
  const { botId, admin_id } = req.body;

  if (!botId || !admin_id) {
    return res.status(400).json({ success: false, message: 'botId and userId are required' });
  }

  try {
    // Prevent duplicate entries (optional - works only if UNIQUE(bot_id, user_id) is set)
    await executeQuery(`
      INSERT IGNORE INTO bot_users (bot_id, user_id) VALUES (?, ?)
    `, [botId, admin_id]);

    return res.status(201).json({ success: true, message: 'User-bot tracked successfully' });
  } catch (err) {
    console.error('Error inserting into bot_users:', err);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

router.get('/getAllbotSector', async (req, res) => {
  try {
    const { sector_id } = req.query;
    const data = await executeQuery(`SELECT * FROM bots where status=0 AND sector_id=${sector_id} ORDER BY id DESC`)
    return res.json({ data })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: "Internal Server Error" })
  }
});
router.post('/delete_bot', async (req, res) => {
  const { id } = req.body;

  try {
    const sql = `update bots set status=1 where id=?`;
    connection.query(sql, [id], (err, data) => {
      if (err) {
        console.log(err)
        return res.status(400).json({ message: "Something went wrong" })
      }
      return res.status(200).json({ success: "Bot deleted" })
    })

  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

// router.get('/getAlldeletebot', async (req, res) => {
//   const { admin_id } = req.query;

//   if (!admin_id) {
//     return res.status(400).json({ error: "Missing admin_id" });
//   }

//   try {
//     const sql = `SELECT * FROM bots WHERE admin_id = ? AND status = 1`;
//     connection.query(sql, [admin_id], (err, data) => {
//       if (err) {
//         console.error(err);
//         return res.status(400).json({ message: "Something went wrong" });
//       }
//       return res.status(200).json({ success: true, data });
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: 'Internal server error' });
//   }
// });

router.get('/getAlldeletebot', async (req, res) => {
  const { admin_id } = req.query;
  try {
    const data = await executeQuery(`SELECT 
  bots.*, 
  sector.id AS sectorId, 
  sector.name AS sector_name
FROM bots
LEFT JOIN sector ON bots.sector_id = sector.id
WHERE bots.admin_id = ${admin_id} AND bots.status = 1
LIMIT 15;
`)

    return res.status(200).json({ success: true, data });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/send-whatsapp', async (req, res) => {
  const { to } = req.body;
  const PhoneNumber = '671909416004124'
  const url = `https://graph.facebook.com/v17.0/${PhoneNumber}/messages`;
  const token = 'EAAR5zlpRIpcBOxhknJ8aQuSM82mX3u6wJjdBd3EzLNBZA1xxT4gJpdAarRYFMflTKV43e9klzNqdsAarJtEjYyZBDixp36XyK3iZClGDvgmTgb7Uw79A1QXEuf08YcFS22gQ6fEvxZCtj4zpJFNV53KzhRmFtdnwsk9HPRb26wgWZA5U9UmbrUijEWCN5lyKYqA2tdrKZC2BPrd04QSTX35u9RZBvMx6Y1UVO83DrlucBsZD'; // Use .env in production

  const body = {
    messaging_product: 'whatsapp',
    to: to,
    type: 'template',
    template: {
      name: 'hello_world',
      language: {
        code: 'en_US',
      },
    },
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error('WhatsApp send error:', err);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

//send bot 
router.post('/addwithwhatsup', async (req, res) => {
  const { flowName, nodes, edges, to: toRaw, admin_id, flow_id } = req.body;
  // console.log("nodes", req.body);

  nodes.forEach((node) => {
    if (node.type === 'ListButton') {
      console.log(`Node ID: ${node.id}, targetValues:`, node.data.targetValues);
    }
  });
  if (!toRaw || !Array.isArray(toRaw) || toRaw.length === 0) {
    return res.status(400).json({ message: 'Missing or invalid "to" phone numbers' });
  }

  const toNumbers = toRaw
    .map(num => String(num).replace(/\D/g, ''))
    .filter(num => /^\d{10,15}$/.test(num));

  if (toNumbers.length === 0) {
    return res.status(400).json({ message: 'No valid phone numbers provided' });
  }

  // const sql = `INSERT INTO bots(name, nodes, edges, admin_id) VALUES (?, ?, ?, ?)`;
  // connection.query(sql, [flowName, JSON.stringify(nodes), JSON.stringify(edges), admin_id], async (err, result) => {
  //   if (err) {
  //     console.error('Error saving flow:', err);
  //     return res.status(500).json({ message: 'Database error' });
  //   }

  //   const flowId = result.insertId;
  // console.log(flowId)


  const parsedNodes = typeof nodes === 'string' ? JSON.parse(nodes) : nodes;

  const parsedEdges = typeof edges === 'string' ? JSON.parse(edges) : edges;

  // Find start node
  const incomingMap = {};
  parsedEdges.forEach(edge => {
    incomingMap[edge.target] = true;
  });
  const startNode = parsedNodes.find(n => !incomingMap[n.id]);


   for (const to of toNumbers) {
    try {
      if (startNode?.type === 'imageNode' && startNode?.data?.fileUrl) {
        await sendWhatsAppImage(to, startNode?.data.fileUrl);
      } else if (startNode?.data?.label) {
        await sendWhatsAppText(to, startNode?.data.label);
      } else {
        await sendWhatsAppText(to, '👋 Hello! Let\'s begin.');
      }

      // Save user progress as starting point
      await executeQuery(
        'INSERT INTO user_node_progress (phone_number, flow_id, current_node_id) VALUES (?, ?, ?)',
        [to, flow_id, 0]
      );
    } catch (sendErr) {
      console.error(`Error sending to ${to}:`, sendErr);
    }
  }
 

  res.status(200).json({
    message: 'Flow saved and first message sent.',
    flow_id
  });

});


const phoneNumberId = process.env.PHONE_NUMBER_ID
const token = process.env.WHATSAPP_TOKEN


async function sendWhatsAppText(to, text,) {
  const url = `https://graph.facebook.com/v17.0/${phoneNumberId}/messages`;
  const body = {
    messaging_product: 'whatsapp',
    to,
    type: 'text',
    text: { body: text }
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  const result = await response.json();

  // console.log('Send result+:', result);

  if (!response.ok) {
    throw new Error(`WhatsApp API error: ${JSON.stringify(result)}`);
  }
}

async function sendWhatsAppImage(to, imageUrl, token) {
  const url = `https://graph.facebook.com/v17.0/${phoneNumberId}/messages`;
  const body = {
    messaging_product: 'whatsapp',
    to,
    type: 'image',
    image: { link: imageUrl }
  };

  await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
}

// ✅ Facebook Verification
router.get('/webhook', (req, res) => {
  const verifyToken = process.env.JWT_SECRET;
  console.log(verifyToken)
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];
  console.log(challenge)
  console.log(token)
  console.log(mode)

  if (mode === 'subscribe' && token === verifyToken) {
    return res.status(200).send(challenge);
  } else {
    return res.sendStatus(403);
  }
});


function buildFlowGraph(nodes, edges) {
  const graph = {};
  const nodeMap = {};

  nodes.forEach(node => {
    nodeMap[node.id] = node;
    graph[node.id] = []; // Initialize even if no edges yet
  });

  edges.forEach(edge => {
    if (graph[edge.source]) {
      graph[edge.source].push(edge);
    } else {
      graph[edge.source] = [edge];
    }
  });

  return { graph, nodeMap };
}

async function sendWhatsAppList(to, question, options) {
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID || '671909416004124';

  if (!phoneNumberId) throw new Error("Missing phoneNumberId");

  const url = `https://graph.facebook.com/v17.0/${phoneNumberId}/messages`;

  const body = {
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to,
    type: 'interactive',
    interactive: {
      type: 'list',
      header: { type: 'text', text: question },
      body: { text: 'Please select an option' },
      footer: { text: 'Powered by YourBot' },
      action: {
        button: 'Choose',
        sections: [
          {
            title: 'Options',
            rows: options.map((opt, i) => ({
              id: `option_${i}`,
              title: opt,
            })),
          },
        ],
      },
    },
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const result = await response.json();

  if (!response.ok) {
    console.error("❌ WhatsApp List API error:", result);
    throw new Error(`WhatsApp List API error: ${JSON.stringify(result)}`);
  }

  return result;
}

async function sendWhatsAppReplyButtons(to, question, options = []) {
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID || "671909416004124";
  const token = process.env.WHATSAPP_TOKEN;

  const url = `https://graph.facebook.com/v17.0/${phoneNumberId}/messages`;

  const body = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to,
    type: "interactive",
    interactive: {
      type: "button",
      body: {
        text: question || "Please choose an option",
      },
      action: {
        buttons: options.slice(0, 3).map((label, index) => ({
          type: "reply",
          reply: {
            id: `option_${index}`, // ✅ short id
            title: label.slice(0, 20), // ✅ max 20 characters
          },
        })),
      },
    },
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const result = await response.json();
  console.log("📨 WhatsApp Reply Button Response:", JSON.stringify(result, null, 2));

  if (!response.ok) {
    console.error("❌ Failed to send reply buttons:", result);
    throw new Error(`WhatsApp API error: ${JSON.stringify(result)}`);
  }

  return result;
}


// router.post('/webhook', async (req, res) => {
//   try {
//     const body = req.body;
//     console.log("incoming data", JSON.stringify(req.body, null, 2));
//     const message = body?.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
//     if (!message || body.object !== 'whatsapp_business_account') {
//       return res.status(200).send('No message to process');
//     }

//     const from = message.from;
//     const msg = message.text?.body?.trim().toLowerCase();

//     // RESET FLOW
//     if (msg === 'restart') {
//       await sendWhatsAppText(from, '🔄 Flow reset. Type *hi* to begin again.');
//       await executeQuery('DELETE FROM user_node_progress WHERE phone_number = ?', [from]);
//       return res.sendStatus(200);
//     }

//     // GET USER PROGRESS
//     // let [progress] = await executeQuery(
//     //   'SELECT flow_id, current_node_id FROM user_node_progress WHERE phone_number = ?',
//     //   [from]
//     // );

//     const [progress] = await executeQuery(
//       'SELECT * FROM user_node_progress WHERE phone_number = ? ORDER BY id DESC LIMIT 1',
//       [from]
//     );

//     let flow_id = progress?.flow_id;
//     console.log("flow_id", flow_id)
//     console.log("progress", progress)

//     // START FLOW
//     if ((msg === 'hi' || msg === 'hello') && !progress) {
//       const [defaultBot] = await executeQuery('SELECT id FROM bots LIMIT 1');
//       if (!defaultBot) {
//         await sendWhatsAppText(from, '❌ No default bot is configured.');
//         return res.sendStatus(400);
//       }

//       flow_id = defaultBot.id;
//       const [bot] = await executeQuery('SELECT nodes, edges FROM bots WHERE id = ?', [flow_id]);
//       const nodes = typeof bot.nodes === 'string' ? JSON.parse(bot.nodes) : bot.nodes;
//       const edges = typeof bot.edges === 'string' ? JSON.parse(bot.edges) : bot.edges;

//       const { graph, nodeMap } = buildFlowGraph(nodes, edges);
//       const firstNode = nodes[0];
//       console.log("firstNode", firstNode)



//       if (firstNode.type === 'ListButton') {
//         await sendWhatsAppList(from, firstNode.data.label, firstNode.data.targetValues);
//       } else if (firstNode.type === 'GoogleSheetsNode') {
//         // ⛔️ Don't send label — the actual document will be handled later
//         console.log("📄 First node is GoogleSheetsNode — skipping text label send");
//       } else {
//         await sendWhatsAppText(from, firstNode?.data?.label || '👋 Hello!');
//       }

//       await executeQuery(
//         'INSERT INTO user_node_progress (phone_number, flow_id, current_node_id) VALUES (?, ?, ?)',
//         [from, flow_id, firstNode.id]
//       );

//       return res.sendStatus(200);
//     }

//     if (!flow_id) return res.status(400).send('No active flow');

//     // LOAD BOT FLOW
//     const [bot] = await executeQuery('SELECT nodes, edges FROM bots WHERE id = ?', [flow_id]);
//     const nodes = typeof bot.nodes === 'string' ? JSON.parse(bot.nodes) : bot.nodes;
//     const edges = typeof bot.edges === 'string' ? JSON.parse(bot.edges) : bot.edges;
//     const { graph, nodeMap } = buildFlowGraph(nodes, edges);

//     console.log("nodes", nodes)

//     let currentNodeId = progress?.current_node_id;
//     console.log("currentNodeId", currentNodeId)
//     if (!nodeMap[currentNodeId]) {
//       const firstNode = nodes[0];

//       currentNodeId = firstNode.id;
//       await executeQuery(
//         'UPDATE user_node_progress SET current_node_id = ? WHERE phone_number = ?',
//         [currentNodeId, from]
//       );
//     }

//     const currentNode = nodeMap[currentNodeId];
//     if (!currentNode) {
//       await sendWhatsAppText(from, '⚠️ Flow error. Restarting...');
//       await executeQuery('DELETE FROM user_node_progress WHERE phone_number = ?', [from]);
//       return res.sendStatus(200);
//     }

//     let nextNodeId = null;

//     // ✅ HANDLE LISTBUTTON NODE
//     if (currentNode.type === "ListButton") {
//       const question = currentNode.data.label || "Choose one:";
//       const targetValues = currentNode.data.targetValues || [];
//       const isListReply = message?.interactive?.type === "list_reply";

//       if (isListReply) {
//         const selectedTitle = message.interactive.list_reply.title;
//         const selectedIndex = targetValues.findIndex(
//           val => val.toLowerCase().trim() === selectedTitle.toLowerCase().trim()
//         );

//         if (selectedIndex !== -1) {
//           const connections = graph[currentNodeId] || [];
//           const match = connections.find(
//             conn => conn.sourceHandle === `option_${selectedIndex}`
//           );

//           if (match) {
//             nextNodeId = match.target;

//             // Save selected answer
//             await executeQuery(
//               'INSERT INTO user_answers (phone_number, flow_id, node_id, answer) VALUES (?, ?, ?, ?)',
//               [from, flow_id, currentNodeId, selectedTitle]
//             );

//             const nextNode = nodeMap[nextNodeId];

//             // ✅ Send nextNode content correctly
//             setTimeout(async () => {
//               if (nextNode?.type === "ListButton") {
//                 await sendWhatsAppList(from, nextNode.data.label, nextNode.data.targetValues);
//               } else {
//                 await sendWhatsAppText(from, nextNode?.data?.label || '🧩 ...next step...');
//               }
//             }, 2000);

//             await executeQuery(
//               'UPDATE user_node_progress SET current_node_id = ? WHERE phone_number = ?',
//               [nextNodeId, from]
//             );

//             return res.sendStatus(200);
//           } else {
//             await sendWhatsAppText(from, "⚠️ This option is not connected to the next step.");
//             return res.sendStatus(200);
//           }
//         } else {
//           await sendWhatsAppText(from, `❌ Invalid option. Reply with one of: ${targetValues.join(", ")}`);
//           return res.sendStatus(200);
//         }
//       } else {
//         await sendWhatsAppList(from, question, targetValues);
//         return res.status(200).send("✅ List sent");
//       }
//     }

//     // ✅ HANDLE CUSTOM TEXT
//     else if (currentNode.type === 'CustomText') {
//       await executeQuery(
//         'INSERT INTO user_answers (phone_number, flow_id, node_id, answer) VALUES (?, ?, ?, ?)',
//         [from, flow_id, currentNodeId, msg]
//       );

//       const connections = graph[currentNodeId];
//       if (connections && connections.length > 0) {
//         nextNodeId = connections[0].target;
//       }
//     }


//     else if (currentNode.type === "ReplyButton") {
//       const isButtonReply = message?.interactive?.type === "button_reply";
//       const isTextReply = message?.type === "text";

//       let selectedIndex = -1;
//       let selectedOption = "";
//       let replyId = "";

//       if (isButtonReply) {
//         replyId = message.interactive.button_reply.id; // "option_0"
//         selectedIndex = parseInt(replyId.split(/[_-]/)[1]);
//         selectedOption = currentNode.data?.targetValues?.[selectedIndex];
//       } else if (isTextReply) {
//         const userText = message.text.body.trim().toLowerCase();
//         selectedIndex = currentNode.data.targetValues.findIndex(
//           (opt) => opt.trim().toLowerCase() === userText
//         );
//         if (selectedIndex !== -1) {
//           selectedOption = currentNode.data.targetValues[selectedIndex];
//         }
//       }

//       if (selectedIndex === -1 || !selectedOption) {
//         await sendWhatsAppText(from, "⚠️ Please choose a valid option.");
//         return res.sendStatus(200);
//       }

//       const normalizedSourceHandle = `option_${selectedIndex}`;
//       const connections = graph[currentNodeId] || [];

//       const match = connections.find((c) => {
//         const edgeHandle = c.sourceHandle?.replace("-", "_");
//         return edgeHandle === normalizedSourceHandle;
//       });



//       if (match) {
//         const nextNodeId = match.target;
//         const nextNode = nodeMap[nextNodeId];

//         if (!nextNode) {
//           await sendWhatsAppText(from, "⚠️ Something went wrong. Please try again.");
//           return res.sendStatus(200);
//         }

//         // ✅ Delay before sending interactive messages
//         await new Promise((res) => setTimeout(res, 1500)); // 1.5 second delay

//         // Send next message type
//         if (nextNode.type === "ReplyButton") {
//           await sendWhatsAppReplyButtons(from, nextNode.data.label, nextNode.data.targetValues);
//         } else if (nextNode.type === "ListButton") {
//           await sendWhatsAppList(from, nextNode.data.label, nextNode.data.targetValues);
//         } else {
//           await sendWhatsAppText(from, nextNode.data?.label || "Next step...");
//         }

//         // Save progress
//         await executeQuery(
//           "UPDATE user_node_progress SET current_node_id = ? WHERE phone_number = ?",
//           [nextNodeId, from]
//         );

//         await executeQuery(
//           "INSERT INTO user_answers (phone_number, flow_id, node_id, answer) VALUES (?, ?, ?, ?)",
//           [from, flow_id, currentNodeId, selectedOption]
//         );

//         return res.sendStatus(200);
//       } else {
//         await sendWhatsAppText(from, "⚠️ Option not found in flow. Please try again.");
//         return res.sendStatus(200);
//       }


//       // if (match) {
//       //   const nextNodeId = match.target;
//       //   const nextNode = nodeMap[nextNodeId];

//       //   if (!nextNode) {
//       //     await sendWhatsAppText(from, "⚠️ Something went wrong. Please try again.");
//       //     return res.sendStatus(200);
//       //   }

//       //   // Send next message type
//       //   if (nextNode.type === "ReplyButton") {


//       //     await sendWhatsAppReplyButtons(from, nextNode.data.label, nextNode.data.targetValues);
//       //   } else if (nextNode.type === "ListButton") {
//       //     await sendWhatsAppList(from, nextNode.data.label, nextNode.data.targetValues);
//       //   } else {
//       //     await sendWhatsAppText(from, nextNode.data?.label || "Next step...");
//       //   }

//       //   // Save progress
//       //   await executeQuery(
//       //     "UPDATE user_node_progress SET current_node_id = ? WHERE phone_number = ?",
//       //     [nextNodeId, from]
//       //   );

//       //   await executeQuery(
//       //     "INSERT INTO user_answers (phone_number, flow_id, node_id, answer) VALUES (?, ?, ?, ?)",
//       //     [from, flow_id, currentNodeId, selectedOption]
//       //   );

//       //   return res.sendStatus(200);
//       // } else {
//       //   await sendWhatsAppText(from, "⚠️ Option not found in flow. Please try again.");
//       //   return res.sendStatus(200);
//       // }
//     }

//     else if (currentNode.type === 'imageNode') {
//       try {
//         console.log("📸 Handling image node...");

//         const fileName = currentNode.data?.fileName;
//         const caption = currentNode.data?.caption || '';

//         if (!fileName) {
//           console.warn("⚠️ Image node has no fileName");
//           // await sendWhatsAppText(from, `⚠️ No image found.`);
//           return res.sendStatus(200);
//         }

//         let imageUrl = `${process.env.NGROK_PUBLIC_URL}/uploads/${fileName}`;
//         imageUrl = encodeURI(imageUrl);

//         console.log("✅ Final image URL to send:", imageUrl);

//         const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID || "671909416004124";

//         // Send image
//         await fetch(`https://graph.facebook.com/v17.0/${phoneNumberId}/messages`, {
//           method: 'POST',
//           headers: {
//             Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             messaging_product: "whatsapp",
//             to: from,
//             type: "image",
//             image: {
//               link: imageUrl,
//               caption,
//             },
//           }),
//         });

//         // Save the image as an answer
//         await executeQuery(
//           'INSERT INTO user_answers (phone_number, flow_id, node_id, answer) VALUES (?, ?, ?, ?)',
//           [from, flow_id, currentNodeId, fileName]
//         );

//         // Move to next node
//         const connections = graph[currentNodeId];
//         if (connections && connections.length > 0) {
//           const nextNodeId = connections[0].target;
//           const nextNode = nodeMap[nextNodeId];

//           // Update progress
//           await executeQuery(
//             'UPDATE user_node_progress SET current_node_id = ? WHERE phone_number = ?',
//             [nextNodeId, from]
//           );

//           // Delay before sending next message
//           setTimeout(async () => {
//             if (nextNode?.type === "ReplyButton") {
//               await sendWhatsAppReplyButtons(from, nextNode.data.label, nextNode.data.targetValues);
//             } else if (nextNode?.type === "ListButton") {
//               await sendWhatsAppList(from, nextNode.data.label, nextNode.data.targetValues);
//             } else if (nextNode?.type === "imageNode") {
//               // Optional: Handle image to image flow
//             } else {
//               await sendWhatsAppText(from, nextNode?.data?.label || "Next step...");
//             }
//           }, 2000);
//         }

//         return res.sendStatus(200);
//       } catch (err) {
//         console.error("🚨 Unexpected error handling image node:", err);
//         return res.sendStatus(500);
//       }
//     }


//     else if (currentNode.type === 'GoogleSheetsNode') {
//       try {
//         const fileName = currentNode.data?.file;
//         const fileUrl = `${process.env.NGROK_PUBLIC_URL}/uploadFiles/${fileName}`;
//         const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID || "671909416004124";

//         // ✅ Only send the document (no label/message)
//         const response = await fetch(`https://graph.facebook.com/v17.0/${phoneNumberId}/messages`, {
//           method: 'POST',
//           headers: {
//             'Authorization': `Bearer ${process.env.WHATSAPP_TOKEN}`,
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             messaging_product: "whatsapp",
//             to: from,
//             type: "document",
//             document: {
//               link: fileUrl,
//               filename: fileName,
//             },
//           }),
//         });

//         const result = await response.json();
//         console.log("📤 WhatsApp Sheet File Response:", result);

//         // ✅ Save user answer
//         await executeQuery(
//           'INSERT INTO user_answers (phone_number, flow_id, node_id, answer) VALUES (?, ?, ?, ?)',
//           [from, flow_id, currentNodeId, fileName]
//         );

//         // ✅ Proceed to next node
//         const connections = graph[currentNodeId];
//         let nextNodeId = null;
//         if (connections && connections.length > 0) {
//           nextNodeId = connections[0].target;

//           // ✅ Update progress
//           await executeQuery(
//             'UPDATE user_node_progress SET current_node_id = ? WHERE phone_number = ?',
//             [nextNodeId, from]
//           );

//           // ✅ Send next node's content after delay
//           const nextNode = nodeMap[nextNodeId];
//           setTimeout(async () => {
//             if (nextNode?.type === "CustomText") {
//               await sendWhatsAppText(from, nextNode.data.label || '...');
//             } else if (nextNode?.type === "ListButton") {
//               await sendWhatsAppList(from, nextNode.data.label, nextNode.data.targetValues);
//             }

//             // ✅ Optional: auto progress to next-next node
//             const further = graph[nextNodeId];
//             if (further && further.length > 0) {
//               const nextNextNodeId = further[0].target;

//               await executeQuery(
//                 'UPDATE user_node_progress SET current_node_id = ? WHERE phone_number = ?',
//                 [nextNextNodeId, from]
//               );

//               const nextNextNode = nodeMap[nextNextNodeId];
//               setTimeout(async () => {
//                 if (nextNextNode?.type === "CustomText") {
//                   await sendWhatsAppText(from, nextNextNode.data.label || '...');
//                 } else if (nextNextNode?.type === "ListButton") {
//                   await sendWhatsAppList(from, nextNextNode.data.label, nextNextNode.data.targetValues);
//                 }
//               }, 1500);
//             }
//           }, 1500);
//         } else {
//           await sendWhatsAppText(from, '✅ Flow complete. Type *restart* to try again.');
//           await executeQuery('DELETE FROM user_node_progress WHERE phone_number = ?', [from]);
//         }

//         return res.sendStatus(200);
//       } catch (err) {
//         console.error("❌ Error in GoogleSheetsNode:", err);
//         return res.sendStatus(500);
//       }
//     }

//     else if (currentNode.type === 'VideoNode') {
//       try {
//         const fileName = currentNode.data?.fileName;
//         if (!fileName) return res.sendStatus(200);

//         const videoUrl = `${process.env.NGROK_PUBLIC_URL}/videoFiles/${fileName}`;
//         const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID || "671909416004124";

//         const response = await fetch(`https://graph.facebook.com/v17.0/${phoneNumberId}/messages`, {
//           method: 'POST',
//           headers: {
//             Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             messaging_product: "whatsapp",
//             to: from,
//             type: "video",
//             video: {
//               link: videoUrl,
//             },
//           }),
//         });

//         const result = await response.json();
//         console.log("📽️ WhatsApp Video Response:", result);

//         await executeQuery(
//           'INSERT INTO user_answers (phone_number, flow_id, node_id, answer) VALUES (?, ?, ?, ?)',
//           [from, flow_id, currentNodeId, fileName]
//         );

//         const connections = graph[currentNodeId];
//         if (connections?.length > 0) {
//           const nextNodeId = connections[0].target;
//           await executeQuery('UPDATE user_node_progress SET current_node_id = ? WHERE phone_number = ?', [nextNodeId, from]);
//           const nextNode = nodeMap[nextNodeId];
//           setTimeout(async () => {
//             if (nextNode?.type === "CustomText") {
//               await sendWhatsAppText(from, nextNode.data.label || '...');
//             } else if (nextNode?.type === "ListButton") {
//               await sendWhatsAppList(from, nextNode.data.label, nextNode.data.targetValues);
//             }
//           }, 1500);
//         }

//         return res.sendStatus(200);
//       } catch (err) {
//         console.error("❌ Error sending video:", err);
//         return res.sendStatus(500);
//       }
//     }

//     // ✅ DEFAULT PROGRESSION
//   else if (!nextNodeId && graph[currentNodeId] && graph[currentNodeId].length > 0) {
//       nextNodeId = graph[currentNodeId][0].target;
//     }

//     // ✅ HANDLE NEXT NODE
//     if (nextNodeId) {
//       const nextNode = nodeMap[nextNodeId];

//       setTimeout(async () => {
//         if (nextNode?.type === "ListButton") {
//           await sendWhatsAppList(from, nextNode.data.label, nextNode.data.targetValues);
//         } else {
//           await sendWhatsAppText(from, nextNode?.data?.label || '🧩 ...next step...');
//         }
//       }, 2000);

//       await executeQuery(
//         'UPDATE user_node_progress SET current_node_id = ? WHERE phone_number = ?',
//         [nextNodeId, from]
//       );
//     } else {
//       await sendWhatsAppText(from, '✅ Flow complete. Type *restart* to try again.');
//       await executeQuery('DELETE FROM user_node_progress WHERE phone_number = ?', [from]);
//     }

//     return res.sendStatus(200);
//   } catch (error) {
//     console.error('❌ Error in webhook handler:', error);
//     return res.sendStatus(500);
//   }
// });




// else if (currentNode.type === 'GoogleSheetsNode') {
//   try {
//     const fileName = currentNode.data?.file;
//     if (!fileName) {
//       await sendWhatsAppText(from, `⚠️ No file found.`);
//       return res.sendStatus(200);
//     }

//     const fileUrl = `${process.env.NGROK_PUBLIC_URL}/uploadFiles/${fileName}`;
//     const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID || "671909416004124";

//     const response = await fetch(`https://graph.facebook.com/v17.0/${phoneNumberId}/messages`, {
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${process.env.WHATSAPP_TOKEN}`,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         messaging_product: "whatsapp",
//         to: from,
//         type: "document",
//         document: {
//           link: fileUrl,
//           filename: fileName,
//         },
//       }),
//     });

//     const result = await response.json();
//     console.log("📤 WhatsApp Sheet File Response:", result);

//     // Save file as answer
//     await executeQuery(
//       'INSERT INTO user_answers (phone_number, flow_id, node_id, answer) VALUES (?, ?, ?, ?)',
//       [from, flow_id, currentNodeId, fileName]
//     );

//     // Move to next node if exists
//     const connections = graph[currentNodeId];
//     if (connections && connections.length > 0) {
//       const nextNodeId = connections[0].target;
//       await executeQuery(
//         'UPDATE user_node_progress SET current_node_id = ? WHERE phone_number = ?',
//         [nextNodeId, from]
//       );
//     }

//     return res.sendStatus(200);
//   } catch (err) {
//     console.error("❌ Error in GoogleSheetsNode:", err);
//     return res.sendStatus(500);
//   }
// }


// Helper functions for media nodes


async function handleLinkNode(currentNode, from, flow_id, graph, nodeMap) {
  const { linkText, linkUrl } = currentNode.data;
  const messageText = `🔗 *${linkText || linkUrl}*\n${linkUrl}`;
  await sendWhatsAppText(from, messageText);

  // Save answer
  await executeQuery(
    'INSERT INTO user_answers (phone_number, flow_id, node_id, answer) VALUES (?, ?, ?, ?)',
    [from, flow_id, currentNode.id, linkUrl]
  );

  const connections = graph[currentNode.id] || [];
  if (connections.length > 0) {
    const nextNodeId = connections[0].target;
    const nextNode = nodeMap[nextNodeId];

    // Update progress
    await executeQuery(
      'UPDATE user_node_progress SET current_node_id = ? WHERE phone_number = ?',
      [nextNodeId, from]
    );

    // Send next node
    if (nextNode.type === 'ListButton') {
      await sendWhatsAppList(from, nextNode.data.label, nextNode.data.targetValues);
    } else if (nextNode.type === 'ReplyButton') {
      await sendWhatsAppReplyButtons(from, nextNode.data.label, nextNode.data.targetValues);
    } else if (['GoogleSheetsNode', 'VideoNode', 'imageNode'].includes(nextNode.type)) {
      const mediaType = nextNode.type === 'GoogleSheetsNode' ? 'document' :
        nextNode.type === 'VideoNode' ? 'video' : 'image';
      await handleMediaNode(mediaType, nextNode, from, flow_id);
    } else {
      await sendWhatsAppText(from, nextNode?.data?.label || '...');
    }
  } else {
    await sendWhatsAppText(from, '✅ Flow complete. Type *restart* to try again.');
    await executeQuery('DELETE FROM user_node_progress WHERE phone_number = ?', [from]);
  }
}




router.post('/webhook', async (req, res) => {
  try {
    console.log('=== NEW WEBHOOK REQUEST ===');
    const body = req.body;
    console.log("Raw incoming data:", JSON.stringify(body, null, 2));

    if (body?.object !== 'whatsapp_business_account') {
      console.log('Invalid object type');
      return res.status(200).send('Invalid object type');
    }

    const message = body?.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
    if (!message) {
      console.log('No message found');
      return res.status(200).send('No message to process');
    }

    const from = message.from;
    let msg = '';
    if (message.type === 'text') {
      msg = message.text?.body?.trim().toLowerCase();
    } else if (message.interactive) {
      msg = message.interactive.type === 'list_reply'
        ? message.interactive.list_reply.title.toLowerCase()
        : message.interactive.button_reply?.title.toLowerCase();
    }
    console.log(`Message content: ${msg}`);

    // RESET
    if (msg === 'restart') {
      await sendWhatsAppText(from, '🔄 Flow reset. Type *hi* to begin again.');
      await executeQuery('DELETE FROM user_node_progress WHERE phone_number = ?', [from]);
      await executeQuery('DELETE FROM user_answers WHERE phone_number = ?', [from]);
      return res.sendStatus(200);
    }

    const [progress] = await executeQuery(
      'SELECT * FROM user_node_progress WHERE phone_number = ? ORDER BY id DESC LIMIT 1',
      [from]
    );

    let flow_id = progress?.flow_id;

    if ((msg === 'hi' || msg === 'hello') && !progress) {
      const [defaultBot] = await executeQuery('SELECT id FROM bots LIMIT 1');
      if (!defaultBot) {
        await sendWhatsAppText(from, '❌ No default bot is configured.');
        return res.sendStatus(400);
      }

      flow_id = defaultBot.id;
      const [bot] = await executeQuery('SELECT nodes, edges FROM bots WHERE id = ?', [flow_id]);

      const nodes = typeof bot.nodes === 'string' ? JSON.parse(bot.nodes) : bot.nodes;
      const edges = typeof bot.edges === 'string' ? JSON.parse(bot.edges) : bot.edges;
      const { graph, nodeMap } = buildFlowGraph(nodes, edges);

      const firstNode = nodes[0];

      if (firstNode.type === 'ListButton') {
        await sendWhatsAppList(from, firstNode.data.label, firstNode.data.targetValues);
      } else if (firstNode.type === 'ReplyButton') {
        await sendWhatsAppReplyButtons(from, firstNode.data.label, firstNode.data.targetValues);
      } else if (['GoogleSheetsNode', 'VideoNode', 'imageNode'].includes(firstNode.type)) {
        const mediaType = firstNode.type === 'GoogleSheetsNode' ? 'document' :
          firstNode.type === 'VideoNode' ? 'video' : 'image';
        await handleMediaNode(mediaType, firstNode, from, flow_id);
      } else if (firstNode.type === 'LinkNode') {
        const { linkText, linkUrl } = firstNode.data;
        const linkMessage = `🔗 *${linkText || linkUrl}*\n${linkUrl}`;
        await sendWhatsAppText(from, linkMessage);
      } else {
        await sendWhatsAppText(from, firstNode?.data?.label || '👋 Hello!');
      }

      await executeQuery(
        'INSERT INTO user_node_progress (phone_number, flow_id, current_node_id) VALUES (?, ?, ?)',
        [from, flow_id, firstNode.id]
      );

      return res.sendStatus(200);
    }

    if (!flow_id) {
      return res.status(400).send('No active flow');
    }

    const [bot] = await executeQuery('SELECT nodes, edges FROM bots WHERE id = ?', [flow_id]);
    const nodes = typeof bot.nodes === 'string' ? JSON.parse(bot.nodes) : bot.nodes;
    const edges = typeof bot.edges === 'string' ? JSON.parse(bot.edges) : bot.edges;
    const { graph, nodeMap } = buildFlowGraph(nodes, edges);

    let currentNodeId = progress?.current_node_id;
    if (!nodeMap[currentNodeId]) {
      currentNodeId = nodes[0].id;
      await executeQuery('UPDATE user_node_progress SET current_node_id = ? WHERE phone_number = ?', [currentNodeId, from]);
    }

    const currentNode = nodeMap[currentNodeId];
    let nextNodeId = null;

   

    if (currentNode.type === "ListButton") {
      const targetValues = currentNode.data.targetValues || [];
      if (message?.interactive?.type === "list_reply") {
        const selectedTitle = message.interactive.list_reply.title;
        const selectedIndex = targetValues.findIndex(
          val => val.toLowerCase().trim() === selectedTitle.toLowerCase().trim()
        );
        if (selectedIndex !== -1) {
          const match = (graph[currentNodeId] || []).find(
            conn => conn.sourceHandle === `option_${selectedIndex}`
          );
          if (match) {
            nextNodeId = match.target;
            await executeQuery(
              'INSERT INTO user_answers (phone_number, flow_id, node_id, answer) VALUES (?, ?, ?, ?)',
              [from, flow_id, currentNodeId, selectedTitle]
            );
          }
        }
      } else {
        await sendWhatsAppList(from, currentNode.data.label, targetValues);
        return res.sendStatus(200);
      }
    }
    //  else if (currentNode.type === 'CustomNode') {
    //   console.log('Processing CustomNode (Q&A Node)');

    //   if (message?.type === 'text') {
    //     const userQuestion = message?.text?.body;

    //     // 1. Save user question to DB
    //     await executeQuery(
    //       'INSERT INTO user_answers (phone_number, flow_id, node_id, answer) VALUES (?, ?, ?, ?)',
    //       [from, flow_id, currentNodeId, userQuestion]
    //     );

    //     try {
    //       // 2. Send user input to Python API
    //       const response = await axios.get(
    //         `http://216.10.251.154:5000/get_info?query=${encodeURIComponent(userQuestion)}`
    //       );
    //       const answer = response.data.answer || response.data;

    //       // 3. Send Python answer back to user on WhatsApp
    //       await sendWhatsAppText(from, `🤖 ${answer}`);
    //     } catch (err) {
    //       console.error('Python API error:', err.message);
    //       await sendWhatsAppText(from, '❌ Failed to get answer from Python bot.');
    //     }

    //     // 4. Move to next node in flow
    //     const connections = graph[currentNodeId] || [];
    //     if (connections.length > 0) {
    //       const nextNodeId = connections[0].target;

    //       await executeQuery(
    //         'UPDATE user_node_progress SET current_node_id = ? WHERE phone_number = ?',
    //         [nextNodeId, from]
    //       );

    //       const nextNode = nodeMap[nextNodeId];

    //       // 5. Handle next node type
    //       if (nextNode.type === 'ListButton') {
    //         await sendWhatsAppList(from, nextNode.data.label, nextNode.data.targetValues);
    //       } else if (nextNode.type === 'ReplyButton') {
    //         await sendWhatsAppReplyButtons(from, nextNode.data.label, nextNode.data.targetValues);
    //       } else if (nextNode.type === 'GoogleSheetsNode') {
    //         await handleMediaNode('document', nextNode, from, flow_id);
    //       } else if (nextNode.type === 'VideoNode') {
    //         await handleMediaNode('video', nextNode, from, flow_id);
    //       } else if (nextNode.type === 'imageNode') {
    //         await handleMediaNode('image', nextNode, from, flow_id);
    //       } else if (nextNode.type === 'CustomNode') {
    //         await sendWhatsAppText(from, nextNode.data.label || 'Please ask your question');
    //       } else {
    //         await sendWhatsAppText(from, nextNode?.data?.label || '...');
    //       }
    //     } else {
    //       // End of flow
    //       await sendWhatsAppText(from, '✅ Q&A complete. Type *restart* to begin again.');
    //       await executeQuery('DELETE FROM user_node_progress WHERE phone_number = ?', [from]);
    //     }

    //     return res.sendStatus(200);
    //   } else {
    //     // Wait for user input (text)
    //     await sendWhatsAppText(from, '❓ Please type your question.');
    //     return res.sendStatus(200);
    //   }
    // }
    else if (currentNode.type === "ReplyButton") {
      const targetValues = currentNode.data.targetValues || [];
      let selectedOption = null;

      if (message?.interactive?.type === "button_reply") {
        const replyId = message.interactive.button_reply.id;
        const selectedIndex = parseInt(replyId.split('_')[1]);
        selectedOption = targetValues[selectedIndex];
      } else if (message.type === "text") {
        const userText = message.text.body.trim().toLowerCase();
        selectedOption = targetValues.find(opt =>
          opt.trim().toLowerCase() === userText
        );
      }

      if (selectedOption) {
        const selectedIndex = targetValues.indexOf(selectedOption);
        const match = (graph[currentNodeId] || []).find(
          conn => conn.sourceHandle === `option_${selectedIndex}`
        );
        if (match) {
          nextNodeId = match.target;
          await executeQuery(
            'INSERT INTO user_answers (phone_number, flow_id, node_id, answer) VALUES (?, ?, ?, ?)',
            [from, flow_id, currentNodeId, selectedOption]
          );
        }
      } else {
        await sendWhatsAppReplyButtons(from, '⚠️ Please choose a valid option:', targetValues);
        return res.sendStatus(200);
      }
    }
    // else if (currentNode.type === 'LinkNode') {
    //   const { linkText, linkUrl } = currentNode.data;
    //   const messageText = `🔗 *${linkText || linkUrl}*\n${linkUrl}`;
    //   await sendWhatsAppText(from, messageText);

    //   await executeQuery(
    //     'INSERT INTO user_answers (phone_number, flow_id, node_id, answer) VALUES (?, ?, ?, ?)',
    //     [from, flow_id, currentNodeId, linkUrl]
    //   );

    //   const connections = graph[currentNodeId] || [];
    //   if (connections.length > 0) nextNodeId = connections[0].target;
    // }

    else if (currentNode.type === 'LinkNode') {
      await handleLinkNode(currentNode, from, flow_id, graph, nodeMap);
      return res.sendStatus(200); // ✅ Always return to stop further processing
    }

    //      else if (currentNode.type === 'LinkNode') {
    //   const { linkText, linkUrl } = currentNode.data;
    //   const messageText = `🔗 *${linkText || linkUrl}*\n${linkUrl}`;
    //   await sendWhatsAppText(from, messageText);

    //   await executeQuery(
    //     'INSERT INTO user_answers (phone_number, flow_id, node_id, answer) VALUES (?, ?, ?, ?)',
    //     [from, flow_id, currentNodeId, linkUrl]
    //   );

    //   const connections = graph[currentNodeId] || [];
    //   if (connections.length > 0) {
    //     nextNodeId = connections[0].target;
    //    skipNextNodeProcessing = true;
    //     // ✅ Update progress now to avoid sending again later
    //     await executeQuery(
    //       'UPDATE user_node_progress SET current_node_id = ? WHERE phone_number = ?',
    //       [nextNodeId, from]
    //     );

    //     return res.sendStatus(200); // ✅ Exit here to avoid duplicate send
    //   }
    // }




    else if (['GoogleSheetsNode', 'VideoNode', 'imageNode'].includes(currentNode.type)) {
      const mediaType = currentNode.type === 'GoogleSheetsNode' ? 'document' :
        currentNode.type === 'VideoNode' ? 'video' : 'image';
      await handleMediaNode(mediaType, currentNode, from, flow_id);

      const connections = graph[currentNodeId] || [];
      if (connections.length > 0) nextNodeId = connections[0].target;
    } else {
      if (message.type === 'text') {
        await executeQuery(
          'INSERT INTO user_answers (phone_number, flow_id, node_id, answer) VALUES (?, ?, ?, ?)',
          [from, flow_id, currentNodeId, msg]
        );
      }

      const connections = graph[currentNodeId] || [];
      if (connections.length > 0) nextNodeId = connections[0].target;
    }

    if (nextNodeId) {
      const nextNode = nodeMap[nextNodeId];

      await executeQuery(
        'UPDATE user_node_progress SET current_node_id = ? WHERE phone_number = ?',
        [nextNodeId, from]
      );



      if (nextNode.type === 'ListButton') {
        await sendWhatsAppList(from, nextNode.data.label, nextNode.data.targetValues);
      } else if (nextNode.type === 'ReplyButton') {
        await sendWhatsAppReplyButtons(from, nextNode.data.label, nextNode.data.targetValues);
      } else if (['GoogleSheetsNode', 'VideoNode', 'imageNode'].includes(nextNode.type)) {
        const mediaType = nextNode.type === 'GoogleSheetsNode' ? 'document' :
          nextNode.type === 'VideoNode' ? 'video' : 'image';
        await handleMediaNode(mediaType, nextNode, from, flow_id);
      } else {
        await sendWhatsAppText(from, nextNode?.data?.label || '...');
      }

    } else {
      await sendWhatsAppText(from, '✅ Flow complete. Type *restart* to try again.');
      await executeQuery('DELETE FROM user_node_progress WHERE phone_number = ?', [from]);
    }

    return res.sendStatus(200);
  } catch (error) {
    console.error('❌ Error in webhook handler:', error);
    return res.sendStatus(500);
  }
});






async function handleMediaNode(type, node, to, flow_id) {
  try {
    // ✅ Check if this node is already answered
    const [existingAnswer] = await executeQuery(
      'SELECT id FROM user_answers WHERE phone_number = ? AND flow_id = ? AND node_id = ? LIMIT 1',
      [to, flow_id, node.id]
    );

    if (existingAnswer) {
      console.log(`Media node ${node.id} already answered. Skipping.`);
      return;
    }

    console.log(`Handling ${type} node`);
    let fileName, urlPath;

    if (type === 'document') {
      fileName = node.data?.file;
      urlPath = 'uploadFiles';
    } else if (type === 'video') {
      fileName = node.data?.fileName;
      urlPath = 'videoFiles';
    } else { // image
      fileName = node.data?.fileName;
      urlPath = 'uploads';
    }

    if (!fileName) {
      console.log(`No file specified for ${type} node`);
      return;
    }

    const mediaUrl = `${process.env.NGROK_PUBLIC_URL}/${urlPath}/${encodeURIComponent(fileName)}`;
    console.log(`Media URL: ${mediaUrl}`);

    const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID || "671909416004124";
    const payload = {
      messaging_product: "whatsapp",
      to: to,
      type: type,
      [type]: type === 'document' ? {
        link: mediaUrl,
        filename: fileName
      } : type === 'video' ? {
        link: mediaUrl
      } : {
        link: mediaUrl,
        caption: node.data?.caption || ''
      }
    };

    console.log('Sending media payload:', JSON.stringify(payload, null, 2));
    const response = await fetch(`https://graph.facebook.com/v17.0/${phoneNumberId}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.WHATSAPP_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    console.log('Media send result:', result);

    await executeQuery(
      'INSERT INTO user_answers (phone_number, flow_id, node_id, answer) VALUES (?, ?, ?, ?)',
      [to, flow_id, node.id, fileName]
    );
  } catch (err) {
    console.error(`❌ Error handling ${type} node:`, err);
  }
}

router.post('/save_number', async (req, res) => {
  const { phone_number } = req.body;

  try {
    const insertQuery = `INSERT INTO whatsup_number (phone_number) values(?)`;

    connection.query(insertQuery, [phone_number], (err, data) => {

      if (err) {
        console.log(err)
        return res.json({ error: "database error" })
      }
      return res.json({ data, message: "saved number" })
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

router.get('/getPhone_numbers', async (req, res) => {
  try {
    sql = `select * from whatsup_number where status=0`;
    connection.query(sql, (err, data) => {
      if (err) {
        return res.json({ error: "database error" })
      }
      return res.status(200).json({ data, message: "fetched all numbers" })

    })
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" })
  }
})

router.post('/delete_number', async (req, res) => {
  const { id } = req.body;
  try {
    const sql = `update whatsup_number set status=1 where id=?`;
    connection.query(sql, [id], (err, data) => {
      if (err) {
        console.log(err)
        return res.status(400).json({ message: "Something went wrong" })
      }
      return res.status(200).json({ message: "Number deleted" })
    })

  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
})




// async function sendTemplateMessage(to, token, phoneNumberId) {
//   const url = `https://graph.facebook.com/v17.0/${phoneNumberId}/messages`;
// console.log()
//   const body = {
//     messaging_product: 'whatsapp',
//     to,
//     type: 'template',
//     template: {
//       name: 'hello_world', // use a template you created or 'hello_world'
//       language: { code: 'en_US' }
//     }
//   };

//   const response = await fetch(url, {
//     method: 'POST',
//     headers: {
//       Authorization: `Bearer ${token}`,
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(body)
//   });

//   const result = await response.json();
//   // console.log('Template message result:', result);

// }


module.exports = router;
