
const chatbotRouter=express.Router();

chatbotRouter.post("/chat-body", (req, res) => {
    const { message, sender, title_id } = req.body;

    query = 'INSERT INTO all_chat (title_id,message,sender) VALUES (?,?,?)'
    values = [title_id, message, sender]

    database.query(query, values, (err, result) => {
        if (err) {
            console.error("Error inserting chat:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(201).json({ message: "Chat created successfully", chat_id: result.insertId });
    });
});

chatbotRouter.post("/newChat/:userid", async (req, res) => {

    const { allchats } = req.body;
    const { userid } = req.params;

    // console.log(userid,"userid");


    const message = (allchats?.userMessage?.data.split(" ").slice(0, 4).join(" "));

    query = 'INSERT INTO chat_titles (message,userid) VALUES (?,?)'
    values = [message, userid]

    database.query(query, values, (err, result) => {
        if (err) {
            console.error("Error inserting chat:", err);
            return res.status(500).json({ error: "Database error" });
        }

        const title_id = result.insertId;

        const query2 = 'INSERT INTO all_chat (message, sender, title_id) VALUES (?, ?, ?), (?, ?, ?)';
        const values2 = [
            allchats?.userMessage?.data, allchats?.userMessage?.sender, title_id,
            allchats?.resposne?.data, allchats?.resposne?.sender, title_id
        ];

        database.query(query2, values2, (err, result) => {
            if (err) {
                console.error("Error inserting chat messages:", err);
                return res.status(500).json({ error: "Database error" });
            }

            res.status(201).json({ message: "Chat created successfully", chat_id: title_id });
        });


    });

});

chatbotRouter.delete("/deleteChat", (req, res) => {

    const { id } = req.body;

    const sql = "DELETE FROM all_chat WHERE title_id=?";
    const value = [id];

    database.query(sql, value, (err, result) => {
        if (err) {
            console.error("Error deleting chat:", err);
            return res.status(500).json({ error: "Database error" });
        }
    })

    const sql2 = "DELETE FROM chat_titles WHERE id=?";
    const value2 = [id];

    database.query(sql2, value2, (err, result) => {
        if (err) {
            console.error("Error deleting chat:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(201).json({ message: "Chat deleted successfully" });
    })
})

chatbotRouter.get("/getsidebardata/:userid", (req, res) => {
    const { userid } = req.params;
    const sql = 'select * from chat_titles where userid=?'
    value = [userid];
    database.query(sql, value, (err, results) => {
        if (err) {
            console.error("Error fetching sidebar data:", err);
            return res.status(500).json({ error: "Database query failed" });
        }
        res.json(results);
    });

})

chatbotRouter.get("/getsidebardata/:userid/:id", (req, res) => {
    const { id } = req.params;
    const { userid } = req.params;

    const sql = 'select * from chat_titles where userid=?'
    const value = [userid];
    database.query(sql, value, (err, results) => {
        if (err) {
            console.error("Error fetching sidebar data:", err);
            return res.status(500).json({ error: "Database query failed" });
        }
    });


    const sql1 = 'select * from all_chat where title_id=?'
    value1 = id;
    database.query(sql1, value1, (err, results) => {
        if (err) {
            console.error("Error fetching sidebar data:", err);
            return res.status(500).json({ error: "Database query failed" });
        }
        res.json(results);
    });

})

module.exports=chatbotRouter;