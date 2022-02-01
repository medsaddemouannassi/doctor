const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Security configuration
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, Accept, Content-Type, X-Requested-with"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, OPTIONS, PATCH, PUT"
  );
  next();
});

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/doctorDB");

const path = require("path");
app.use("/images", express.static(path.join("backend/images")));

const appointmentRoutes = require("./routes/appointment-routes");
const doctorRoutes = require("./routes/doctor-routes");
const patientRoutes = require("./routes/patient-routes");
const userRoutes = require("./routes/user-routes");

app.use("/api/admin-appointments", appointmentRoutes);
app.use("/api/admin-doctors", doctorRoutes);
app.use("/api/admin-patients", patientRoutes);
app.use("/api/users", userRoutes);

module.exports = app;