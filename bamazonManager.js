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
    prompt();
});

function prompt () {
    inquirer.prompt([
        {
            type: "checkbox",
            name: "managerAction",
            message: "Welcome! What would you like to do?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
        },
      ])
        .then(function (chosenAction) {
            var action = chosenAction.managerAction.toString();
            switch (action) {
                case 'View Products for Sale':
                showAll() ;
            
                break;
                case 'View Low Inventory':
                lowInventory();
            
                break;
                case 'Add to Inventory':
                    
            
                break;
                case 'Add New Product':
            
                break;
            }
            connection.end()
        })
}

// listing all items in the DB
function showAll() {
    connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function (err, results) {
        if (err) throw err;
        console.table(results);
        prompt()
    })
}
// showing all low invetory less than 5 units
// need to loop through all the inventory and check to see which item ids have stock_quantity of less than 5 units
// need to then display only the items that match that criteria (how to only display select ones?) GOT IT
// how to display the results as a neater table that matches the DB table, not keys/values???
function lowInventory () {
    connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function (err, results) {
        if (err) throw err;
        // console.table(results);
        for (var i=0; i<results.length; i++) {
            if (results[i].stock_quantity < 5) {
                console.table(results[i])
            }
        }
    })
}

// add to inventory
function addInventory () {
    
}

