const express = require('express');
const bodyParser = require('body-parser'); // Require body-parser
const cors = require('cors'); // Require cors

const app = express();
const PORT = process.env.PORT || 5000;


// Use body-parser middleware to parse JSON bodies
app.use(bodyParser.json());

// Use CORS middleware
app.use(cors());

// Test the backend server
app.get('/', (req, res) => {
    res.send("Your shit has motion!");
});










//****************POST ENDPOINTS FOR AUTH AND PULLING DATA*********************** */

// Endpoint for authentication POST
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
  
  // Endpoint for Privacy Policy POST
  app.post('/privacyPolicy', (req, res) => {
    try {
      const { url, pp } = req.body;
  
      // Here you can handle the url and pp parameters as per your application logic
      // For this example, let's just log them
      console.log('Received URL:', url);
      console.log('Received Privacy Policy:', pp);
  
      // Send a response
      res.status(200).send('Privacy Policy received successfully.');
    } catch (error) {
      // Handle errors gracefully
      console.error('Error processing privacy policy:', error);
      res.status(500).send('Error processing privacy policy');
    }
  });
  
   //this should post predictions to the database under the user instances
   //model inference should possibly run here?
   app.post('/predictions',(req,res)=>{
    try{
        //we need to assign
        const {modelPredictions} = req.body
        console.log("Predictions successful")
        console.log(model.modelPredictions);
    }catch(error){
        console.error("error reviewing the policy")
        res.status(500).send("Predictions could not be published to database")
    }
  })

 

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
