const express = require('express');
const router = express.Router();
const connection = require('../../database/db');
const executeQuery = require('../../utils/executeQuery');
const fs = require('fs');
const { middleware } = require('../../middleware/middleware');
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../sectors'));
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


router.post('/add', middleware, upload.single('icon'), async (req, res) => { 
    try {
        let { name, category, description, products } = req.body;
        if (typeof products === 'string') {
            try {
                products = JSON.parse(products);
            } catch (err) {
                return res.status(400).json({ error: "Invalid products format" });
            }
        }

        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ error: "products must be a non-empty array" });
        }

        if (!req.file) {
            return res.status(400).json({ error: 'Image file is required.' });
        }

        const file_name = req.file.filename;

        const sql = `INSERT INTO sector (name, category, description, icon) VALUES (?, ?, ?, ?)`;
        const values = [name, category, description, file_name];

        connection.query(sql, values, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(400).json({ error: "Something went wrong" });
            }

            const sector_id = result.insertId;

            const productSector = `INSERT INTO product_sector (sector_id, product_id) VALUES ?`;

            const productValues = products.map(p => [sector_id, p.product_id || p]);

            connection.query(productSector, [productValues], (assignErr) => {
                if (assignErr) {
                    console.error(assignErr);
                    return res.status(400).json({ error: "Error assigning products to sector" });
                }

                return res.send({ success: "Sector created" });
            });
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});




router.post('/update_batch', middleware,upload.single('icon'), async (req, res) => {
    const { name, category, description, products } = req.body;
    const updateQuoteQuery = `
        UPDATE secotr 
        SET name = ?, category = ?, description = ? 
        WHERE id = ?;
    `;

    try {
        connection.query(updateQuoteQuery, [name, category, description, sector_id], async (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: "Error updating batch" });
            }

            const assigneeObjects = products.map(id => ({
                product_id: id,
            }));
            if (assigneeObjects && assigneeObjects.length > 0) {
                const deleteQuery = `DELETE FROM batch_assignees WHERE batch_id = ?`;
                connection.query(deleteQuery, [batch_id], (err, result) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({ error: "Error deleting existing batch assignees" });
                    }
            
                    const insertQuery = `INSERT INTO batch_assignees (batch_id, assignee_id) VALUES ?`;
                    const values = assigneeObjects.map(assignee => [batch_id, assignee.assignee_id]);
            
                    connection.query(insertQuery, [values], (err, result) => {
                        if (err) {
                            console.log(err);
                            return res.status(500).json({ error: "Error inserting new batch assignees" });
                        }
                        res.json({ success: "Batch assignees updated successfully." });
                    });
                });
            } else {
                res.json({ success: "Batch updated, but no assignees were provided." });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error!" });
    }
});



router.post('/delete_product', middleware, (req, res) => {
    try {
        const { product_id } = req.body
        connection.query(`update product_service set status='1', updated_on=NOW() where id=?`, [product_id], (err, data) => {
            if (err) {
                console.log(err);
                res.status(400).json({ error: "Something went wrong!" })
            } else {
                res.json({ data, success: "Product Deleted!" })
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error!" })
    }
})

// GET BY PRODUCT

router.get('/product_by_id', middleware, async (req, res) => {
    try {
        const { product_id } = req.query
        const product = await executeQuery(`select  * from product_service where id=${product_id}`)
        return res.json({ product: product[0], })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error!" })
    }
})

// GET ALL PRODUCT
router.get('/get_all_product', middleware, async (req, res) => {
    try {
        //  (`select * from product`)
        const product = await executeQuery(`select * from  product_service where  status = 0 order by id desc;
    `)
        return res.json({ product, })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error!" })
    }
})




module.exports=router;