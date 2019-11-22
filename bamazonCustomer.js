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
  // then, do stuff
  showAll();
  // promptUser();
  // connection.end()
});

function showAll() {
  connection.query("SELECT * FROM products", function (err, results) {
    if (err) throw err;
    console.table(results)
    promptUser()
    // connection.end()
  })
}

function promptUser() {
  inquirer.prompt([
    {
      type: "input",
      name: "userID",
      message: "Enter the ID of the item you would like to buy.",
    },
    {
      type: "input",
      name: "howMany",
      message: "How many do you want to buy?",
    }
  ])
    .then(function (response) {
      if (response) {
        console.log(response)
        connection.end()
      }
    })
}
