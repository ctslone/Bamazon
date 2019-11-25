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
  ])
    .then(function (responseID) {
      // if (response) {
      //   console.log(response)
      //   connection.end()
      // }
      var userItemID = responseID.userID
      inquirer.prompt([
        {
          type: "input",
          name: "howMany",
          message: "How many do you want to buy?",
        }
      ])
        .then(function (responseQuantity) {
          // if (response) {
          //   console.log(response)
          // }
          userQuantity = responseQuantity.howMany
          function checkStock() {
            connection.query("SELECT * FROM products", function (err, results) {
              //     if (err) throw err;
              //     console.log("inside")
              //     console.log(results)
              for (var i = 0; i < results.length; i++) {
                // console.log(results[3].item_id)
                // console.log(response.howMany)
                // console.log("This is the user item ID " + userItemID)
                console.log("The item ID is " + results[i].item_id + " and the quantity is " + results[i].stock_quantity)
                // if (results[i].item_id === userItemID) {
                //   console.log("Stock quantity is: " + results[i].stock_quanity)
                // }
                if (results[i].item_id == userItemID) {
                  console.log("we have that")
                }
              }
              connection.end()
            })
          }
          checkStock()
        })
    })
}


