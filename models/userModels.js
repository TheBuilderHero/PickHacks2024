const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userModels = new Schema({
    userEmail: String,
    tokens: String,
    urlVisited: String,
    WebsiteVisited: String,
    //maybe some type of time 
})
  
  //const userModel = model('users', userModels);
  
  module.exports = userModels;