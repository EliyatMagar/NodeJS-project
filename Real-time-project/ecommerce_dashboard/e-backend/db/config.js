const mongoose=require('mongoose');

const dbConnect=async()=>{
    try {
        await mongoose.connect('mongodb://localhost:27017/e-commerce');

        console.log('Mongodb is connected succesfully');
    } catch (error) {
        console.error('Database connection error:',error);
        process.exit(1);
    }
};

module.exports=dbConnect;