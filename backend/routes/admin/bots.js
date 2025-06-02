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

  console.log("flowId", flow_id)
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
          'INSERT INTO user_node_progress (phone_number, flow_id, current_node_index) VALUES (?, ?, ?)',
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

// for products
// router.post('/addwithwhatsup', async (req, res) => {
//   const { flowName, nodes, edges, to: toRaw, admin_id } = req.body;

//   console.log("to", toRaw)
//   // Validate "to" field
//   if (!toRaw || !Array.isArray(toRaw) || toRaw.length === 0) {
//     return res.status(400).json({ message: 'Missing or invalid "to" phone numbers' });
//   }

//   const toNumbers = toRaw
//     .map(num => String(num).replace(/\D/g, ''))         // Remove non-digits
//     .filter(num => /^\d{10,15}$/.test(num));            // Keep only valid numbers

//   if (toNumbers.length === 0) {
//     return res.status(400).json({ message: 'No valid phone numbers provided' });
//   }

//   const sql = `INSERT INTO bots(name, nodes, edges,admin_id) VALUES (?, ?, ?,?)`;
//   connection.query(sql, [flowName, JSON.stringify(nodes), JSON.stringify(edges), admin_id], async (err, result) => {
//     if (err) {
//       console.error('Error saving flow:', err);
//       return res.status(500).json({ message: 'Database error' });
//     }

//     const flowId = result.insertId;
//     const parsedNodes = typeof nodes === 'string' ? JSON.parse(nodes) : nodes;

//     for (const to of toNumbers) {
//       for (const node of parsedNodes) {
//         const type = node.type;
//         const data = node.data || {};

//         try {
//           if (['Custom', 'CustomNode', 'CustomText'].includes(type) && data.label) {
//             await sendWhatsAppText(to, data.label);
//           }

//           if (type === 'imageNode' && data.fileUrl) {
//             await sendWhatsAppImage(to, data.fileUrl);
//           }
//         } catch (sendError) {
//           console.error(`Failed to send to ${to} for node ${node.id}:`, sendError);
//         }
//       }
//     }

//     // console.log("flowId", flowId);

//     res.status(200).json({
//       message: 'Flow saved and messages sent to all numbers',
//       flowId
//     });
//   });
// });

const phoneNumberId = process.env.PHONE_NUMBER_ID
const token = process.env.WHATSAPP_TOKEN
// console.log(token)
// console.log(process.env.PHONE_NUMBER_ID)
// console.log(process.env.WHATSAPP_TOKEN)

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

const productsl = [
  { id: 1, name: "Laptop", price: 50000 },
  { id: 2, name: "Phone", price: 20000 },
  { id: 3, name: "Headphones", price: 3000 }
];

// working for products
// const flow_id=1
// router.post('/webhook', async (req, res) => {
//   try {
//     const body = req.body;
//    console.log('Incoming WhatsApp message:', JSON.stringify(req.body, null, 2));
//     if (
//       body.object === 'whatsapp_business_account' &&
//       body.entry?.[0]?.changes?.[0]?.value?.messages?.[0]
//     ) {
//       const message = body.entry[0].changes[0].value.messages[0];
//       const from = message.from;
//       const msg = message.text?.body?.trim().toLowerCase();

//       // ✅ Check user progress
//       const progressRows = await executeQuery(
//         'SELECT * FROM user_node_progress WHERE phone_number = ? AND flow_id = ?',
//         [from, flow_id]
//       );

//       let currentNodeIndex = progressRows.length ? progressRows[0].current_node_index : null;

//       // ✅ Start flow
//       if (currentNodeIndex === null || msg === 'hi' || msg === 'hello') {
//         let productList = '👋 Welcome! Please choose a product:\n';
//         productsl.forEach((p) => {
//           productList += `${p.id}. ${p.name}\n`;
//         });

//         await sendWhatsAppText(from, productList);

//         if (currentNodeIndex !== null) {
//           await executeQuery(
//             'UPDATE user_node_progress SET current_node_index = ? WHERE phone_number = ? AND flow_id = ?',
//             [0, from, flow_id]
//           );
//         } else {
//           await executeQuery(
//             'INSERT INTO user_node_progress (phone_number, flow_id, current_node_index) VALUES (?, ?, ?)',
//             [from, flow_id, 0]
//           );
//         }

//         return res.sendStatus(200);
//       }

//       // ✅ Product selection flow
//       if (currentNodeIndex === 0) {
//         const productId = parseInt(msg);
//         const product = productsl.find((p) => p.id === productId);

//         if (product) {
//           await sendWhatsAppText(from, `${product.name} costs ₹${product.price}`);

//           // ✅ Store answer
//           await executeQuery(
//             'INSERT INTO user_answers (phone_number, flow_id, node_id, answer) VALUES (?, ?, ?, ?)',
//             [from, flow_id, 'product_selection', product.name]
//           );

