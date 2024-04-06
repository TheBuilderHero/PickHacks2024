const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const urlModels = new Schema({
    url: String,
    pp: String,
    predictions: String,
    userEmail: String,
    //maybe some type of time 
})
  
  //const userModel = model('urls', urlModels);
  
  module.exports = userModels;