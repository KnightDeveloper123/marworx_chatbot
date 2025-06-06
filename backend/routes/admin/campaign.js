const express = require('express');
const connection = require('../../database/db');
const executeQuery = require('../../utils/executeQuery');
const { middleware } = require('../../middleware/middleware');
const { Parser } = require('json2csv');
const { format } = require('fast-csv');
const fs = require('fs');
const PDFDocument = require('pdfkit');
const router = express.Router();

// router.post("/add", middleware, async (req, res) => {
//     try {
//         const {  channel_name, campaign_name,template_name, template_type, template_lang, header, body,admin_id ,to,sector_id,bot_type} = req.body;
//     console.log(req.body)
//         const insertQuery = 'insert into campaign (channel_name, campaign_name, template_name, template_type, template_lang, header, body, is_status,admin_id,\`to\`,sector_id,bot_type) values (?, ?, ?, ?,  ?, ?, ?, "Sent", ?, ?,?,?);'
//         connection.execute(insertQuery, [channel_name, campaign_name,   template_name, template_type, template_lang, header, body,admin_id, to,sector_id,bot_type ], (err, data) => {
//             if (err) {
//                 console.log(err);
//                 return res.status(400).json({ error: "Something went wrong" })
//             }
//             return res.json({ success: "Campaign Added", data })
//         })
//     } catch (error) {
//         console.log("/add: ", error.message);
//         return res.status(500).json({ error: "Internal Server Error." });
//     }
// });

router.post("/add", middleware, async (req, res) => {
  try {
    const {
      channel_name,
      campaign_name,
      template_name,
      template_type,
      template_lang,
      header,
      body,
      admin_id,

      sector_id,
      to
      //   bot_type
    } = req.body;

    // console.log(req.body);

    const insertQuery = `
      INSERT INTO campaign 
      (channel_name, campaign_name, template_name, template_type, template_lang, header, body, is_status, admin_id, sector_id, \`to\`) 
      VALUES (?, ?, ?, ?, ?, ?, ?, "Sent", ?, ?, ?);
    `;

    const values = [
      channel_name ?? null,
      campaign_name ?? null,
      template_name ?? null,
      template_type ?? null,
      template_lang ?? null,
      header ?? null,
      body ?? null,
      admin_id ?? null,
      sector_id ?? null,
      to ?? null

      //   bot_type ?? null
    ];

    connection.execute(insertQuery, values, (err, data) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ error: "Something went wrong" });
      }
      const flowId = data.insertId;
      // console.log("campaign id", flowId)
      return res.json({ success: "Campaign Added", data, flowId });
    });
  } catch (error) {
    console.log("/add: ", error.message);
    return res.status(500).json({ error: "Internal Server Error." });
  }
});

