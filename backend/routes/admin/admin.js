const express = require('express');
const router = express.Router();
const connection = require('../../database/db');
const executeQuery = require('../../utils/executeQuery');
const { addEmployeeSchema, updateEmployeeSchema, deleteEmployeeSchema } = require("../../validation/employee");
const { sendOtp } = require('../../utils/mail')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { middleware } = require('../../middleware/middleware');
const fs = require('fs');
const multer = require('multer')
const path = require('path')
const crypto = require('crypto')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../profile'));
    },
    filename: (req, file, cb) => {

        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 },
});


router.post("/add", middleware, async (req, res) => {
    try {
        const { name, email, mobile_no, date_of_birth, role } = req.body;

        const { error } = addEmployeeSchema.validate(req.body, { abortEarly: false });

        if (error) {
            return res.status(400).json({ error: error.details[0]?.message });
        }

        const [checkEmail] = await executeQuery(`select * from admin where email=?`, [email])
        if (checkEmail) {
            return res.status(400).json({ error: "Email already exist" })
        }

        const insertQuery = 'insert into admin (name, email, mobile_no, date_of_birth, role) values (?, ?, ?, ?, ? );'
        connection.execute(insertQuery, [name, email, mobile_no, date_of_birth ?? null, role], (err, data) => {
            if (err) {
                console.log(err);
                return res.status(400).json({ error: "Something went wrong" })
            }
            return res.json({ success: "admin Added", data })
        })
    } catch (error) {
        console.log("/add: ", error.message);
        return res.status(500).json({ error: "Internal Server Error." });
    }
});

