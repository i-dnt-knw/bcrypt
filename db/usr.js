const mongoose = require('mongoose');

const usrSchema = new mongoose.Schema({
  name: String,
  email: String,
  pwd: String
});
const Usr = mongoose.model('Usr',usrSchema);
module.exports = Usr;