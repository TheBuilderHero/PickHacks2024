const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./db.js');
const userModel = require('./models/userModels.js');
const urlsPP = require('./models/urlsPP.js');

const app = express();
const PORT = process.env.PORT || 5001; // Changed port to 5001

connectDB();

//actually defining the schemas
const User = mongoose.model('User', userModel);
const Url = mongoose.model('Url', urlsPP);


app.use(bodyParser.json());
app.use(cors());

// Test endpoint
app.get('/', (req, res) => {
    res.send("Your server is running!");
});







/****************POST****************** */
// this end point is for the chrome instance
app.post('/pp', async (req, res) => {
    try {
        // Extract data from the request body
        const { url, pp, predictions, userEmail } = req.body;

        // Create a new document using the Url model
        const newUrl = new Url({ url, pp, predictions, userEmail });

        // Save the new document to the database
        await newUrl.save();

        // Send a success response
        res.status(200).send('Policy has been evaluated and saved to the database.');

        // Log the success
        console.log("Successful server url, pp", url, pp);
    } catch (error) {
        // Handle errors
        console.error('Error during authentication:', error);
        res.status(500).send('Error saving url and pp to the database.');
    }
});




// Authentication endpoint
app.post('/auth', (req, res) => {
    try {
        const { token } = req.body;
        // Google auth token verification logic here

        // Send a response
        res.status(200).send('Auth instance successful');
        console.log("Authenticated!");
    } catch (error) {
        // Handle errors gracefully
        console.error('Error during authentication:', error);
        res.status(500).send('Error during authentication');
    }
});

// Predictions endpoint
app.post('/predictions', (req, res) => {
    try {
        const { modelPredictions } = req.body;
        console.log("Predictions successful. modelPredictions: ", modelPredictions);

        // Assume some operation that might throw an error
        // For example:
        // const result = 1 / 0; // This will throw an error

        res.status(200).send('Predictions have been successfully sent to wherever.');
    } catch (error) {
        console.error("Error in processing predictions:", error); // Include the error message
        res.status(500).send("Predictions could not be published to the database.");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
