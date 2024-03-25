const express = require('express');
const router = express.Router();
const db = require('../config/dbconfig');

router.get('/', (req, res) => {
    let sql = "SELECT * FROM boats";
    db.query(sql, (err, data) => {
        if(err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json({ data });
    });
});

module.exports = router;
