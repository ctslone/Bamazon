var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("console.table")

// create the connection for DB
var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "Uncbootcamp1!",
    database: "bamazon_DB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    prompt();
});
// asking which task the manager would like to do
function prompt() {
    inquirer.prompt([
        {
            type: "checkbox",
            name: "managerAction",
            message: "Welcome! What would you like to do?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"],
        },
    ])
    // switch that determines what each response does
        .then(function (chosenAction) {
            var action = chosenAction.managerAction.toString();
            switch (action) {
                case 'View Products for Sale':
                    showAll();

                    break;
                case 'View Low Inventory':
                    lowInventory();

                    break;
                case 'Add to Inventory':
                    addInventory();

                    break;
                case 'Add New Product':
                    addProduct();

                    break;
                case 'Exit':
                    connection.end()
                    break;
            }
            
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
// loop through all the inventory and check to see which item ids have stock_quantity of less than 5 units
function lowInventory() {
    connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function (err, results) {
        if (err) throw err;
        // default of no low products
        var lowItems =  false;
        // if there is a low product, show it and change lowitems to true
        for (var i = 0; i < results.length; i++) {
            if (results[i].stock_quantity < 5) {
                console.table(results[i])
                lowItems = true;
            }
        }
        // if lowitems is still false, show this message
        if (!lowItems) {
            console.log("----------" + "\nAll inventory has 5 units or more in stock!" + "\n----------")
        }
        prompt()
    })
}

// add to inventory
function addInventory() {
    // pulling desired products from the DB
    connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function (err, results) {
        if (err) throw err;
        // logging results as a table
        console.table(results);
        inquirer.prompt([
            {
                type: "input",
                name: "managerID",
                message: "Enter the ID of the item you would like to update."
            },
            {
                type: "input",
                name: "managerAmount",
                message: "How many would you like to add?"
            }
        ])
            // updating the DB
            .then(function (stockAction) {
                // defining variables to update the DB with
                var managerSelection = (stockAction.managerID);
                var managerQuantity = +(stockAction.managerAmount) + +(results[managerSelection - 1].stock_quantity);
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: managerQuantity
                            },
                            {
                                item_id: managerSelection
                            }
                        ],
                        // logging success message
                        function (err, res) {
                            if (err) throw err;
                            console.log("----------" + "\nInventory successfully updated!" + "\n----------");
                            prompt();
                        }
                    )
            })
    })
    
}
// adding a product to Bamazon
function addProduct() {
    inquirer.prompt([
        {
            type: "input",
            name: "newName",
            message: "Enter the product name."
        },
        {
            type: "input",
            name: "newDepartment",
            message: "Enter the department."
        },
        {
            type: "input",
            name: "newPrice",
            message: "Enter the price."
        },
        {
            type: "input",
            name: "newStock",
            message: "Enter the stock."
        },
    ])
        .then(function (newProduct) {
            // responses saved as variables
            var newProductName = newProduct.newName;
            var newProductDepartment = newProduct.newDepartment;
            var newProductPrice = newProduct.newPrice;
            var newProductStock = newProduct.newStock;
            // regex validation 
            var priceNum = /^[1-9]\d*$/.test(newProductPrice);
            var stockNum = /^[1-9]\d*$/.test(newProductStock);
            // checking the validation to see if the manager entered correct values
            if (priceNum && stockNum) {
                connection.query(
                    "INSERT INTO products SET ?",
                    {
                        product_name: newProductName,
                        department_name: newProductDepartment,
                        price: newProductPrice,
                        stock_quantity: newProductStock
                    },
                    function (err, res) {
                        if (err) throw err;
                        console.log("----------" + res.affectedRows + " product inserted!\n");
                        prompt();
                    }
                );
            }
            else {
                console.log("You must enter a valid number!")
                addProduct();
            }
        })
}

