const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  readProducts();
  buyBamazon();
});

function readProducts() {
  console.log("\n   Bamazon Store: \n");
  connection.query("SELECT * FROM products", function(err, response) {
    if (err) throw err;
    console.table(response);
  });
}

function buyBamazon() {
  connection.query("SELECT * FROM products;", function(err, response) {
    if (err) throw err;
    inquirer.prompt([
      {
        type: "input",
        name: "productID",
        message: "The ID of the product you would like to buy?"
      }, {
        type: "input",
        name: "quantity",
        message: "How many units of the product you would like to buy?"
      }
    ]).then(function(user) {
      const id = user.productID;
      const quantity = user.quantity;
      // console.log(id);
      if (quantity <= response[id-1].stock_quantity) {
        console.log("\n * You want to buy: ");
        console.log(quantity + " of " + response[id-1].product_name + " (ID " + response[id-1].item_id + ") prices $" + response[id-1].price);
        const quantityLeft = response[id-1].stock_quantity - quantity;
        const total = quantity * response[id-1].price;
        console.log("** Total you have to pay: $" + total + "\n");
        // console.log("There are still " + quantityLeft + " " + response[id-1].product_name + " in Bamazon store");
        updateProduct(quantityLeft, id);
        readProducts();
        connection.end();
      } else {
        console.log("Insufficient quantity!");
        buyBamazon(response);
      }
    });

  });
}

function updateProduct(quantity, productID) {
  console.log("Updating products quantities: \n");
  var query = connection.query(
    "UPDATE products SET ? WHERE ?",
    [
      {
        stock_quantity: quantity
      },
      {
        item_id: productID
      }
    ],
    function(err, response) {
      if (err) throw err;
      console.log(response.affectedRows + " products updated!\n");
    }
  );
  // logs the actual query being run
  console.log(query.sql);
}





