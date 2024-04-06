const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./db.js');

const app = express();
const PORT = process.env.PORT || 5001; // Changed port to 5001

connectDB();

app.use(bodyParser.json());
app.use(cors());

// Test endpoint
app.get('/', (req, res) => {
    res.send("Your server is running!");
});







/****************POST****************** */
// this end point is for the chrome instance
app.post('/pp',(req,res)=>{
    try{
        const {url, pp} = req.body;
        res.status(200).send('Policy has been evaluated.')
        console.log("Sucessful server url, pp", url, pp);
    } catch(error){
        console.error('Error during authenication:', error);
        res.status(500).send("Error sending url and pp, or one of them.")
    }
})




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
