var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("console.table")

// create the connection for DB
var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "Gibsonlp1!",
  database: "bamazon_DB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  showAll();
});

// listing all items in the DB
function showAll() {
  connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function (err, results) {
    if (err) throw err;
    console.table(results);
    // promptUser();
  })
}