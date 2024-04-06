const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const urlModels = new Schema({
    url: String,
    pp: String,
    predictions: String,
    // sorta like a key 
    userEmail: String,
})
  
  //const userModel = model('urls', urlModels);
  
  module.exports = urlModels;