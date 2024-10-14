const { MongoClient } = require('mongodb');

const url = "mongodb://localhost:27017/"; // MongoDB connection URL
const client = new MongoClient(url); // Pass the URL to MongoClient constructor

const dbName = "college"; // Database name
const collectionName = "student"; // Collection name

// Function to connect to the database and get the collection
const dbConnect = async () => {
    try {
        // Connect to MongoDB
        await client.connect();
        // console.log("Connected to database");

        // Get the database and collection
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        return collection; // Return the collection to be used elsewhere
    } catch (error) {
        console.error("Error connecting to the database:", error);
        throw error; // Propagate the error
    }
};

module.exports = dbConnect;
