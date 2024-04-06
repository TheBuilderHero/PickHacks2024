const express = require('express');
const bodyParser = require('body-parser'); // Require body-parser
const cors = require('cors'); // Require cors
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./db.js')
//define the schemas in the server itself
const userModel = require('./models/userModels.js');
const urlsPP = require('./models/urlsPP.js');

//import in your mfn endpoints #good File management
const getEndpoints = require('./endpoints/getEndPoints.js');
const postEndpoints = require('./endpoints/postEndPoints.js');


const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

// Use body-parser middleware to parse JSON bodies
app.use(bodyParser.json());

// Use CORS middleware
app.use(cors());



//****************GET ENDPOINTS FOR AUTH AND PULLING DATA*********************** */




//****************POST ENDPOINTS FOR AUTH AND PULLING DATA*********************** */
// call the post end points
// Endpoint for authentication POST


 

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
