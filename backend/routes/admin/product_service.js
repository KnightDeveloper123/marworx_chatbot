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
        cb(null, path.join(__dirname, '../../products'));
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

router.post('/add', middleware, upload.single('image'), async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!req.file) {
            return res.status(400).json({ error: 'Image file is required.' });
        }

        const file_name = req.file.filename;

        const query = 'INSERT INTO product_service (name, description, image) VALUES (?, ?, ?)';
        connection.query(query, [name, description, file_name], (err, data) => {
            if (err) {
                console.error(err);
                return res.status(400).json({ error: "Something went wrong" });
            }
            return res.status(200).json({
                success: 'File uploaded successfully.',
                data
            });
        });

    } catch (error) {
        console.error('/add Error:', error.message);
        return res.status(500).json({ error: 'Internal Server Error.' });
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