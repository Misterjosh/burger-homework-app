var mysql = require("mysql");
var connection;
require('dotenv').config();

//1)create connection object
if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "pw10Mysql",
    database: "burgers_db"
});
};

//2)connect
connection.connect(function(err){
    if(err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});

module.exports = connection;
