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



//send bot 
router.post('/addwithwhatsup', async (req, res) => {
  const { flowName, nodes, edges, to: toRaw, admin_id, flow_id } = req.body;
  // console.log("nodes", nodes)

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

  const sql = `INSERT INTO bots(name, nodes, edges, admin_id) VALUES (?, ?, ?, ?)`;
  connection.query(sql, [flowName, JSON.stringify(nodes), JSON.stringify(edges), admin_id], async (err, result) => {
    if (err) {
      console.error('Error saving flow:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    const flowId = result.insertId;
    // console.log(flowId)

    const parsedNodes = typeof nodes === 'string' ? JSON.parse(nodes) : nodes;

    const parsedEdges = typeof edges === 'string' ? JSON.parse(edges) : edges;
    const nodesWithFlowId = nodes.map(node => ({
      ...node,
      flowId: flowId
    }));

    // Find start node
    const incomingMap = {};
    parsedEdges.forEach(edge => {
      incomingMap[edge.target] = true;
    });
    const startNode = parsedNodes.find(n => !incomingMap[n.id]);

    for (const to of toNumbers) {
      try {
        if (startNode?.type === 'imageNode' && startNode?.data?.fileUrl) {
          await sendWhatsAppImage(to, startNode.data.fileUrl);
        } else if (startNode?.data?.label) {
          await sendWhatsAppText(to, startNode.data.label);
        } else {
          await sendWhatsAppText(to, '👋 Hello! Let\'s begin.');
        }

        // Save user progress as starting point
        await executeQuery(
          'INSERT INTO user_node_progress (phone_number, flow_id, current_node_id) VALUES (?, ?, ?)',
          [to, flowId, 0]
        );
      } catch (sendErr) {
        console.error(`Error sending to ${to}:`, sendErr);
      }
    }

    res.status(200).json({
      message: 'Flow saved and first message sent.',
      flowId
    });
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


///working //
// function getOrderedFlow(nodes, edges) {
//   const incomingMap = {};
//   edges.forEach(edge => (incomingMap[edge.target] = true));
//   // const startNode = nodes.find(n => !incomingMap[n.id]);
//   let startNode = parsedNodes.find(n => !incomingMap[n.id]);

//   // If it's a dummy node, go to its next connected node
//   if (!startNode?.data?.label) {
//     const nextEdge = parsedEdges.find(e => e.source === startNode.id);
//     if (nextEdge) {
//       startNode = parsedNodes.find(n => n.id === nextEdge.target);
//     }
//   }


//   const ordered = [];
//   let current = startNode;
//   while (current) {
//     ordered.push(current);
//     const nextEdge = edges.find(e => e.source === current.id);
//     current = nextEdge ? nodes.find(n => n.id === nextEdge.target) : null;
//   }

//   return ordered;
// }

function getOrderedFlow(nodes, edges) {
  const incomingMap = {};
  edges.forEach(edge => (incomingMap[edge.target] = true));

  // Find the start node (no incoming edges)
  let startNode = nodes.find(n => !incomingMap[n.id]);
  console.log('🔍 Start Node:', startNode);

  if (!startNode) return [];

  // Skip dummy nodes without labels
  if (!startNode?.data?.label) {
    const nextEdge = edges.find(e => e.source === startNode.id);
    if (nextEdge) {
      startNode = nodes.find(n => n.id === nextEdge.target);
    }
  }

  const ordered = [];
  let current = startNode;
  const visited = new Set();

  while (current && !visited.has(current.id)) {
    ordered.push(current);
    visited.add(current.id);

    const nextEdge = edges.find(e => e.source === current.id);
    current = nextEdge ? nodes.find(n => n.id === nextEdge.target) : null;
  }

  console.log('✅ Ordered Flow:', ordered.map(n => n.data?.label || n.id));
  return ordered;
}




router.post('/webhook', async (req, res) => {
  try {
    const body = req.body;
    console.log('📥 Incoming WhatsApp message:', JSON.stringify(req.body, null, 2));

    const message = body?.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
    if (!message || body.object !== 'whatsapp_business_account') {
      return res.status(200).send('No message to process');
    }

    const from = message.from;
    const msg = message.text?.body?.trim().toLowerCase();

    // Handle flow reset
    if (msg === 'restart') {
      await executeQuery('DELETE FROM user_node_progress WHERE phone_number = ?', [from]);
      await sendWhatsAppText(from, '🔄 Flow reset. Type *hi* to begin again.');
      return res.sendStatus(200);
    }

    // Fetch user's current progress
    let [progress] = await executeQuery(
      'SELECT flow_id, current_node_id FROM user_node_progress WHERE phone_number = ?',
      [from]
    );

    let flow_id = progress?.flow_id;
    console.log("flow_id", flow_id);

    // Start flow on 'hi' or 'hello' if no progress
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

      const orderedNodes = getOrderedFlow(nodes, edges);
      const firstNode = orderedNodes[0];

      await sendWhatsAppText(from, firstNode?.data?.label || '👋 Hello!');

      // Save user progress with the first node's id
      await executeQuery(
        'INSERT INTO user_node_progress (phone_number, flow_id, current_node_id) VALUES (?, ?, ?)',
        [from, flow_id, firstNode.id]
      );

      return res.sendStatus(200);
    }

    // If no active flow and user didn't say 'hi'
    if (!flow_id) {
      await sendWhatsAppText(from, '❌ No active flow found. Type *hi* to start.');
      return res.sendStatus(400);
    }

    // Continue flow
    const [bot] = await executeQuery('SELECT nodes, edges FROM bots WHERE id = ?', [flow_id]);
    const nodes = typeof bot.nodes === 'string' ? JSON.parse(bot.nodes) : bot.nodes;
    const edges = typeof bot.edges === 'string' ? JSON.parse(bot.edges) : bot.edges;

    const orderedNodes = getOrderedFlow(nodes, edges);

    // Find index of current node using node id from progress
    // const currentIndex = orderedNodes.findIndex(n => n.id === progress.current_node_id);
       const currentNodeIndex = orderedNodes.findIndex(n => n.id === progress.current_node_id);
    const nextNodeIndex = currentNodeIndex + 1;

    // If there is a next node, send it and update progress
    if (nextNodeIndex < orderedNodes.length) {
      const nextNode = orderedNodes[nextNodeIndex];

      await sendWhatsAppText(from, nextNode?.data?.label || '🧩 Next message');

      // Update user progress to next node
      await executeQuery(
        'UPDATE user_node_progress SET current_node_id = ? WHERE phone_number = ?',
        [nextNode.id, from]
      );
    } else {
      // Flow complete
      await sendWhatsAppText(from, '✅ Flow completed. Type *restart* to start again.');
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
