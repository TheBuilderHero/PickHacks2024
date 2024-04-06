const express = require('express');

const app = express();

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
// sort of pseudo code on how this may work
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

module.exports = app;