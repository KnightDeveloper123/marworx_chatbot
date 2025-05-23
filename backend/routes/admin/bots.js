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




router.post('/send-whatsapp', async (req, res) => {
  const { to } = req.body;
  const PhoneNumber = '688758694314072'
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

const products = [
  { id: 1, name: "Product A", price: "₹100" },
  { id: 2, name: "Product B", price: "₹200" },
];

router.post('/addwithwhatsup', async (req, res) => {
  const { flowName, nodes, edges, } = req.body;
  const toRaw = req.body.to;
  if (!toRaw) {
    return res.status(400).json({ message: 'Missing "to" phone number in request body' });
  }

  const to = typeof toRaw === 'string' ? toRaw.replace(/\D/g, '') : String(toRaw).replace(/\D/g, '');

  if (!/^\d{10,15}$/.test(to)) {
    return res.status(400).json({ message: 'Invalid phone number format' });
  }

  const sql = `INSERT INTO bots(name, nodes, edges) VALUES (?, ?, ?)`;
  connection.query(sql, [flowName, JSON.stringify(nodes), JSON.stringify(edges)], async (err, result) => {
    if (err) {
      console.error('Error saving flow:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    const flowId = result.insertId;

    const parsedNodes = typeof nodes === 'string' ? JSON.parse(nodes) : nodes;

    for (const node of parsedNodes) {
      const type = node.type;
      const data = node.data || {};

      try {
        if (['Custom', 'CustomNode', 'CustomText'].includes(type) && data.label) {
          await sendWhatsAppText(to, data.label, process.env.WHATSAPP_TOKEN, process.env.PHONE_NUMBER_ID);
        }
      
        if (type === 'imageNode' && data.fileUrl) {
          await sendWhatsAppImage(to, data.fileUrl, process.env.WHATSAPP_TOKEN, process.env.PHONE_NUMBER_ID);
        }
      } catch (sendError) {
        console.error(`Failed to send WhatsApp message for node ${node.id}:`, sendError);
      }
    }

    res.status(200).json({
      message: 'Flow saved and messages sent',
      flowId: flowId
    });
  });
});
const phoneNumberId = process.env.PHONE_NUMBER_ID
const token=process.env.WHATSAPP_TOKEN
// console.log(process.env.PHONE_NUMBER_ID)
// console.log(process.env.WHATSAPP_TOKEN)

async function sendWhatsAppText(to, text, ) {
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
  
  console.log('Send result+:', result);

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

// ✅ Actual Webhook (POST)
router.post('/webhook', async (req, res) => {
  console.log('Incoming Webhook:', JSON.stringify(req.body, null, 2));

  const body = req.body;

  const messageData = body?.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
  if (messageData) {
    const from = messageData.from;
    const msg = messageData.text?.body?.trim().toLowerCase();

    if (msg === 'hi' || msg === 'hello') {
      let productList = 'Welcome! Product list:\n';
      products.forEach((p) => {
        productList += `${p.id}. ${p.name}\n`;
      });
      await sendMessage(from, productList);
    } else {
      const productId = parseInt(msg);
      const product = products.find((p) => p.id === productId);
      if (product) {
        await sendMessage(from, `${product.name} ₹${product.price}`);
      } else {
        await sendMessage(from, 'Please send a valid product number.');
      }
    }
  }

  res.sendStatus(200);
});


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