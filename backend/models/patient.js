const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');

const patientSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {type: String, required: true, unique: true},
  phone: String,
  password: String,
  role: String
});

patientSchema.plugin(uniqueValidator);

const patient = mongoose.model("Patient", patientSchema);

module.exports = patient;