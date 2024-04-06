const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const urlModels = new Schema({
    url: String,
    pp: String,
    predictions: String,
    userEmail: String,
}, { collection: 'privacy_data' });

module.exports = urlModels;