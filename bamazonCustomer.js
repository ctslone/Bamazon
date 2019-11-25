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
          userQuantity = responseQuantity.howMany
          
          function checkStock() {
            connection.query("SELECT * FROM products", function (err, results) {
              if (err) throw err;
              console.log("inside")
              var userItemIndex = (userItemID - 1)

              if (results[userItemIndex].stock_quantity >= userQuantity) {
                console.log("Thanks for your order!");
                

                updateStock = results[userItemIndex].stock_quantity -= userQuantity;

                console.log("The total cost of your order is $" + (updateStock * results[userItemIndex].price));

                connection.query(
                  "UPDATE products SET ? WHERE ?",
                  [
                    {
                      stock_quantity: updateStock
                    },
                    {
                      item_id: userItemID
                    }
                  ],
                  function (err, res) {
                    if (err) throw err;
                  })
                
              }
              else {
                console.log("There is not enough to fulfill your order! Please edit your order to be less.")
                promptUser()
              }
              // for (var i = 0; i < results.length; i++) {
              // console.log(results[3].item_id)
              // console.log(response.howMany)
              // console.log("This is the user item ID " + userItemID)
              // console.log("The item ID is " + results[i].item_id + " and the quantity is " + results[i].stock_quantity)
              // if (results[i].item_id === userItemID) {
              //   console.log("Stock quantity is: " + results[i].stock_quanity)
              // }

              // if (results[i].item_id == userItemID) {
              //   console.log("we have that")
              //   console.log(results[userItemIndex].stock_quantity)
              // }
              // }
              connection.end()
            })
          }
          checkStock()
        })
    })
}


