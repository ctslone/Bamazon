# Bamazon

Bamazon is a command line interface (CLI) application that utilizes Node JS and MySQL to store virtual products that a user can purchase. Bamazon also has a manger function where the manager can view low inventory and add new stock as well as add completely new products for sale.

## Getting Started

Want to watch a demo?
Just follow this link: [Bamazon](https://youtu.be/gaRjaCDQ-Iw)

1. Clone the repo to your local machine and install all required npm packages by running 'npm install' in the command line.
    * MySQL
    * Inquirer
    * console.table
2. Choose the application file you would like to run
    * bamazonCustomer
    * bamazonManager
3. bamazonCustomer does the following:
    * Lists all items for sale along with their price, stock and department
    * User can purchase an item by entering the item ID and how many they want.
    * If there is enough stock, the order will process, the DB will update and a order total will be displayed.
    * If there is not enough stock to fulfill the order, the user is told there is not enough and to select less.
4. bamazonManager does the following:
    * Lists manager tasks for the user to pick from.
        * View Products for Sale: Displays all products for sale.
        * View Low Inventory: Shows all inventory having less than 5 units in stock.
        * Add to Inventory: Updates an existing item's inventory.
        * Add New Product: Adds a new product to be sold.
        * Exit

## Challenges

A few challenges that I faced and solved when creating this application were:
* Properly utilizing the CRUD (Create, Replace, Update, Delete) methods when communicating with the database.
* Looping through the database query resusts and checking for items with a stock_quantity of less than 5, then displaying those items to the user.
* Updating the database with the correct subtraction of stock (if purchase) and addition of stock if the manager (user) adds new stock of one item.
* Making sure the connection to the database was terminated only when desired by the user.

## Built With

* JavaScript
* Node JS
* MySQL 

## Authors

* Charlie Slone - [GitHub](https://github.com/ctslone) - [LinkedIn](https://www.linkedin.com/in/charlie-slone-704311a9/)