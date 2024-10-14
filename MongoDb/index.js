// const { MongoClient } = require('mongodb'); // Corrected to MongoClient

// const url = "mongodb://localhost:27017/";
// const client = new MongoClient(url); // Corrected MongoClient

// // Database and collection
// const dbName = "college";
// const collectionName = "student";

// async function run(students) {
//     try {
//         // Connect to MongoDB
//         await client.connect();
//         console.log("Connected to MongoDB");

//         // Select the database and collection
//         const db = client.db(dbName);
//         const collection = db.collection(collectionName);

//         // Insert a new document
//         const insertResult = await collection.insertMany(students);

//         console.log("Inserted document ID:", insertResult.insertedId);
//     } catch (err) {
//         console.error(err);
//     } finally {
//         // Close the connection
//         await client.close();
//         console.log("Connection closed");
//     }
// }
// const students=[{
//     name:"Ram",age:34,address:"biratnagar"
// },
// {
//     name:"shyam",age:30,address:"pokhara"
// }
// ]
// // Run the function
// run(students).catch(console.dir);



// const { MongoClient } = require('mongodb'); // Import MongoClient

// const url = "mongodb://localhost:27017/"; // MongoDB connection URL
// const client = new MongoClient(url); // Create a new MongoClient instance

// // Database and collection
// const dbName = "college";
// const collectionName = "student";

// async function run() {
//     try {
//         // Connect to MongoDB
//         await client.connect();
//         console.log("Connected to MongoDB");

//         // Select the database and collection
//         const db = client.db(dbName);
//         const collection = db.collection(collectionName);

//         // Filter to find the student to update
//         const filter = { name: "Ram" };

//         // Update operation
//         const updateData = {
//             $set: { age: 31, address: "Berlin" } // Update fields
//         };

//         // Update a document in the collection
//         const updateResult = await collection.updateOne(filter, updateData);

//         // Log the result of the update
//         if (updateResult.matchedCount > 0) {
//             console.log("Document updated successfully.");
//         } else {
//             console.log("No document matched the filter.");
//         }

//         //to find the data in the collection
//         const findResult=await collection.find().toArray();


//         console.log(findResult);

//     } catch (err) {
//         console.error(err);
//     } finally {
//         // Close the connection
//         await client.close();
//         console.log("Connection closed");
//     }
// }

// // Run the function
// run().catch(console.error);




// Deleted the data from the mongodb

// const {MongoClient}=require('mongodb');

// const url="mongodb://localhost:27017/";

// const client=new MongoClient(url);

// const dbName="college";
// const collectionName="student";


// async function run(){

//     try{
//         await client.connect();
//         console.log("Connected to Mongodb");
    
//         const db=client.db(dbName);
//         const collection=db.collection(collectionName);
    
    
//         const filter={name:"Ram"};
    
//         const deletedDocument=await collection.deleteOne(filter);
    
//         if(deletedDocument.deleteCount>0){
//             console.log("Document deleted succesfully");
//         }
//         else{
//             console.log("No document match the filer");
//         }
    
    
//         const findResult=await collection.find().toArray();
    
//         console.log("all students result are:",findResult);
//     }
//     catch(err){
//         console.log(err);
//     }
//     finally{
//         await client.close();
//         console.log("connection closed");
//     }
// }
// run().catch(console.error);



const express = require('express');
const dbConnect = require('./mongodb'); // Import the dbConnect function

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

app.get('/', async (req, res) => {
    try {
        // Get the collection
        let data = await dbConnect();

        // Fetch the documents from the collection
        data = await data.find().toArray();

        console.log(data);

        // Send the data as JSON
        res.json(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
});

// POST API to insert data into the 'student' collection
app.post('/students', async (req, res) => {
    try {
        console.log(req.body); // Log the incoming request body

        // Get the collection
        let data = await dbConnect();

        // Insert the document into the collection
        let result = await data.insertMany(req.body); // Use insertOne for single document

        // Respond with the inserted document ID
        res.status(201).json({ insertedId: result.insertedId });
    } catch (error) {
        console.error("Error inserting data:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Start the server and listen on port 5000
app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});


