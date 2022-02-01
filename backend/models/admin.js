const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');

const adminSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, required: true, unique: true },
  phone: String,
  password: String,
  role: String
});

adminSchema.plugin(uniqueValidator);

const admin = mongoose.model("Admin", adminSchema);

module.exports = admin;