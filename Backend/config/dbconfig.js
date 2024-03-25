const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'hasini',
    password: '_5E)ewN686tD3cdW',
    database: 'shrimp_export_system'
});

module.exports = db;