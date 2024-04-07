const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const urlModels = new Schema({
    user: String,
    url: String,
    pp: String,
    predictions: String,
}, { database: 'privacyPeekaboo',collection: 'pp' });

module.exports = urlModels;