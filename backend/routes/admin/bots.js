const express = require('express');
const router = express.Router();
const connection = require('../../database/db');
const executeQuery = require('../../utils/executeQuery');
const { middleware } = require('../../middleware/middleware');

// const fetch = require('node-fetch');

router.post('/add', (req, res) => {
  const { flowName, nodes, edges, sector_id, bot_type, admin_id } = req.body;

  const sql = `INSERT INTO bots(name, nodes, edges,sector_id,bot_type, admin_id) VALUES (?, ?, ?, ?, ?, ?)`;
  connection.query(sql, [flowName, JSON.stringify(nodes), JSON.stringify(edges), sector_id, bot_type, admin_id], (err, result) => {
    if (err) {
      console.error('Error saving flow:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    res.status(200).json({ message: 'Flow saved successfully', flowId: result.insertId });
  });
});

router.get('/getAll', async (req, res) => {
  try {
    const { admin_id } = req.query;
    const data = await executeQuery(`SELECT * FROM bots where admin_id=${admin_id} ORDER BY created_at DESC`)
    return res.json({ data })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: "Internal Server Error" })
  }
});

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

const phoneNumberId = process.env.PHONE_NUMBER_ID
const token = process.env.WHATSAPP_TOKEN

//send bot 
router.post('/addwithwhatsup', async (req, res) => {
  const { flowName, nodes, edges, to: toRaw, admin_id, flow_id } = req.body;
  // console.log("nodes", req.body);

  nodes.forEach((node) => {
    if (node.type === 'ListButton') {
      // console.log(`Node ID: ${node.id}, targetValues:`, node.data.targetValues);
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

  const parsedNodes = typeof nodes === 'string' ? JSON.parse(nodes) : nodes;
  // console.log(parsedNodes)
  const parsedEdges = typeof edges === 'string' ? JSON.parse(edges) : edges;
  // console.log(parsedEdges)
  // Find start node
  const incomingMap = {};
  parsedEdges.forEach(edge => {
    incomingMap[edge.target] = true;
  });
  // console.log(incomingMap)
  const startNode = parsedNodes.find(n => !incomingMap[n.id]);
  // console.log(startNode)
  // console.log(startNode?.type)

  for (const to of toNumbers) {
    try {
      const connections = parsedEdges.filter(e => e.source === startNode.id);
if (connections.length > 0) {
  const next = parsedNodes.find(n => n.id === connections[0].target);
  if (next) {
    if (next.type === 'ListButton') {
      await sendListButtonText(to, next.data.label, next.data.targetValues);
    } else if (next.type === 'imageNode') {
      await sendWhatsAppImage(to, next.data.fileUrl);
    } else if (next.type === 'VideoNode') {
      await sendWhatsAppVideo(to, next.data.fileUrl);
    } else {
      await sendWhatsAppText(to, next.data.label);
    }

    await executeQuery(
      'UPDATE user_node_progress SET current_node_id = ? WHERE phone_number = ?',
      [next.id, to]
    );
    continue; // skip the old insert below
  }
}

      // if (startNode?.type === 'imageNode' && startNode?.data?.fileUrl) {
      //   await sendWhatsAppImage(to, startNode.data.fileUrl);
      // } else if (startNode?.type === 'VideoNode' && startNode?.data?.fileUrl) {
      //   await sendWhatsAppVideo(to, startNode.data.fileUrl);
      // } else if (startNode?.type === 'ListButton') {
      //   await sendListButtonText(to, startNode.data.label, startNode.data.targetValues);
      // } else if (startNode?.type === 'GoogleSheetsNode') {
      //   await sendWhatsAppText(to, `✅ Google Sheet Attached: ${startNode.data.file}`);
      // } else {
      //   await sendWhatsAppText(to, startNode?.data?.label || '🧩 ...next step...');
      // }


      // Save user progress as starting point
      // await executeQuery(
      //   'INSERT INTO user_node_progress (phone_number, flow_id, current_node_id) VALUES (?, ?, ?)',
      //   [to, flow_id, startNode.id]
      // );
    } catch (sendErr) {
      console.error(`Error sending to ${to}:`, sendErr);
    }
  }

  res.status(200).json({
    message: 'Flow saved and first message sent.',
    flow_id
  });

});
async function sendListButtonText(to, title, options = []) {
  console.log(to, title, options = [])
  const listString = options.map((opt, i) => `${i + 1}. ${opt}`).join('\n');
  console.log(listString)
  const body = `📋 *${title}*\n\nPlease reply with one of the following:\n${listString}`;
  await sendWhatsAppText(to, body);
}
async function sendWhatsAppVideo(to, videoUrl) {
  const url = `https://graph.facebook.com/v17.0/${phoneNumberId}/messages`;
  const body = {
    messaging_product: 'whatsapp',
    to,
    type: 'video',
    video: { link: videoUrl }
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
  if (!response.ok) {
    throw new Error(`WhatsApp Video Error: ${JSON.stringify(result)}`);
  }
}

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

async function sendWhatsAppImage(to, imageUrl) {
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
      Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
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

router.post('/webhook', async (req, res) => {
  try {
    const body = req.body;
    console.log("incoming data", JSON.stringify(req.body, null, 2))
    const message = body?.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
    if (!message || body.object !== 'whatsapp_business_account') {
      return res.status(200).send('No message to process');
    }

    const from = message.from;
    const msg = message.text?.body?.trim().toLowerCase();

    // RESET FLOW
    if (msg === 'restart') {
      // await executeQuery('DELETE FROM user_node_progress WHERE phone_number = ?', [from]);
      await sendWhatsAppText(from, '🔄 Flow reset. Type *hi* to begin again.');
      return res.sendStatus(200);
    }

    // GET USER PROGRESS
    let [progress] = await executeQuery(
      'SELECT flow_id, current_node_id FROM user_node_progress WHERE phone_number = ?',
      [from]
    );
    console.log("progress", progress)
    let flow_id = progress?.flow_id;
    console.log("flow_id", flow_id)

    // START FLOW
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
      const firstNode = nodes[0]; // Assume first in array is start

      // Find next node (if any)
      const connections = graph[firstNode.id];
      if (connections && connections.length > 0) {
        const nextNode = nodeMap[connections[0].target];

        if (nextNode?.type === 'ListButton') {
          await sendListButtonText(from, nextNode.data.label, nextNode.data.targetValues);
        } else if (nextNode?.type === 'CustomText') {
          await sendWhatsAppText(from, nextNode.data.label);
        }

        await executeQuery(
          'UPDATE user_node_progress SET current_node_id = ? WHERE phone_number = ?',
          [nextNode.id, from]
        );
      }

      return res.sendStatus(200);
    }

    if (!flow_id) {
      return res.status(400).send('No active flow');
    }

    // LOAD BOT FLOW
    const [bot] = await executeQuery('SELECT nodes, edges FROM bots WHERE id = ?', [flow_id]);
    const nodes = typeof bot.nodes === 'string' ? JSON.parse(bot.nodes) : bot.nodes;
    const edges = typeof bot.edges === 'string' ? JSON.parse(bot.edges) : bot.edges;

    const { graph, nodeMap } = buildFlowGraph(nodes, edges);


    let currentNodeId = progress?.current_node_id;
    console.log("currentId", currentNodeId)
    // Fallback if the ID is invalid (e.g., "0")
    if (!nodeMap[currentNodeId]) {
      // Reset progress with first node
      const firstNode = nodes[0]; // usually the start node
      currentNodeId = firstNode.id;

      await executeQuery(
        'UPDATE user_node_progress SET current_node_id = ? WHERE phone_number = ?',
        [currentNodeId, from]
      );
    }

    const currentNode = nodeMap[currentNodeId];

    if (!currentNode) {
      await sendWhatsAppText(from, '⚠️ Flow error. Restarting...');
      await executeQuery('DELETE FROM user_node_progress WHERE phone_number = ?', [from]);
      return res.sendStatus(200);
    }


    let startNodeId = null;

    // Handle ListButton
    if (currentNode.type === 'ListButton' && Array.isArray(currentNode.data?.targetValues)) {
      const selectedIndex = currentNode.data.targetValues.findIndex(
        val => val.toLowerCase().trim() === msg
      );

      if (selectedIndex !== -1) {
        const connections = graph[currentNodeId] || [];
        const match = connections.find(conn => conn.sourceHandle === `option-${selectedIndex}`);

        if (match) {
          nextNodeId = match.target;
        }
      }
    }

    // Handle CustomText (free text input)
    else if (currentNode.type === 'CustomText') {
      // Save user answer logic here (optional)
      await executeQuery(
        'INSERT INTO user_answers (phone_number, flow_id, node_id, answer) VALUES (?, ?, ?, ?)',
        [from, flow_id, currentNodeId, msg]
      );

      const connections = graph[currentNodeId];
      if (connections && connections.length > 0) {
        nextNodeId = connections[0].target;
      }
    }

    // Default case: go to next if edge exists
    else if (!nextNodeId && graph[currentNodeId] && graph[currentNodeId].length > 0) {
      nextNodeId = graph[currentNodeId][0].target;
    }

    if (nextNodeId) {
      const nextNode = nodeMap[nextNodeId];
      setTimeout(async () => {
        await sendWhatsAppText(from, nextNode?.data?.label || '🧩 ...next step...');
      }, 2000); // 2-second delay

      await executeQuery(
        'UPDATE user_node_progress SET current_node_id = ? WHERE phone_number = ?',
        [nextNodeId, from]
      );
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