router.post("/update", middleware, async (req, res) => {
    try {
        const { employee_id, ...rest } = req.body;
        const { error } = updateEmployeeSchema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({ error: error.details.map(err => err.message) });
        }

        const fields = Object.keys(rest);
        const values = Object.values(rest);

        if (fields.length === 0) {
            return res.status(400).json({ error: "No valid fields provided for update." });
        }

        const setClause = fields.map(field => `${field} = ?`).join(", ");
        values.push(employee_id);

        const query = `UPDATE admin SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;

        connection.execute(query, values, (err, data) => {
            if (err) {
                console.log(err);
                return res.status(400).json({ error: "Something went wrong" })
            }
            if (data.affectedRows === 0) {
                return res.status(404).json({ error: "Record not found" });
            }
            return res.json({ success: "admin updated", data })
        });
    } catch (error) {
        console.error("Error in /update :", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post("/delete", middleware, async (req, res) => {
    try {
        const { user_id } = req.body;

        const { error } = deleteEmployeeSchema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({ error: error.details.map(err => err.message) });
        }

        const query = `UPDATE admin SET status=1, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;

        connection.execute(query, [user_id], (err, data) => {
            if (err) {
                console.log(err);
                return res.status(400).json({ error: "Something went wrong" })
            }
            if (data.affectedRows === 0) {
                return res.status(404).json({ error: "Record not found" });
            }
            return res.json({ success: "admin deleted", data })
        });
    } catch (error) {
        console.error("Error in /update:", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get('/getEmployeeId', middleware, async (req, res) => {
    try {
        const { user_id } = req.query;
        const data = await executeQuery(`select * from admin where id=${user_id}`)
        return res.json({ data: data[0] })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Internal Server Error" })
    }
});

router.post("/update", middleware, upload.single('profile'), async (req, res) => {
    try {
        const { employee_id, ...rest } = req.body;

        const fields = Object.keys(rest);
        let values = Object.values(rest).map(val => val === undefined ? null : val);

        // If a profile picture is uploaded
        if (req.file) {
            fields.push('profile'); // <-- VERY IMPORTANT
            values.push(req.file.filename);
        }

        if (fields.length === 0) {
            return res.status(400).json({ error: "No valid fields provided for update." });
        }

        const setClause = fields.map(field => `${field} = ?`).join(", ");

        values.push(employee_id); // employee_id is added last, for WHERE id = ?

        const query = `UPDATE admin SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;

        connection.query(query, values, (err, data) => {
            if (err) {
                console.log('MYSQL ERROR:', err);
                return res.status(400).json({ error: "Something went wrong" });
            }
            console.log('MYSQL SUCCESS:', data);
            if (data.affectedRows === 0) {
                return res.status(404).json({ error: "Record not found" });
            }
            return res.json({ success: "admin updated", data });
        });
    } catch (error) {
        console.error("Error in /update:", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

let otpStore = {}
router.post("/login", async (req, res) => {
    try {
        // console.log(req.body);
        
        const { email, password } = req.body;

        const user = await executeQuery(`select * from admin where email=?`, [email]);
        // console.log(user);
        if (!user[0] || !password) {
            return res.status(400).json({ error: "Invalid Credentials" });
        }
        

        if (!user[0]?.password) {
            return res.status(400).json({ error: "Please set your password" });
        }

        const pwdCompare = await bcrypt.compare(password, user[0].password);
        // console.log(pwdCompare);
        

        if (!pwdCompare) {
            return res.status(400).json({ error: "Invalid Credentials" });
        }

        // ✅ BLOCK inactive users first
        if (user[0].is_active === 1) {
            return res.status(403).json({ error: "Your account is inactive. Please contact Super Admin." });
        }

        if (user[0].role === 'Admin') {
            const otp = crypto.randomInt(100000, 999999).toString();
            const expiry = Date.now() + 5 * 60 * 1000;
            otpStore[email] = { otp, expiry };

            await sendOtp(otp, email, user[0].name);

            return res.json({ step: "otp-verification", message: "OTP sent to email", email });
        }

        // ✅ Normal login for other roles
        const payload = {
            email: email,
            user_id: user[0].id,
            user_type: user[0].role
        };
        let auth_token = jwt.sign(payload, process.env.JWT_SECRET);
        await executeQuery(`update admin set last_login=NOW() where id=?`, [user[0].id]);

        return res.json({
            success: `Welcome Back, ${user[0].name}`,
            data: {
                name: user[0].name,
                email: user[0].email,
                role: user[0].role,
                id: user[0].id
            },
            auth_token
        });

    } catch (error) {
        console.log("/login: ", error.message);
        return res.status(500).json({ error: "Internal Server Error." });
    }
});


router.post('/verify-otp', async (req, res) => {

    const { email, otp } = req.body;

    // if (!email || !otp) {
    //     return res.status(400).json({ error: "Email and OTP are required" });
    //   }

    if (!otpStore[email]) return res.status(400).json({ error: "OTP  not requested" })

    const { otp: storedOtp, expiry } = otpStore[email];

    if (Date.now() > expiry) return res.status(400).json({ error: "OTP expired" })
    if (otp === storedOtp) {

        const rows = await executeQuery(`SELECT * FROM admin WHERE email = ?`,[email]);
        const user = rows[0];

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        delete otpStore[email]

        await executeQuery(`UPDATE admin SET last_login = NOW() WHERE id = ?`, [user.id]);

        const payload = { email, user_id: user.id, user_type: user.role };
        const token = jwt.sign(payload, process.env.JWT_SECRET);

        return res.json({
            success: `Welcome back, ${user.name}`,
            data: { name: user.name, email: user.email, role: user.role, id: user.id },
            auth_token: token
        });
        // res.status(200).json({ success: "OTP verified successfully" })
    } else {
        res.status(400).json({ error: "Invalid OTP" })
    }

})


router.post("/signUp", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        var salt = bcrypt.genSaltSync(10);
        const secPass = await bcrypt.hash(password, salt);
        // const { error } = addUserSchema.validate(req.body, { abortEarly: false });

        // if (error) {
        //     return res.status(400).json({ error: error.details[0]?.message });
        // }

        const [checkEmail] = await executeQuery(`select * from admin where email=?`, [email])
        if (checkEmail) {
            return res.status(400).json({ error: "Email already exist" })
        }


        const insertQuery = 'insert into admin (name, email,password, role) values (?, ?, ?, ?);'
        connection.execute(insertQuery, [name, email, secPass, 'Admin'], (err, data) => {
            if (err) {
                // console.log(err);
                return res.status(400).json({ error: "Something went wrong" })
            }
            return res.json({ success: "Registration successfully", data })
        })
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error." });
    }
});

// router.post("/changePassword", async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         const checkEmail = await executeQuery(`select * from admin where email=?`, [email]);

//         if (checkEmail[0]) {
//             console.log("its check email ");
            
//             const otp = crypto.randomInt(100000, 999999).toString();
//             const expiry = Date.now() + 5 * 60 * 1000;
//             otpStore[email] = { otp, expiry };

//             await sendOtp(otp, email, checkEmail[0].name);

//              return res.json({ step: "otp-verification", message: "OTP sent to email", email });
//         }


//         var salt = bcrypt.genSaltSync(10);
//         const secPass = await bcrypt.hash(password, salt);

//         connection.execute('update admin set password=? where email=?;', [secPass, email], (err, data) => {
//             if (err) {
//                 console.log(err);
//                 return res.status(400).json({ error: "Something went wrong" })
//             }
//             return res.json({ success: `Password changed`, data })
//         })

//     } catch (error) {
//         console.log("/changePassword: ", error.message);
//         return res.status(500).json({ error: "Internal Server Error." });
//     }
// });

router.post("/changePassword", async (req, res) => {
    try {
        const { email, password, otp, step } = req.body;

        const checkEmail = await executeQuery(`SELECT * FROM admin WHERE email=?`, [email]);

        if (!checkEmail[0]) {
            return res.status(404).json({ error: "Email not found" });
        }

        if (step === "request-otp") {
            const generatedOtp = crypto.randomInt(100000, 999999).toString();
            const expiry = Date.now() + 5 * 60 * 1000; // 5 minutes
            otpStore[email] = { otp: generatedOtp, expiry };

            await sendOtp(generatedOtp, email, checkEmail[0].name);
            return res.json({ step: "otp-verification", message: "OTP sent to email", email });
        }

        if (step === "verify-and-reset") {
            if (!otp || !otpStore[email]) {
                return res.status(400).json({ error: "OTP not found or expired" });
            }
            
            const { otp: storedOtp, expiry } = otpStore[email];
            if (Date.now() > expiry || otp !== storedOtp) {
                return res.status(400).json({ error: "Invalid or expired OTP" });
            }

            // Proceed to change password
            const salt = bcrypt.genSaltSync(10);
            const secPass = await bcrypt.hash(password, salt);

            connection.execute('UPDATE admin SET password=? WHERE email=?;', [secPass, email], (err, data) => {
                if (err) {
                    console.log(err);
                    return res.status(400).json({ error: "Something went wrong" });
                }

                // Clean up OTP
                delete otpStore[email];

                return res.status(200).json({ success: "Password changed", data });
            });
        } else {
            return res.status(400).json({ error: "Invalid step" });
        }

    } catch (error) {
        console.log("/changePassword: ", error.message);
        return res.status(500).json({ error: "Internal Server Error." });
    }
});

router.get("/getAllEmployee", middleware, async (req, res) => {
    try {
        connection.query(`select * from admin where status=0`, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(400).json({ error: "Something went wrong" })
            }
            return res.json({ success: "success", data: result })
        })
    } catch (error) {
        console.error("Error in /getAllEMployee:", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/getEmployeeById", middleware, async (req, res) => {
    try {
        const { employee_id } = req.query;

        connection.query(`select * from admin where status=0 and id=?;`, [employee_id], (err, result) => {
            if (err) {
                return res.status(500).json({ error: "Internal Server Error" });
            }
            return res.json({ success: "success", data: result[0] })
        })
    } catch (error) {
        console.error("Error in /getEmployeeById:", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get('/getAllDashboardData', middleware, async (req, res) => {
    try {
        connection.query(`SELECT 
                COUNT(*) AS total_employee,
                (SELECT COUNT(*) FROM admin WHERE is_active = 0) AS total_admin,
                (SELECT COUNT(*) FROM user WHERE status = 0) AS total_user,
                (SELECT COUNT(*) FROM support WHERE query_status = 'pending') AS pending_queries
            FROM employee
            WHERE status = 0;
            `,
             (err, result) => {
            if (err) {
                console.log(err);
                return res.status(400).json({ error: "Something went wrong" })
            }
            // console.log(result)
            return res.json({ success: "success", counts: result[0] })
        })
    } catch (error) {
        console.error("Error in /getAllQueriesById:", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
})

router.post("/getActiveStatus", middleware, async (req, res) => {
    try {
        const { user_id, is_active } = req.body;

        const query = `UPDATE admin SET is_active=${is_active}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;

        connection.execute(query, [user_id], (err, data) => {
            if (err) {
                console.log(err);
                return res.status(400).json({ error: "Something went wrong" })
            }
            if (data.affectedRows === 0) {
                return res.status(404).json({ error: "Record not found" });
            }
            return res.json({ success: "User is Active", data })
        });
    } catch (error) {
        console.error("Error in /getActiveStatus:", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get('/getAdminCount', middleware, async (req, res) => {
    try {
      const activeBot=await executeQuery(`SELECT COUNT(*) AS active_bots FROM bots WHERE created_at >= NOW() - INTERVAL 30 DAY`)
      const campaignSent= await executeQuery(`SELECT COUNT(*) AS sent_campaigan FROM campaign WHERE is_status='Sent'`)
      
            return res.json({ success: "success", activeBot: activeBot[0],campaignSent: campaignSent[0]})
        // })
    } catch (error) {
        console.error("Error in /getAllQueriesById:", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
})





module.exports = router;