//           // ✅ Delete progress – flow ends here
//           await executeQuery(
//             'DELETE FROM user_node_progress WHERE phone_number = ? AND flow_id = ?',
//             [from, flow_id]
//           );

//         } else {
//           await sendWhatsAppText(from, '❌ Please send a valid product number.');
//         }

//         return res.sendStatus(200);
//       }

//       // ✅ Unknown state
//       await sendWhatsAppText(from, 'Type *hi* to restart the product flow.');
//       return res.sendStatus(200);
//     }

//     res.status(200).send('Webhook processed');
//   } catch (err) {
//     console.error('Error in webhook:', err);
//     res.sendStatus(500);
//   }
// })



// router.post('/webhook', async (req, res) => {
//   try {
//     const body = req.body;
//     console.log('Incoming WhatsApp message:', JSON.stringify(req.body, null, 2));

//     if (
//       body.object === 'whatsapp_business_account' &&
//       body.entry?.[0]?.changes?.[0]?.value?.messages?.[0]
//     ) {
//       const message = body.entry[0].changes[0].value.messages[0];
//       const from = message.from;
//       const msg = message.text?.body?.trim().toLowerCase();

//       // Fetch user progress (before condition)
//       let [progress] = await executeQuery(
//         'SELECT flow_id, current_node_index FROM user_node_progress WHERE phone_number = ?',
//         [from]
//       );

//       let flow_id = progress?.flow_id;

//       // START FLOW: if user says "hi" or "hello"
//       // if (msg === 'hi' || msg === 'hello') {
//       //   if (!flow_id) {
//       //     const [defaultBot] = await executeQuery('SELECT id FROM bots LIMIT 1');
//       //     if (!defaultBot) {
//       //       await sendWhatsAppText(from, '❌ No default bot is configured.');
//       //       return res.sendStatus(400);
//       //     }
//       //     flow_id = defaultBot.id;
//       //   }

//       //   const [bot] = await executeQuery('SELECT nodes, edges FROM bots WHERE id = ?', [flow_id]);
//       //   const nodes = typeof bot.nodes === 'string' ? JSON.parse(bot.nodes) : bot.nodes;
//       //   const edges = typeof bot.edges === 'string' ? JSON.parse(bot.edges) : bot.edges;

//       //   // Build ordered flow
//       //   const incomingMap = {};
//       //   edges.forEach(edge => (incomingMap[edge.target] = true));
//       //   const startNode = nodes.find(n => !incomingMap[n.id]);

//       //   const orderedNodes = [];
//       //   let current = startNode;
//       //   while (current) {
//       //     orderedNodes.push(current);
//       //     const nextEdge = edges.find(e => e.source === current.id);
//       //     current = nextEdge ? nodes.find(n => n.id === nextEdge.target) : null;
//       //   }

//       //   const firstNode = orderedNodes[0];
//       //   await sendWhatsAppText(from, firstNode?.data?.label || '👋 Hello!');

//       //   // Save or update user progress
//       //   if (progress) {
//       //     await executeQuery(
//       //       'UPDATE user_node_progress SET current_node_index = ? WHERE phone_number = ? AND flow_id = ?',
//       //       [0, from, flow_id]
//       //     );
//       //   } else {
//       //     await executeQuery(
//       //       'INSERT INTO user_node_progress (phone_number, flow_id, current_node_index) VALUES (?, ?, ?)',
//       //       [from, flow_id, 0]
//       //     );
//       //   }

//       //   return res.sendStatus(200);
//       // }

//       if (msg === 'hi' || msg === 'hello') {

//         if (progress) {
//           await executeQuery(
//             'UPDATE user_node_progress SET current_node_index = ? WHERE phone_number = ? AND flow_id = ?',
//             [0, from, flow_id]
//           );
//         } else {
//           await executeQuery(
//             'INSERT INTO user_node_progress (phone_number, flow_id, current_node_index) VALUES (?, ?, ?)',
//             [from, flow_id, 0]
//           );
//         }
//       }

//       // If not "hi", continue with flow
//       if (!flow_id) {
//         await sendWhatsAppText(from, '❌ No active flow found. Type *hi* to start.');
//         return res.sendStatus(400);
//       }

//       const [bot] = await executeQuery('SELECT nodes, edges FROM bots WHERE id = ?', [flow_id]);
//       const nodes = typeof bot.nodes === 'string' ? JSON.parse(bot.nodes) : bot.nodes;
//       const edges = typeof bot.edges === 'string' ? JSON.parse(bot.edges) : bot.edges;

//       const incomingMap = {};
//       edges.forEach(edge => (incomingMap[edge.target] = true));
//       const startNode = nodes.find(n => !incomingMap[n.id]);

//       const orderedNodes = [];
//       let current = startNode;
//       while (current) {
//         orderedNodes.push(current);
//         const nextEdge = edges.find(e => e.source === current.id);
//         current = nextEdge ? nodes.find(n => n.id === nextEdge.target) : null;
//       }

