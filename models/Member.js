const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name: String,
  email: String,
  year: String,
  skill: String,
  time: Number
});

module.exports = mongoose.model('Member', memberSchema);
