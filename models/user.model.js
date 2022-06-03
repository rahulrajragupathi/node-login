const mongoose = require("mongoose");
const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: String,
    mobilenumber:Number,
    email: String,
    password: String,
    
  })
);
module.exports = User;