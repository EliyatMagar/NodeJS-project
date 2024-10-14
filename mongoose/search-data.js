// // index.js
// const express = require('express');
// const connectDB = require('./config'); // Import the database connection
// const Product = require('./product'); // Import the product functions

// const app = express();

// // Middleware to parse JSON
// app.use(express.json());

// // Connect to MongoDB
// connectDB();

// // POST route to create a new product
// // app.post('/products', async (req, res) => {
// //     try {
// //         const productData = req.body; // Get the product data from request body
// //         const newProduct = await createProduct(productData); // Create a new product
// //         console.log(newProduct);
// //         res.status(201).json(newProduct); // Send the newly created product as a response
// //     } catch (error) {
// //         res.status(500).json({ error: error.message });
// //     }
// // });


// //search api with multiple fields

// app.get('/search/:key',async(req,res)=>{
//     let data=await Product.find({
//         "$or":[
//             {name:{$regex:req.params.key}},
//             {category:{$regex:req.params.key}}
//         ]
//     })
//     res.send(data);
// })

// // Start the server
// app.listen(5000, () => {
//     console.log('Server running on http://localhost:5000');
// });



const express = require('express');
require("./config");
const Product = require('./product');
const app = express();

app.use(express.json());

app.get("/search/:key",async (req,resp)=>{
    let data = await Product.find(
        {
            "$or":[
                {name:{$regex:req.params.key}},
                {category:{$regex:req.params.key}}
            ]
        }
    )
    resp.send(data);

});





app.listen(5000)
