const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');

const doctorSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  disponibility: Array,
  email: {type: String, required: true, unique: true},
  phone: String,
  password: String,
  department: String,
  image: String,
  role: String
});

doctorSchema.plugin(uniqueValidator);

const doctor = mongoose.model("Doctor", doctorSchema);

module.exports = doctor;