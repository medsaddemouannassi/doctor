const express = require("express");
const router = express.Router();

const Patient = require("../models/patient");

router.get("/", (req, res) => {
  Patient.find().then((data) => {
    res.status(200).json({
      result: data,
    });
  });
});
router.get("/patients&appointments", (req, res) => {
  Patient.aggregate(
    [
      {
        $lookup: {
          from: "appointments", // collection to join
          localField: "_id", //field from the input documents
          foreignField: "patientId", //field from the documents of the "from" collection
          as: "appointments", // output array field
        },
      },
    ],
    (error, docs) => {
      res.status(200).json({
        result: docs,
      });
    }
  );
});
router.get("/:id", (req, res) => {
  Patient.findOne({ _id: req.params.id }).then((data) => {
    res.status(200).json({
      result: data,
    });
  });
});
router.put("/:id", (req, res) => {
  Patient.updateOne({ _id: req.params.id }, req.body).then((data) => {
    res.status(200).json({
      result: "edited with success",
    });
  });
});
router.delete("/:id", (req, res) => {
  Patient.deleteOne({ _id: req.params.id }).then((data) => {
    res.status(200).json({
      result: "deleted with success",
    });
  });
});

module.exports = router;