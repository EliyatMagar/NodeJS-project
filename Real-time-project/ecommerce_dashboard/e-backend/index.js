// const express = require("express");
// const cors = require("cors");
// const dbConnect = require("./db/config");
// const User = require("./db/users");

// const app = express();

// dbConnect();

// app.use(express.json());
// app.use(cors());

// app.post("/register", async (req, res) => {
//   let user = new User(req.body);
//   let result = await user.save();
//   result=result.toObject();
//   delete result.password;
//   res.send(result);
// });

// app.post("/login", async (req, res) => {
//   console.log(req.body);

//   if (req.body.password && req.body.email) {
//     let user = await User.findOne(req.body).select("-password");

//     if (user) {
//       res.send(user);
//     } else {
//       res.send({ result: "No user Found .." });
//     }
//   }
// });

// app.listen(5000);




/// Import necessary modules
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken"); // Import JWT library
const dbConnect = require("./db/config"); // Database connection configuration
const User = require("./db/users"); // User model
const Product = require('./db/product'); // Product model

// Create an instance of an Express application
const app = express();

// Connect to the database
dbConnect();

// Middleware to parse JSON and enable CORS
app.use(express.json());
app.use(cors());

// JWT secret key
const JWT_SECRET = "your_jwt_secret_key"; // You should use a more secure key for production

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.header("auth-token"); // Check for token in headers
  if (!token) return res.status(401).send({ error: "Access Denied. No Token Provided" });

  try {
    const verified = jwt.verify(token, JWT_SECRET); // Verify the token
    req.user = verified; // Attach the verified user data to request
    next(); // Move to the next middleware or route
  } catch (err) {
    res.status(400).send({ error: "Invalid Token" });
  }
};

// Handle user registration
app.post("/register", async (req, res) => {
  try {
    // Create a new user instance with the request body data
    const user = new User(req.body);
    const result = await user.save(); // Save the user to the database
    const userObject = result.toObject();
    delete userObject.password; // Remove password from response

    // Generate JWT for the newly registered user
    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    
    // Send the user object and token as response
    res.status(201).send({ user: userObject, token });
  } catch (error) {
    res.status(500).send({ error: "Registration failed" });
  }
});

// Handle user login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email && password) {
      const user = await User.findOne({ email, password }).select("-password");

      if (user) {
        // Generate JWT for the logged-in user
        const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.send({ user, token }); // Send user data and token as response
      } else {
        res.status(404).send({ result: "No user found." });
      }
    } else {
      res.status(400).send({ result: "Email and password are required." });
    }
  } catch (error) {
    res.status(500).send({ error: "Login failed" });
  }
});

// Protected Route: Add a new product (requires JWT token)
app.post('/add-product', verifyToken, async (req, res) => {
  try {
    let product = new Product(req.body); // Creating a new product instance
    let result = await product.save(); // Saving the product to the database

    res.status(201).send(result); // Respond with the saved product
  } catch (error) {
    res.status(500).send({ error: "Failed to add product." });
  }
});

// Get all products (public)
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find(); // Fetching all products

    if (products.length > 0) {
      res.send(products); // Send products if found
    } else {
      res.status(404).send({ result: "No products found" });
    }
  } catch (error) {
    res.status(500).send({ error: "Failed to retrieve products." });
  }
});

// Protected Route: Delete a product (requires JWT token)
app.delete('/product/:id', verifyToken, async (req, res) => {
  try {
    let result = await Product.deleteOne({ _id: req.params.id });
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: "Failed to delete product." });
  }
});

// Protected Route: Update product details (requires JWT token)
app.put('/product/:id', verifyToken, async (req, res) => {
  try {
    let result = await Product.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: "Failed to update product." });
  }
});

// Search API for products (public)
app.get('/search/:key', async (req, res) => {
  try {
    let result = await Product.find({
      "$or": [
        { name: { $regex: req.params.key, $options: 'i' } },
        { category: { $regex: req.params.key, $options: 'i' } },
        { company: { $regex: req.params.key, $options: 'i' } }
      ]
    });

    if (result.length > 0) {
      res.send(result);
    } else {
      res.status(404).send({ message: "No products found" });
    }
  } catch (error) {
    res.status(500).send({ error: "An error occurred while fetching products" });
  }
});

// Start the server on port 5000
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
