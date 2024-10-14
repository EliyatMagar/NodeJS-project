// const mongoose=require('mongoose');

// const connectDB=async()=>{
//     try {
//         await mongoose.connect("mongodb://localhost:27017/company",{
//             useNewUrlParser:true
//         });
//         console.log("MongoDB connected successfully....");
//     } catch (error) {
//         console.log("Database connection error:",error);
//         process.exit(1);  
//     }
// };

// module.exports=connectDB;



const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/company");