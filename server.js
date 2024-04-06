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

//retrieve all data instances
app.get('/allUrlInstances', (req,res)=> {
   // sort of pseudocode for how this may work
   const urls = [
    'http://example.com/page1',
    'http://example.com/page2',
    'http://example.com/page3'
    // Add more URLs as needed
];

// Pseudo server call using a for loop
for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    // Assuming you're using some library like axios or fetch for HTTP requests
    // This is a pseudo implementation
    axios.get(url)
        .then(response => {
            // Handle the response
            console.log(`Response from ${url}:`, response.data);
        })
        .catch(error => {
            // Handle errors
            console.error(`Error fetching ${url}:`, error);
        });
}
    
})

//to keep track of the most recently added url
const urlTimestamps = [];
function addUrl(url) {
    urlTimestamps.push({ url, timestamp: Date.now() });
}
app.get('/mostRecentUrl', (req, res) => {
    // Check if there are any URLs
    if (urlTimestamps.length === 0) {
        return res.status(404).json({ error: "No URLs found" });
    }

    // Find the most recently added URL by sorting the array by timestamp
    const mostRecentUrl = urlTimestamps.reduce((prev, current) => {
        return (prev.timestamp > current.timestamp) ? prev : current;
    });

    // Send the most recently added URL as a response
    res.json({ url: mostRecentUrl.url });
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
   //model inference should possibly run here? This needs to be added to the server per user, per 
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
