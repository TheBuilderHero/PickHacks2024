
const OpenAI = require('openai');
const express = require('express');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require("openai");
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./db.js');
const urlsPP = require('./models/urlsPP.js');



const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
});

connectDB();

const Url = mongoose.model('Url', urlsPP);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

// Test endpoint
app.get('/', (req, res) => {
    res.send("Your server is running!");
});

/****************POST******************/
// This endpoint is for the chrome extension instance
// this end point is for the chrome instance
app.post('/ce', async (req, res) => {
    try {
        // Extract data from the request body
        const { user, url, pp } = req.body;

        // Model code
        const message_out = "Write a BRIEF report that looks at First Party Collection/Use, Third Party Sharing/Collection, User Choice/Control, User Access/ Edit and Deletion, Data Retention, Data Security, Policy Change, Do Not Track, International and Specific Audiences, or Other. Given the privacy policy in the following info: " + pp;

        //console.log(pp);
        const chatCompletion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{"role": "user", "content": message_out}],
          });
          console.log(chatCompletion.choices[0].message.content);
          predictions = chatCompletion.choices[0].message.content;

          const newUrl = new Url({ user, url, pp, predictions });



          await newUrl.save();

          

          // Log the success
          console.log("Successful server user, url, pp, prediction", user, url, pp, predictions);
          res.status(200).send("Success");
       
    } catch (error) {
        console.error('Error during authentication:', error);
        res.status(500).send('Error saving url and pp to the database.');
    }
});

// Gets for website to use
app.get('/getUserData', async (req, res) => {
    try {
        const latestData = await Url.findOne().sort({ _id: -1 });

        if (!latestData) {
            return res.status(404).send('No data found.');
        }

        const responseData = {
            url: latestData.url,
            predictions: latestData.predictions
        };

        // Send the response containing the most recent URL and predictions
        res.send(responseData);
    } catch (error) {
        console.error('Error retrieving user data:', error);
        res.status(500).send('Internal Server Error');
    }
});


// For every unique URL return predictions, for showing histogram
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
