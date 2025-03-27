const express = require('express');
const router = express.Router();
const connection = require('../../database/db');

router.post("/loginuser", (req, res) => {
    const { emailid, password } = req.body;

    const sql = "SELECT * FROM users WHERE emailid=?";
    const value = [emailid];

    connection.query(sql, value, (err, result) => {

        const user = result[0];
        if (err) {
            console.error("Error adding user:", err);
            return res.status(500).json({ error: "Database error" });
        }
        if (result.length > 0) {
            if (bcrypt.compareSync(password, result[0].password)) {
                const { password: _, ...userData } = user;
                res.status(201).json({ message: "User logged in successfully", user: userData });
            } else {
                res.status(401).json({ message: "Invalid credentials" });
            }
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    })

});


router.post("/adduser", (req, res) => {
    const { username, emailid, password } = req.body;

    const hashPassword = bcrypt.hashSync(password, 10);

    const sql = "INSERT INTO users (username,emailid,password) VALUES (?,?,?)";
    const value = [username, emailid, hashPassword];

    connection.query(sql, value, (err, result) => {
        if (err) {
            console.error("Error adding user:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(201).json({ message: "User added successfully" });
    })

});

module.exports = router;