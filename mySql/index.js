// const mysql=require('mysql2');

// //create a connection to the database

// const connection=mysql.createConnection({
//     host:'localhost',
//     user:'root',
//     password:"",
//     database:"product"
// });

// //connect to the database

// connection.connect((err)=>{
//     if(err){
//         console.error("Error connecting to the database:",err.stack);
//         return;
//     }
//     else{
//         console.log("connected to the mysql database as ID:"+connection.threadId);

//     }

// });

// connection.query('SELECT * FROM products',(err,results)=>{
//     if(err){
//         console.error('Error executing query:',err.stack);
//         return;
//     }
//     else{
//         console.log('Query results:',results);
//     }
//     connection.end();
// })

// Import required packages
const express = require("express");
const mysql = require("mysql2");

// Create an instance of the express application
const app = express();

app.use(express.json());
// Create a MySQL connection
const connection = mysql.createConnection({
  host: "localhost", // Use localhost for local connection
  user: "root", // Replace with your MySQL username
  password: "", // Replace with your MySQL password
  database: "product", // Replace with your database name
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.stack);
    return;
  }
  console.log("Connected to the MySQL database as ID " + connection.threadId);
});

// Define a GET API endpoint
// app.get('/products', (req, res) => {
//   // Query to select all users from the database
//   connection.query('SELECT * FROM products', (err, results) => {
//     if (err) {
//       console.error('Error executing query:', err.stack);
//       return res.status(500).json({ error: 'Database query failed' });
//     }
//     // Return the results as JSON
//     res.json(results);
//   });
// });

// Define a POST API endpoint to insert data into the `products` table
app.post('/products', (req, res) => {
    const { name, category, description } = req.body;  // Extract data from request body
  
    // Ensure all required fields are provided
    if (!name || !category || !description) {
      return res.status(400).json({ error: 'Please provide name, category, and description' });
    }
  
    // Insert data into the products table using a simple callback-based query
    connection.query(
      'INSERT INTO products (name, category, description) VALUES (?, ?, ?)',
      [name, category, description],
      (err, result) => {
        if (err) {
          console.error('Error executing query:', err.stack);
          return res.status(500).json({ error: 'Database insertion failed' });
        }
  
        // Send a success response back to the client with the inserted product ID
        res.status(201).json({
          message: 'Product successfully added',
          productId: result.insertId,  // Send back the ID of the inserted row
        });
      }
    );
  });


  //update products 

//   app.put('/products/:id', async (req, res) => {
//     const { id } = req.params;            // Extracting the product ID from the URL
//     const { name, category, description } = req.body;  // Extracting data from the request body
  
//     // Ensure all required fields are provided
//     if (!name || !category || !description) {
//       return res.status(400).json({ error: 'Please provide name, category, and description' });
//     }
  
//     try {
//       // SQL query to update a specific product by ID
//       const [result] = await pool.query(
//         'UPDATE products SET name = ?, category = ?, description = ? WHERE id = ?',
//         [name, category, description, id]
//       );
  
//       // If no rows were affected, it means the product with the given ID does not exist
//       if (result.affectedRows === 0) {
//         return res.status(404).json({ error: 'Product not found' });
//       }
  
//       // Send a response back to the client
//       res.status(200).json({
//         message: 'Product successfully updated',
//       });
//     } catch (error) {
//       console.error('Error executing query:', error);
//       return res.status(500).json({ error: 'Database update failed' });
//     }
//   });


//delete products 

// Define a DELETE API endpoint to remove a product from the `products` table
app.delete('/products/:id', async (req, res) => {
    const { id } = req.params; // Extract the product ID from the URL
  
    try {
      // SQL query to delete a specific product by ID
      const [result] = await pool.query('DELETE FROM products WHERE id = ?', [id]);
  
      // If no rows were affected, it means the product with the given ID does not exist
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      // Send a response back to the client
      res.status(200).json({
        message: 'Product successfully deleted',
      });
    } catch (error) {
      console.error('Error executing query:', error);
      return res.status(500).json({ error: 'Database deletion failed' });
    }
  });

app.listen(5000);
