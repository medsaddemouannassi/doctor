const express = require("express");

const router = express.Router();

const Appointment = require("../models/appointment");

const { ObjectId } = require("mongodb");

router.get("/", (req, res) => {
  Appointment.find().then((data) => {
    res.status(200).json({
      result: data,
    });
  });
});
router.get("/:id", (req, res) => {
  Appointment.findOne({ _id: req.params.id }).then((data) => {
    res.status(200).json({
      result: data,
    });
  });
});
router.post("/", (req, res) => {
  const appointment = new Appointment({
    doctorId: ObjectId(req.body.doctorId),
    patientId: ObjectId(req.body.patientId),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    department: req.body.department,
    doctor: req.body.doctor,
    date: req.body.date,
    time: req.body.time,
    message: req.body.message,
  });
  appointment.save().then((data) => {
    res.status(200).json({
      result: "added with success",
    });
  });
});
router.put("/:id", (req, res) => {
  Appointment.updateOne({ _id: req.params.id }, req.body).then((data) => {
    res.status(200).json({
      result: "edited with success",
    });
  });
});
router.delete("/:id", (req, res) => {
  Appointment.deleteOne({ _id: req.params.id }).then((data) => {
    res.status(200).json({
      result: "deleted with success",
    });
  });
});
module.exports = router;