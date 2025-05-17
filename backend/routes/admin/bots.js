const express = require('express');
const router = express.Router();
const connection = require('../../database/db');
const executeQuery = require('../../utils/executeQuery');
const { middleware } = require('../../middleware/middleware');

// const fetch = require('node-fetch');



router.post('/add', (req, res) => {
    const { flowName, nodes, edges ,sector_id,bot_type, admin_id} = req.body;

    const sql = `INSERT INTO bots(name, nodes, edges,sector_id,bot_type, admin_id) VALUES (?, ?, ?, ?, ?, ?)`;
    connection.query(sql, [flowName, JSON.stringify(nodes), JSON.stringify(edges),sector_id,bot_type, admin_id], (err, result) => {
        if (err) {
            console.error('Error saving flow:', err);
            return res.status(500).json({ message: 'Database error' });
        }
        
        // const botId=result.id; 
       
        // const insertQuery=`INSERT INTO bot_events (bot_id, bot_type, event_type, admin_id ) VALUES (?, ?, 'complete', ?);`
        //  connection.query(insertQuery, [botId, bot_type, admin_id], ()=>{
        //     if(err){
        //     console.error('Error saving flow:', err);
        //     return res.status(500).json({ message: 'Database error' });
        //     }
        // })   
        res.status(200).json({ message: 'Flow saved successfully', flowId: result.insertId });
        

    });
});

// GET: Fetch all flows

// router.get('/getAll', middleware, (req, res) => {
//     connection.query('SELECT * FROM bots ORDER BY created_at DESC', (err, results) => {
//         if (err) {
//             return res.status(500).json({ message: 'Error fetching flows' });
//         }
//         res.json(results);
//     });
// });

router.get('/getAll',  async(req, res)=>{
    try{
    //    const { admin_id } = req.query;
    const data=await executeQuery(`SELECT * FROM bots ORDER BY created_at DESC`) 
    return res.json({data})
    }catch(error){
        console.log(error)
        return res.status(500).json({error:"Internal Server Error"})
    }
});


// GET: Fetch flow by ID
router.get('/getbyid', async (req, res) => {
    try{
    const { id } = req.query;
    const data=await executeQuery(`SELECT * FROM bots where id=${id}`) 
        res.json({data:data[0]});
    }catch(error){
        console.log(error)
        return res.status(500).json({error:"Internal Server Error"}) 
    }
});

// router.post('/addwithwhatsup', (req, res) => {
//     const { flowName, nodes, edges, to } = req.body; // Add 'to' number in frontend request

//     const sql = `INSERT INTO bots(name, nodes, edges) VALUES (?, ?, ?)`;
//     connection.query(sql, [flowName, JSON.stringify(nodes), JSON.stringify(edges)], async (err, result) => {
//         if (err) {
//             console.error('Error saving flow:', err);
//             return res.status(500).json({ message: 'Database error' });
//         }

//         const flowId = result.insertId;
//         const messageText = `✅ Flow '${flowName}' saved successfully with ID: ${flowId}`;

//         // WhatsApp API details
//         const process.env.PHONE_NUMBER = '688758694314072'; // Your actual phone number ID
//         const token = 'EAAR5zlpRIpcBOwCFm3eGmq5S4nzr8ZAjaM2zsNJyX0sKuoaGhzupHGGObWGHrzWjZCUGtQIiZAZCJAdrws57srH7QifePZC16XZCbieXNbrDoHRCDZAwTxr7Mki3q6tqyqlsyOt8cGZA19PtFkkmuSYdm3FHBcs9RX3MnCNhoRAwadonugy6VdP0RpFGiigtklSGTX9Vry0KSlE6lJPm26SXXK3dNx8H4SzmZCZCZCESpIXFxgZD'; // Store this securely in .env

//         const url = `https://graph.facebook.com/v17.0/${process.env.PHONE_NUMBER}/messages`;
// console.log(messageText)
//         const whatsappBody = {
//             messaging_product: 'whatsapp',
//             to: to, // This should be a verified WhatsApp number
//             type: 'text',
//             text: { body: `${messageText}` }
//         };

//         try {
//             const waResponse = await fetch(url, {
//                 method: 'POST',
//                 headers: {
//                     'Authorization': `Bearer ${token}`,
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(whatsappBody)
//             });

//             const waData = await waResponse.json();

//             if (waData.error) {
//                 console.error('WhatsApp Error:', waData);
//             }

//             // Respond to frontend
//             res.status(200).json({
//                 message: 'Flow saved and WhatsApp message sent',
//                 flowId: flowId,
//                 whatsappStatus: waData
//             });
//         } catch (whatsappError) {
//             console.error('Error sending WhatsApp:', whatsappError);
//             res.status(200).json({
//                 message: 'Flow saved, but failed to send WhatsApp message',
//                 flowId: flowId
//             });
//         }
//     });
// });

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

router.post('/addwithwhatsup', async (req, res) => {
  const { flowName, nodes, edges, to } = req.body;

  const sql = `INSERT INTO bots(name, nodes, edges) VALUES (?, ?, ?)`;
  connection.query(sql, [flowName, JSON.stringify(nodes), JSON.stringify(edges)], async (err, result) => {
    if (err) {
      console.error('Error saving flow:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    const flowId = result.insertId;

    // WhatsApp Config
    // const process.env.PHONE_NUMBER = '688758694314072';
    const token='EAAR5zlpRIpcBOZBYvmBZAS94AGunOjFOWjsHwaYnZAvIAbXAWc9mszBmw18ki5TqZCrZCWWqf4Jb1LSVvYg0OZALMu4rWJkZAwWGVe96LUDmWaCgkgBxevKZCyYEZC3DPvZALTJ9eZBpw2T1uxZAVoCMS5tpjVrbcd0hDuYHqa0OrYon0ajo8yg3ZBdsxEaCmPCccqj8t6WZBLmlZCQ0t2zZA5KJ9Da9LMJl4cS5ZCr8bVyITibFFKQgZD'; // Store in .env

    // Step 1: Parse nodes if necessary
    const parsedNodes = typeof nodes === 'string' ? JSON.parse(nodes) : nodes;
// console.log(parsedNodes)
    // Step 2: Send each node content
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


async function sendWhatsAppText(to, text, token) {
    // console.log(to)
  const url = `https://graph.facebook.com/v17.0/${process.env.PHONE_NUMBER_ID}/messages`;
  const body = {
    messaging_product: 'whatsapp',
    to,
    type: 'text',
    text: { body: text }
  };
// console.log(body)
const response=  await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
 const result = await response.json();
//  console.log(result)
}

async function sendWhatsAppImage(to, imageUrl, token) {
  const url = `https://graph.facebook.com/v17.0/${process.env.PHONE_NUMBER_ID}/messages`;
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


router.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token && mode === 'subscribe' && token === process.env.JWT_SECRET) {
    console.log('✅ Webhook Verified');
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});


// POST - For receiving actual messages (optional)
router.post('/webhook', (req, res) => {
  console.log(req.body)
  console.log('📩 Incoming Webhook:', JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

module.exports = router;