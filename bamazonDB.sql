DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES
("Google Pixelbook i7", "Electronics", 1330.95, 20),
("Sony XBR55X900F 55-Inch 4K", "Electronics", 299.99, 20),
("Omega Women's Diamond Bezel Watch", "Fashion", 7289.99, 10),
("Men's Italian Wool Cashmere Overcoat", "Fashion", 279.00, 30),
("Large Traditional Bonded Leather Reclining Sofa", "Home & Kitchen", 1100.00, 5),
("iRobot Roomba Vacuum Wi-Fi Connectivity", "Home & Kitchen", 469.99, 25),
("Responsive Robotic Dog", "Toys", 52.49, 40),
("LEGO Ideas Old Fishing Store", "Toys", 199.99, 50),
("Traditional Silver Concho Belt", "Handmade Products", 333.00, 20),
("Hyperbole and a Half Kindle eBook", "Books & Audible", 12.99, 75);

SELECT * FROM products;