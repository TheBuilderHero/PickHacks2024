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
app.get('/gatherUserReport:username', async(req,res)=> {
    // website needs to send user/email to this end point so we know which
    // url and prediction to show.
    try {
        const username = req.params.username;
        if(!user){
            return res.status(404).send('The user does not exist.')

        }
        //This finds the most recent url report
        const lastUrlEntry = await Url.findOne({ userEmail: user.email }).sort({ _id: -1 });

        if (!lastUrlEntry){
            return res.status(404).send('No URL found for this user');
        }

        const response = {
            user,
            url: lastUrlEntry.url,
            prediction: lastUrlEntry.predictions
        }
        res.send(response);

    } catch(error) {
        console.error("You are sending the information incorrectly. Cannot retrieve user and info ", error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
