/*POSSIBLE ADDITIONS
Not allow negative numbers for any entry.
Not allow letters in any entry.
Add a confirmation before the order is placed.
*/


// dependencies
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
  connection.query("SELECT * FROM products", function (err, results) {
    if (err) throw err;
    console.table(results);
    promptUser();
  })
}

// function that contains all logic
function promptUser() {

  inquirer.prompt([
    {
      type: "input",
      name: "userID",
      message: "Enter the ID of the item you would like to buy.",
    },
  ])
    // asking user how many items they want
    .then(function (responseID) {
      // assigning the response to a shorter variable
      var userItemID = responseID.userID
      // testing for user input being positive numbers only
      var onlyNumbers = /^[1-9]\d*$/.test(userItemID)
      if (onlyNumbers) {
        inquirer.prompt([
          {
            type: "input",
            name: "howMany",
            message: "How many do you want to buy?",
          }
        ])
          .then(function (responseQuantity) {
            // assigning the response to a shorter variable
            userQuantity = responseQuantity.howMany
            var onlyNumbersQuant = /^[1-9]\d*$/.test(userQuantity)
            console.log(onlyNumbersQuant)
            // checks the stock of the item requested and determines if a sale can be made
            if (onlyNumbersQuant) {
              function checkStock() {
                connection.query("SELECT * FROM products", function (err, results) {
                  if (err) throw err;
                  // setting a variable to use in the for loop, based on the users item slection. The index is one less than the actual item number
                  var userItemIndex = (userItemID - 1)
                  // if statement for if there is enough stock to fulfill the order
                  if (results[userItemIndex].stock_quantity >= userQuantity) {
                    console.log("Thanks for your order!");
                    // creating an updated stock to place in the DB
                    var updateStock = results[userItemIndex].stock_quantity -= userQuantity;

                    console.log("The total cost of your order is $" + (updateStock * results[userItemIndex].price));
                    // updating the DB based on the order
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
                      }
                    )
                  }
                  else {
                    console.log("There is not enough to fulfill your order! Please edit your order to be less.")
                    promptUser()
                  }
                  // ending the connection after the purchase
                  connection.end()
                })
              }
              // invoke checkstock function
              checkStock()
            }
            // if user doesnt enter a positive number
            else {
              console.log("Please enter the ID as a positive number!")
              promptUser()
            }
          })
      }
      // if user doesnt enter positive number
      else {
        console.log("Please enter the ID as a positive number!")
        promptUser()
      }

    })
}


