DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

create table products (
	item_id INTEGER(100) NOT NULL AUTO_INCREMENT,
    product_name VARCHAR (100) NULL,
    department_name VARCHAR (100) NULL,
    price DECIMAL (10,2) NULL,
    stock_quantity INTEGER (10) NULL,
    primary key (item_id)
);

USE bamazon_DB;
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
("PlayStation", "Electronics", 300, 50),
("Cat Food", "Pet Supplies", 15, 10),
("Skis", "Sports", 1000, 3),
("Bluetooth Speaker", "Electronics", 20, 30),
("Guitar", "Musical Instruments", 300, 5),
("Kitchenaid Mixer", "Kitchen", 150, 10),
("Blanket", "Household", 20, 25),
("Hat", "Clothing", 15, 15),
("Windshield Wipers", "Automotive", 30, 5),
("Candle", "Household", 5, 20),
("Alarm Clock", "Household", 25, 10);

USE bamazon_DB;
SELECT * FROM products