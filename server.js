// server.js

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const {v4: uuidv4} = require("uuid");

// Initialize express
const app = express();

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB (replace <dbname>, <username>, <password> with your MongoDB details)
mongoose.connect("mongodb+srv://georginapudo:QzqUE16ptOXNBkPd@feastfusion.4ykfe.mongodb.net/FEASTFUSION?retryWrites=true&w=majority&appName=FEASTFUSION", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Create a Mongoose schema for form data
const orderSchema = new mongoose.Schema({
  order_id: {type:String},
  table_number: {type:Number},
  quantity: {type:Number},
  special_instructions: {type:String}
});

// Create a model based on the schema
const Order = mongoose.model("Order", orderSchema);

// Route to handle form submission
app.post("/submit-order", async (req, res) => {
  try{
    const orderID= uuidv4();

    // Create a new order object from the form data
    const newOrder = new Order({
      order_id: orderID,
      table_number: req.body["table-number"],
      quantity: req.body["dine-in-quantity"],
      special_instructions: req.body["dine-in-instructions"],
    });
    console.log("Saving the order:", {newOrder});
    // Save the order to the database
    await newOrder.save();
    res.status(201).send("Order saved successfully")

  }
  catch(err){
    console.error(err);
    res.status(500).send("Error saving the order")
  }}) 

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
