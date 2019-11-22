var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection for DB
var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "Gibsonlp1!",
  database: "bamazon_DB"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
    // then, do stuff
});