router.post("/update", middleware, async (req, res) => {
  try {
    const {
      channel_name, campaign_name,
      template_name, template_type, template_lang, header, body, campaign_id } = req.body;

    let updateFields = [];
    let updateValues = [];

    if (channel_name) {
      updateFields.push("channel_name = ?");
      updateValues.push(channel_name);
    }
    if (campaign_name) {
      updateFields.push("campaign_name = ?");
      updateValues.push(campaign_name);
    }
    // if (message_content) {
    //   updateFields.push("message_content = ?");
    //   updateValues.push(message_content);
    // }
    // if (sector) {
    // updateFields.push("sector = ?");
    // updateValues.push(sector);
    // } 
    if (template_name) {
      updateFields.push("template_name = ?");
      updateValues.push(template_name);
    }

    if (template_type) {
      updateFields.push("template_type = ?");
      updateValues.push(template_type);
    }
    if (template_lang) {
      updateFields.push("template_lang = ?");
      updateValues.push(template_lang);
    }

    if (header) {
      updateFields.push("header = ?");
      updateValues.push(header);
    }
    if (body) {
      updateFields.push("body = ?");
      updateValues.push(body);
    }

    if (updateFields.length === 0) {
      return res.status(400).json({ error: "No fields to update" });
    }

    const updateSql = `UPDATE campaign SET ${updateFields.join(', ')} WHERE id = ?`;
    updateValues.push(campaign_id);

    connection.query(updateSql, updateValues, (updateErr) => {
      if (updateErr) {
        console.error(updateErr);
        return res.status(400).json({ error: "Error updating Campaign" });
      }
      return res.send({ success: "Campaign updated successfully" });

    });
  } catch (error) {
    console.error("Error in /update :", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/delete", middleware, async (req, res) => {
  try {
    const { user_id } = req.body;

    const query = `UPDATE campaign SET status=1, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;

    connection.execute(query, [user_id], (err, data) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ error: "Something went wrong" })
      }
      if (data.affectedRows === 0) {
        return res.status(404).json({ error: "Record not found" });
      }
      return res.json({ success: "Campaign deleted", data })
    });
  } catch (error) {
    console.error("Error in /updateUser:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get('/getCampaign', middleware, async (req, res) => {
  try {
    const { user_id } = req.query;
    const data = await executeQuery(`select campaign.*, s.name as sname from campaign
        left join sector as s on campaign.sector_id=s.id
        where campaign.id=${user_id}`)
    return res.json({ data: data[0] })
  } catch (error) {
    // console.log(error)
    return res.status(500).json({ error: "Internal Server Error" })
  }
});

router.get('/getAllCampaign', middleware, async (req, res) => {
  try {
    const { admin_id } = req.query;
    // console.log("id",admin_id)

    const data = await executeQuery(`select campaign.*, s.name as sname
        from campaign 
       left join sector as s on campaign.sector_id=s.id
      where campaign.status=0 AND campaign.admin_id=${admin_id} order by campaign.id desc`)
    return res.json({ data })
  } catch (error) {
    // console.log(error)
    return res.status(500).json({ error: "Internal Server Error" })
  }
});

router.post('/track-user-campaign', async (req, res) => {
  const { campaign_id, user_id } = req.body;
  // console.log(req.body)

  if (!campaign_id || !user_id) {
    return res.status(400).json({ success: false, message: 'botId and userId are required' });
  }

  try {
    // Prevent duplicate entries (optional - works only if UNIQUE(bot_id, user_id) is set)
    await executeQuery(`
      INSERT  INTO campaign_users ( campaign_id,user_id ) VALUES (?, ?)
    `, [campaign_id, user_id]);

    return res.status(201).json({ success: true, message: 'User-bot tracked successfully' });
  } catch (err) {
    console.error('Error inserting into bot_users:', err);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

router.get('/export', async (req, res) => {
  const { status } = req.query;

  let query = 'SELECT * FROM campaign';
  const values = [];

  if (status !== undefined) {
    query += ' WHERE status = ?';
    values.push(status);
  }

  const [rows] = await executeQuery(query, values);
  const parser = new Parser();
  const csv = parser.parse(rows);

  res.header('Content-Type', 'text/csv');
  res.attachment('campaigns.csv');
  res.send(csv);
});


// for export csv

router.get('/export/campaigns/csv', async (req, res) => {
  try {
    const campaigns = await executeQuery(`
      SELECT id, campaign_name, channel_name, is_status, created_at
      FROM campaign
      ORDER BY created_at DESC
    `);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=campaigns.csv');

    const csvStream = format({ headers: true });
    csvStream.pipe(res);
    campaigns.forEach(row => csvStream.write(row));
    csvStream.end();

  } catch (err) {
    console.error('CSV Export Error:', err);
    res.status(500).json({ success: false, message: 'Error exporting CSV' });
  }
});


// for singal campaign 
router.get('/export/campaigns/csv/:id', async (req, res) => {
  const campaignId = req.params.id;

  try {
    const result = await executeQuery(`
      SELECT id, campaign_name,template_name,template_type, channel_name, is_status, created_at
      FROM campaign
      WHERE id = ?
    `, [campaignId]);

    if (!result.length) {
      return res.status(404).json({ success: false, message: 'Campaign not found' });
    }

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=campaign_${campaignId}.csv`);

    const csvStream = format({ headers: true });
    csvStream.pipe(res);
    csvStream.write(result[0]); // 👈 export only the single row
    csvStream.end();

  } catch (err) {
    console.error('CSV Export Error:', err);
    res.status(500).json({ success: false, message: 'Error exporting CSV' });
  }
});

//export pdf 
router.get('/export/campaigns/pdf', async (req, res) => {
  try {
    const campaigns = await executeQuery(`
      SELECT id, campaign_name, channel_name, is_status, created_at
      FROM campaign
      ORDER BY created_at DESC
    `);

    const doc = new PDFDocument({ margin: 30 });
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=campaigns.pdf');
    doc.pipe(res);

    doc.fontSize(16).text('Campaign Report', { align: 'center' });
    doc.moveDown();

    campaigns.forEach(c => {
      doc.fontSize(12).text(`Name: ${c.campaign_name}`);
      doc.text(`Channel: ${c.channel_name}`);
      doc.text(`Status: ${c.is_status}`);
      doc.text(`Created At: ${new Date(c.created_at).toLocaleString()}`);
      doc.moveDown();
    });

    doc.end();

  } catch (err) {
    console.error('PDF Export Error:', err);
    res.status(500).json({ success: false, message: 'Error exporting PDF' });
  }
});


module.exports = router;