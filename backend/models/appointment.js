const mongoose = require("mongoose");

const appointmentSchema = mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
  },
  doctor: String,
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  department: String,
  date: String,
  time: String,
  message: String,
});

const appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = appointment;
