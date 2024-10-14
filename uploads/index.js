// const express=require('express');
// const multer=require('multer');
// const app=express();

// const upload=multer({
//     Storage:multer.diskStorage({
//       destination:function(req,file,cb){
//         cb(null,"uploads");
//       },
//       filename:function(req,file,cb){
//         cb(null,file.fieldname+"-"+Date.now()+".png");
//       }
//     })
// }).single("user_file");


// app.post('/upload',upload,(req,res)=>{
//     res.send("file upload");
// });

// app.listen(5000);



const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Configure multer storage
const upload = multer({
    storage: multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, uploadsDir); // Set the destination to the uploads directory
        },
        filename: function(req, file, cb) {
            cb(null, file.fieldname + "-" + Date.now() + ".png"); // Rename the file
        }
    })
}).single('user_file'); // Expect a single file with the field name 'user_file'

// Define the upload route
app.post('/upload', upload, (req, res) => {
    if (!req.file) {
        return res.status(400).send("No file uploaded.");
    }
    res.send("File uploaded successfully: " + req.file.filename);
});

// Start the server
app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});
