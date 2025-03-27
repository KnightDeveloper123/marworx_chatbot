const express = require('express');
const router = express.Router();
const connection = require('../../database/db');
const executeQuery = require('../../utils/executeQuery');
const { addEmployeeSchema, updateEmployeeSchema, deleteEmployeeSchema } = require("../../validation/employee");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { middleware } = require('../../middleware/middleware');

router.post("/addEmployee", middleware, async (req, res) => {
    try {
        const { name, email, mobile_no, role, date_of_birth } = req.body;

        const { error } = addEmployeeSchema.validate(req.body, { abortEarly: false });

        if (error) {
            return res.status(400).json({ error: error.details[0]?.message });
        }

        const [checkEmail] = await executeQuery(`select * from employee where email=?`, [email])
        if (checkEmail) {
            return res.status(400).json({ error: "Email already exist" })
        }

        const insertQuery = 'insert into employee (name, email, mobile_no, role, date_of_birth) values (?, ?, ?, ?, ?);'
        connection.execute(insertQuery, [name, email, mobile_no, role, date_of_birth ?? null], (err, data) => {
            if (err) {
                console.log(err);
                return res.status(400).json({ error: "Something went wrong" })
            }
            return res.json({ success: "Employee Added", data })
        })
    } catch (error) {
        console.log("/addEmployee: ", error.message);
        return res.status(500).json({ error: "Internal Server Error." });
    }
});

router.post("/updateEmployee", middleware, async (req, res) => {
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

        const query = `UPDATE employee SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;

        connection.execute(query, values, (err, data) => {
            if (err) {
                console.log(err);
                return res.status(400).json({ error: "Something went wrong" })
            }
            if (data.affectedRows === 0) {
                return res.status(404).json({ error: "Record not found" });
            }
            return res.json({ success: "User updated", data })
        });
    } catch (error) {
        console.error("Error in /updateEmployee :", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post("/deleteEmployee", middleware, async (req, res) => {
    try {
        const { user_id } = req.body;

        const { error } = deleteUserSchema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({ error: error.details.map(err => err.message) });
        }

        const query = `UPDATE admins SET status=1, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;

        connection.execute(query, [user_id], (err, data) => {
            if (err) {
                console.log(err);
                return res.status(400).json({ error: "Something went wrong" })
            }
            if (data.affectedRows === 0) {
                return res.status(404).json({ error: "Record not found" });
            }
            return res.json({ success: "User deleted", data })
        });
    } catch (error) {
        console.error("Error in /updateUser:", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const checkEmail = await executeQuery(`select * from employee where email=?`, [email]);

        if (!checkEmail[0]?.password) {
            return res.status(400).json({ error: "Please set your password" })
        }

        if (!checkEmail[0] || !password) {
            return res.status(400).json({ error: "Invalid Credentials" });
        }
        const pwdCompare = await bcrypt.compare(password, checkEmail[0].password);

        if (!pwdCompare) {
            return res.status(400).json({ error: "Invalid Credentials" })
        }

        if (pwdCompare) {
            const payload = {
                email: email,
                user_id: checkEmail[0].id,
                user_type: checkEmail[0].role
            };
            let auth_token = jwt.sign(payload, process.env.JWT_SECRET);
            await executeQuery(`update employee set last_login=NOW() where id=${checkEmail[0]?.id};`)
            return res.json({ success: `Welcome Back, ${checkEmail[0]?.name}`, data: { name: checkEmail[0]?.name, email: checkEmail[0]?.email, role: checkEmail[0].role, id: checkEmail[0].id }, auth_token })
        } else {
            return res.status(400).json({ error: "Invalid Credentials." });
        }
    } catch (error) {
        console.log("auth/admin/login: ", error.message);
        return res.status(500).json({ error: "Internal Server Error." });
    }
});

router.post("/changePassword", async (req, res) => {
    try {
        const { email, password } = req.body;

        const checkEmail = await executeQuery(`select * from employee where email=?`, [email]);

        if (!checkEmail[0]) {
            return res.status(400).json({ error: "Employee not fount" })
        }

        var salt = bcrypt.genSaltSync(10);
        const secPass = await bcrypt.hash(password, salt);

        connection.execute('update employee set password=? where email=?;', [secPass, email], (err, data) => {
            if (err) {
                console.log(err);
                return res.status(400).json({ error: "Something went wrong" })
            }
            return res.json({ success: `Password changed`, data })
        })

    } catch (error) {
        console.log("employee/changePassword: ", error.message);
        return res.status(500).json({ error: "Internal Server Error." });
    }
});

router.get("/getAllEmployee", middleware, async (req, res) => {
    try {
        connection.query(`select * from employee where status=0`, (err, result) => {
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

        connection.query(`select * from employee where status=0 and id=?;`, [employee_id], (err, result) => {
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

module.exports = router;