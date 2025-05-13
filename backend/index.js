require("dotenv").config();
const express = require("express");
const cors = require("cors");
require('dotenv').config()
const path = require("path");


const app = express();

// const allowedOrigins = [process.env.FRONTEND_URL];

// app.use(cors({
//     origin: function (origin, callback) {
//         if (!origin || allowedOrigins.includes(origin)) {
//             callback(null, true);
//         } else {
//             callback(new Error("CORS Not Allowed"));
//         }
//     },
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true
// }));
app.use(cors());

app.use("/documents", express.static(path.join(__dirname, "documents/")));
app.use("/products", express.static(path.join(__dirname, "products/")));
app.use("/sectors", express.static(path.join(__dirname, "sectors/")));
app.use("/profile", express.static(path.join(__dirname, "profile/")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/admin', require("./routes/admin/admin"))
app.use('/support', require("./routes/admin/support"))
app.use('/documents', require("./routes/admin/documents"))
app.use('/product_service', require("./routes/admin/product_service"))
app.use('/campaign', require("./routes/admin/campaign"))
app.use('/sector', require("./routes/admin/sector"))
app.use('/employee', require("./routes/admin/employee"))
app.use('/contact', require("./routes/admin/contact_list"))
app.use('/bots', require("./routes/admin/bots"))
app.use('/template', require("./routes/admin/template"))

app.use('/user', require("./routes/users/user"))
app.use('/chatbot', require("./routes/users/chatbot"))

const port = 2500;
app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})