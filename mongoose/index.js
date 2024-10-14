// const mongoose = require('mongoose');

// const main = async () => {
//     try {
//         // Connect to the MongoDB database
//         await mongoose.connect('mongodb://localhost:27017/college', {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         });
//         console.log("Database connected successfully");

//         // Define the student schema
//         const StudentSchema = new mongoose.Schema({
//             name: { type: String, required: true },
//             age: { type: Number, required: true },
//             address: String
//         });

//         // Create the Student model
//         const StudentModel = mongoose.model('students', StudentSchema);

//         // Create a new student document
//         let data = new StudentModel({ name: "Aarati", age: 20, address: "Baneshwor" });

//         // Save the document
//         let result = await data.save();
//         console.log("Data saved successfully:", result);

//     } catch (error) {
//         console.error("Error occurred:", error);
//     }
// }

// // Call the function
// main().catch(console.error);

// // Yes, based on the code you've shared, Mongoose will automatically create a students collection in the college database if it doesn't already exist. Here's why:

// // Model Name to Collection Name Mapping: In Mongoose, the model function takes a singular name for the model (in your case, 'student'), and Mongoose automatically pluralizes this name to create the corresponding collection (in this case, students).

// // Automatic Collection Creation: If the collection (i.e., students) doesn't already exist in your MongoDB database (college), Mongoose will automatically create it the first time you add or query documents.

//CRUD OPERATION IN MONGOOSE

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/company", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDb connected succesfully...");
  } catch (err) {
    console.error("Somethig problem is occured", err);
  }
};

//Define schema

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  description: String,
});

//create product model

const ProductModel = mongoose.model("products", ProductSchema);

//Create operation (insert new product )

const createProduct = async () => {
  try {
    const newProduct = new ProductModel({
      name: "computer",
      price: 78.999,
      description: "A powerful device with advanced features",
    });
    const result = await newProduct.save();
    console.log("Product created", result);
  } catch (error) {
    console.error("Error created product", error);
  }
};

//Read operation

const getAllproducts = async () => {
  try {
    const products = await ProductModel.find();

    console.log("Product found:", products);
  } catch (error) {
    console.log("Error fetching products:", error);
  }
};

//update operation

const updateProduct = async (productName) => {
  try {
    const updatedProduct = await ProductModel.updateOne(
      { name: productName },
      { $set: { price: 40.99 } } // Example of updating price and stock status
    );

    if (updatedProduct.matchedCount > 0) {
      console.log(`Product ${productName} updated succesfully`);
    } else {
      console.log(`Product ${productName} not found`);
    }
  } catch (error) {
    console.error("Error updating product", error);
  }
};

//delete operation

const deleteProduct = async (productName) => {
  try {
    const deletedResult = await ProductModel.deleteOne({
      name: "smartphone",
    });
    if(deletedResult.deletedCount>0){
        console.log(`Product ${productName} deleted succesfully`)
    }
    else{
        console.log(`Product ${productName} not found`);
    }
  } catch (error) {
    console.log("Error deleting product:",error);
  }
};

const run = async () => {
  await connectDB();
  // await createProduct();

  // await updateProduct("smartphone");

  // await getAllproducts();

  deleteProduct("smartphone");
};

run();
