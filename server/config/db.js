const mysql = require('mysql2')

// connect MySQL
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: 'mama66160208',
    database: "MiniLibrary",
});
module.exports = connection;