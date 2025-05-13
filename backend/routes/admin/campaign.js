const express = require('express');
const router = express.Router();
const connection = require('../../database/db');
const executeQuery = require('../../utils/executeQuery');
const { middleware } = require('../../middleware/middleware');
const { Parser } = require('json2csv');



router.post("/add", middleware, async (req, res) => {
    try {
        const {  channel_name, campaign_name, message_content, sector, template_name, template_type, template_lang, header, body,admin_id ,to,sector_id,bot_type} = req.body;
    
        const insertQuery = 'insert into campaign (channel_name, campaign_name, message_content, sector, template_name, template_type, template_lang, header, body, is_status,admin_id,\`to\`,sector_id,bot_type) values (?, ?, ?, ?, ?, ?, ?, ?, ?, "Sent", ?, ?,?,?);'
        connection.execute(insertQuery, [channel_name, campaign_name, message_content, sector, template_name, template_type, template_lang, header, body,admin_id, to,sector_id,bot_type ], (err, data) => {
            if (err) {
                console.log(err);
                return res.status(400).json({ error: "Something went wrong" })
            }
            return res.json({ success: "Campaign Added", data })
        })
    } catch (error) {
        console.log("/add: ", error.message);
        return res.status(500).json({ error: "Internal Server Error." });
    }
});

router.post("/update", middleware, async (req, res) => {
    try {
        const { channel_name, campaign_name, message_content, sector, template_name, template_type, template_lang, header, body, campaign_id } = req.body;

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
        if (message_content) {
        updateFields.push("message_content = ?");
        updateValues.push(message_content);
        }
        if (sector) {
        updateFields.push("sector = ?");
        updateValues.push(sector);
        } 
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

router.get('/getCampaign', middleware, async(req, res)=>{
    try{
    const { user_id } = req.query;
    const data=await executeQuery(`select campaign.*, s.name as sname from campaign
        left join sector as s on campaign.sector=s.id
        where campaign.id=${user_id}`) 
    return res.json({data:data[0]})
    }catch(error){
        console.log(error)
        return res.status(500).json({error:"Internal Server Error"})
    }
});

router.get('/getAllCampaign', middleware, async(req, res)=>{
    try{
   const { admin_id } = req.query;
   
    const data=await executeQuery(`select campaign.*, s.name as sname
        from campaign 
       left join sector as s on campaign.sector=s.id
      where campaign.status=0 AND campaign.admin_id=${admin_id} order by campaign.id desc`) 
    return res.json({data})
    }catch(error){
        console.log(error)
        return res.status(500).json({error:"Internal Server Error"})
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
  


module.exports=router;