// Import required packages
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Create an Express app
const app = express();

// Load environment variables from .env file
dotenv.config();

// Set the port from environment variables or default to 7000
const PORT = process.env.PORT || 7000;

// Get the MongoDB connection URL from environment variables
const MONGOURL = process.env.MONGO_URL;

// Connect to MongoDB and start the server
mongoose.connect(MONGOURL).then(() => {
  console.log("Database connected successfully.");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

// Define the schema for the user data using Mongoose
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

// Create a Mongoose model called "UserModel" based on the userSchema
const UserModel = mongoose.model("users", userSchema);

// Set up a route in the Express application to handle GET requests to "/getUsers"
app.get("/getUsers", async (req, res) => {
  // Await fetching all user data from the database using the UserModel
  const userData = await UserModel.find();
  // Send the user data as a JSON response
  res.json(userData);
});
