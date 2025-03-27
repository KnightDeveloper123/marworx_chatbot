require("dotenv").config();
const express = require("express");
const cors = require("cors");
require('dotenv').config()

const app = express();

const allowedOrigins = [process.env.FRONTEND_URL];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("CORS Not Allowed"));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use('/course_thumbnail', express.static('course_thumbnail/'));

//Authentication routes
app.use('/employee', require("./routes/admin/employee"))


const port = 5000;
app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})