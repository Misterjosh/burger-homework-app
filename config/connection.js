var mysql = require("mysql");

//1)create connection object
var connection = mysql.createConnection({
    host: "pqxt96p7ysz6rn1f.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    port: 3306,
    user: "v3f7xio2vshoxux5",
    password: "proii5vb21hwrb9b",
    database: "owfhlxqo28cb1k00"
})

//2)connect
connection.connect(function(err){
    if(err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});

module.exports = connection;
