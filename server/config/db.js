const mysql = require('mysql2')

// connect MySQL
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: 'jasonao4869',
    database: "MiniLibrary",
});
module.exports = connection;