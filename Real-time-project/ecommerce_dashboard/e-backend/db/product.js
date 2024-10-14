const mongoose=require('mongoose');


const ProductSchema=new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true }, // Change to Number
    category: { type: String, required: true },
    userId: { type: String, required: true }, // Consider using ObjectId if referencing User
    company: { type: String, required: true }
});

module.exports=mongoose.model('products',ProductSchema);