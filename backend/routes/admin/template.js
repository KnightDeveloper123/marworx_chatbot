const express = require('express');
const router = express.Router();
const connection = require('../../database/db');
const executeQuery = require('../../utils/executeQuery');
const fs = require('fs');
const { middleware } = require('../../middleware/middleware');

router.post('/add', middleware, (req, res) => {
    const { industry, category,description } = req.body;
    // console.log(req.body)

    const sql = `INSERT INTO template(industry, category,description) VALUES (?, ?,?)`;
    connection.query(sql, [industry, category,description], (err, result) => {
        if (err) {
            console.error('Error saving flow:', err);
            return res.status(500).json({ message: 'Database error' });
        }
        res.status(200).json({ success: 'successfully', flowId: result.insertId });
    });
});

router.get('/get_all_template', middleware, async (req, res) => {
    try {
        const {admin_id}=req.params
        const data = await executeQuery(`select * from  template where status=0 and admin_id=${admin_id} order by id desc`)
        return res.json({ data })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error!" })
    }
})

router.post('/create', (req, res) => {
    const { node, edges, template_id } = req.body;

   const sql = `UPDATE template SET node = ?, edges = ? WHERE id = ?`;

    connection.query(sql, [JSON.stringify(node), JSON.stringify(edges), template_id], (err, result) => {
        if (err) {
            console.error('Error saving flow:', err);
            return res.status(500).json({ message: 'Database error' });
        }
        res.status(200).json({ success: 'successfully'});
    });
});

router.get('/getbyid', async (req, res) => {
    try{
    const { id } = req.query;
    const data=await executeQuery(`SELECT * FROM template where id=${id}`) 
        res.json({data: data[0]});
    }catch(error){
        console.log(error)
        return res.status(500).json({error:"Internal Server Error"}) 
    }
});


router.post("/update", (req, res) => {
  const { id, node, edges, } = req.body;

  const query = `
    UPDATE template
    SET node = ?, edges = ?
    WHERE id = ?
  `;

  connection.query(query, [node, edges, id], (err, result) => {
    if (err) {
      console.error("MySQL Error:", err);
      return res.status(500).json({ error: "Failed to update template" });
    }

    res.status(200).json({ success: "Template updated successfully", result });
  });
});


module.exports=router;