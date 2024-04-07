const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./db.js');
const urlsPP = require('./models/urlsPP.js');

const app = express();
const PORT = process.env.PORT || 5001; // Changed port to 5001

connectDB();

const Url = mongoose.model('Url', urlsPP);


app.use(bodyParser.json());
app.use(cors());

// Test endpoint
app.get('/', (req, res) => {
    res.send("Your server is running!");
});







/****************POST****************** */
// this end point is for the chrome instance
app.post('/ce', async (req, res) => {
    try {
        // Extract data from the request body
        const { user,url, pp } = req.body;

        // Create a new document using the Url model
        const newUrl = new Url({ user, url, pp});

        // Save the new document to the database
        await newUrl.save();

        // Send a success response
        res.status(200).send('Policy has been evaluated and saved to the database.');

        // Log the success
        console.log("Successful server user, url, pp", user, url, pp);
    } catch (error) {
        console.error('Error during authentication:', error);
        res.status(500).send('Error saving url and pp to the database.');
    }
});

// model logic for calling the model 
// after the string is returned from model. IT MUST ADD TO CORRECT 
// USER URL PREDICTION INSTANCE


//gets for website to use
app.get('/getUserData', async (req, res) => {
    try {
        
        const { user } = req.query;

        if (!user) {
            return res.status(400).send('User parameter is required.');
        }
        const userData = await Url.find({ user: user });

        if (!userData || userData.length === 0) {
            return res.status(404).send('No data found for this user.');
        }
        const responseData = userData.map(entry => ({
            url: entry.url
            //predictions: entry.predictions
        }));

        // Send the response containing URL and predictions for the user
        res.send(responseData);
    } catch (error) {
        console.error('Error retrieving user data:', error);
        res.status(500).send('Internal Server Error');
    }
});

// for every unique url return predictions, for showing histogram 
app.get('/getAllUserData', async (req, res) => {
    try {
        const uniqueUrls = await Url.distinct('url');
        const predictionsData = [];
        for (const url of uniqueUrls) {
            const predictions = await Url.find({ url }, 'predictions');
            if (predictions.length > 0) {
                predictionsData.push({ url, predictions });
            }
        }

        // Send the predictionsData array as the response
        res.send(predictionsData);
    } catch (error) {
        console.error('Error retrieving user data:', error);
        res.status(500).send('Internal Server Error');
    }
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