//       const currentNode = orderedNodes[progress.current_node_index];
//       if (!currentNode) {
//         await sendWhatsAppText(from, '❌ Flow error. Please type *hi* to restart.');
//         return res.sendStatus(200);
//       }

//       // Save answer
//       await executeQuery(
//         'INSERT INTO user_answers (phone_number, flow_id, node_id, answer) VALUES (?, ?, ?, ?)',
//         [from, flow_id, currentNode.id, msg]
//       );

//       // Move to next node
//       const nextIndex = progress.current_node_index + 1;
//       if (nextIndex < orderedNodes.length) {
//         const nextNode = orderedNodes[nextIndex];
//         await sendWhatsAppText(from, nextNode?.data?.label || '...');
//         await executeQuery(
//           'UPDATE user_node_progress SET current_node_index = ? WHERE phone_number = ? AND flow_id = ?',
//           [nextIndex, from, flow_id]
//         );
//       } else {
//         await sendWhatsAppText(from, '✅ Thank you! You have completed the flow.');
//         await executeQuery(
//           'DELETE FROM user_node_progress WHERE phone_number = ? AND flow_id = ?',
//           [from, flow_id]
//         );
//       }

//       return res.sendStatus(200);
//     }

//     res.status(200).send('Webhook processed');
//   } catch (err) {
//     console.error('❌ Error in webhook:', err);
//     res.sendStatus(500);
//   }
// });
function getOrderedFlow(nodes, edges) {
  const incomingMap = {};
  edges.forEach(edge => (incomingMap[edge.target] = true));
  const startNode = nodes.find(n => !incomingMap[n.id]);

  const ordered = [];
  let current = startNode;
  while (current) {
    ordered.push(current);
    const nextEdge = edges.find(e => e.source === current.id);
    current = nextEdge ? nodes.find(n => n.id === nextEdge.target) : null;
  }

  return ordered;
}

// its working correct
router.post('/webhook', async (req, res) => {
  try {
    const body = req.body;
    // console.log('📥 Incoming WhatsApp message:', JSON.stringify(body, null, 2));

    const message = body?.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
    if (!message || body.object !== 'whatsapp_business_account') {
      return res.status(200).send('No message to process');
    }

    const from = message.from;
    const msg = message.text?.body?.trim().toLowerCase();

    // Handle manual flow reset
    if (msg === 'restart') {
      await executeQuery('DELETE FROM user_node_progress WHERE phone_number = ?', [from]);
      await sendWhatsAppText(from, '🔄 Flow reset. Type *hi* to begin again.');
      return res.sendStatus(200);
    }

    // Fetch progress
    let [progress] = await executeQuery(
      'SELECT flow_id, current_node_index FROM user_node_progress WHERE phone_number = ?',
      [from]
    );

    let flow_id = progress?.flow_id;

    // Start flow if user says "hi" or "hello" and no progress exists
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

      // Save user progress
      await executeQuery(
        'INSERT INTO user_node_progress (phone_number, flow_id, current_node_index) VALUES (?, ?, ?)',
        [from, flow_id, 0]
      );

      return res.sendStatus(200);
    }

    // If no active progress and not saying "hi"
    if (!flow_id) {
      await sendWhatsAppText(from, '❌ No active flow found. Type *hi* to start.');
      return res.sendStatus(400);
    }

    // Continue the flow
    const [bot] = await executeQuery('SELECT nodes, edges FROM bots WHERE id = ?', [flow_id]);
    const nodes = typeof bot.nodes === 'string' ? JSON.parse(bot.nodes) : bot.nodes;
    const edges = typeof bot.edges === 'string' ? JSON.parse(bot.edges) : bot.edges;

    const orderedNodes = getOrderedFlow(nodes, edges);
    const currentNode = orderedNodes[progress.current_node_index];

    if (!currentNode) {
      await sendWhatsAppText(from, '❌ Flow error. Type *restart* to try again.');
      return res.sendStatus(200);
    }

    // Save answer
    await executeQuery(
      'INSERT INTO user_answers (phone_number, flow_id, node_id, answer) VALUES (?, ?, ?, ?)',
      [from, flow_id, currentNode.id, msg]
    );

    // Move to next node
    const nextIndex = progress.current_node_index + 1;

    if (nextIndex < orderedNodes.length) {
      const nextNode = orderedNodes[nextIndex];
      await sendWhatsAppText(from, nextNode?.data?.label || '...');
      await executeQuery(
        'UPDATE user_node_progress SET current_node_index = ? WHERE phone_number = ? AND flow_id = ?',
        [nextIndex, from, flow_id]
      );
    } else {
      await sendWhatsAppText(from, '✅ Thank you! You have completed the flow.');
      await executeQuery(
        'DELETE FROM user_node_progress WHERE phone_number = ? AND flow_id = ?',
        [from, flow_id]
      );
    }

    return res.sendStatus(200);
  } catch (err) {
    console.error('❌ Error in webhook:', err);
    res.sendStatus(500);
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
