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
                showAll() 
            
                break;
                case 'View Low Inventory':
                    
            
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

