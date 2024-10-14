// const mongoose = require('mongoose');

// // Define the Product schema
// const productSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     price: { type: Number, required: true },
//     category: String,
//     inStock: { type: Boolean, default: true }
// });

// // Create the Product model
// const Product = mongoose.model('Product', productSchema);

// // Function to create one or multiple products (for POST API)
// const createProduct = async (productData) => {
//     try {
//         // If productData is an array, use insertMany to handle multiple products
//         if (Array.isArray(productData)) {
//             const savedProducts = await Product.insertMany(productData);
//             return savedProducts;
//         }
//         // Otherwise, treat it as a single product
//         const newProduct = new Product(productData);
//         const savedProduct = await newProduct.save();
//         return savedProduct;
//     } catch (error) {
//         throw new Error(error.message);
//     }
// };

// module.exports = { createProduct };


const mongoose = require('mongoose');
const productSchema= mongoose.Schema({
    name:String,
    price:Number,
    brand:String,
    category:String
});

module.exports= mongoose.model("products",productSchema);
