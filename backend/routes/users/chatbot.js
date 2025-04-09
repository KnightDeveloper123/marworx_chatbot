const express = require('express');
const router = express.Router();
const { middleware } = require('../../middleware/middleware')
const connection = require('../../database/db');

router.post("/addChat", middleware, (req, res) => {
    const { message, sender, title_id } = req.body;
    const query = 'INSERT INTO chats (title_id,message,sender) VALUES (?,?,?)'
    const values = [title_id, message, sender]

    connection.query(query, values, (err, result) => {
        if (err) {
            console.error("Error inserting chat:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(201).json({ message: "Chat Added", chat_id: result.insertId });
    });
});

router.post("/newChat", middleware, async (req, res) => {

    const { chats, user_id } = req.body;

    const message = `New Chat ${new Date().toLocaleDateString("en-GB", { day: 'numeric', month: 'long', year: 'numeric' })}`;
    const query = 'INSERT INTO chat_titles (title, user_id) VALUES (?,?)'
    const values = [message, user_id]

    connection.query(query, values, (err, result) => {
        if (err) {
            console.error("Error inserting chat:", err);
            return res.status(500).json({ error: "Database error" });
        }
        const title_id = result.insertId;
        const query2 = 'INSERT INTO chats (message, sender, title_id) VALUES (?, ?, ?), (?, ?, ?)';
        console.log(chats);

        const values2 = [
            chats?.userMessage?.message, chats?.userMessage?.sender, title_id,
            chats?.response?.data, chats?.response?.sender, title_id
        ];

        connection.query(query2, values2, (err, data) => {
            if (err) {
                console.error("Error inserting chat messages:", err);
                return res.status(500).json({ error: "Database error" });
            }
            res.status(201).json({ message: "Chat created successfully", chat_id: title_id, data });
        });


    });

});

router.delete("/deleteChatTitle", middleware, (req, res) => {
    const { title_id } = req.body;

    const sql = "update chat_titles set status=1 WHERE id=?";
    const value = [title_id];

    connection.query(sql, value, (err, data) => {
        if (err) {
            console.error("Error deleting chat:", err);
            return res.status(500).json({ error: "Database error" });
        }
        return res.status(201).json({ message: "Chat Title deleted successfully", data });
    })
})

router.get("/getChatTitle", middleware, (req, res) => {
    const { user_id } = req.query;

    const query = 'select * from chat_titles where user_id=? and status=0'
    const value = [user_id];
    connection.query(query, value, (err, data) => {
        if (err) {
            console.error("Error fetching sidebar data:", err);
            return res.status(400).json({ error: "Database query failed" });
        }
        return res.json({ success: "success", data });
    });
})

router.get("/getAllChats", middleware, (req, res) => {
    const { title_id } = req.query;
    connection.query(`select * from chats where title_id=? `, [title_id], (err, data) => {
        if (err) {
            console.error("Error fetching sidebar data:", err);
            return res.status(500).json({ error: "Database query failed" });
        }
        res.json({ success: "success", data });
    });

})

module.exports = router;