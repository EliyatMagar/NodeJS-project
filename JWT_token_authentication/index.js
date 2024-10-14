const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require('cors');

const authRoute = require('./routes/auth');
const protectedRoute = require('./routes/protected');

dotenv.config();

const app = express();
app.use(express.json());
// app.use(cors());

app.use(cors({
  origin: 'http://localhost:3000', // Adjust this based on where your frontend is running
  methods: ['GET', 'POST'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}));

// Routes
app.use('/api/auth', authRoute);
app.use('/api/protected', protectedRoute);

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  }
};

// Start the server
const startServer = async () => {
  await connectDB();

  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
