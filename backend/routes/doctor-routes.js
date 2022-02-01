const express = require("express");
const router = express.Router();

const Doctor = require("../models/doctor");

const multer = require("multer");

const MIME_TYPE = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};
const storage = multer.diskStorage({
  // destination
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE[file.mimetype];
    let error = new Error("Mime type is invalid");
    if (isValid) {
      error = null;
    }
    cb(null, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const extension = MIME_TYPE[file.mimetype];
    const imgName = name + "-" + Date.now() + "-crococoder-" + "." + extension;
    cb(null, imgName);
  },
});

router.get("/", (req, res) => {
  Doctor.find().then((data) => {
    res.status(200).json({
      result: data,
    });
  });
});
router.get("/doctors/find/:id", (req, res) => {
  Doctor.findOne({ _id: req.params.id }).then((data) => {
    res.status(200).json({
      result: data,
    });
  });
});
router.put("/:id", multer({ storage: storage }).single('image'), (req, res) => {
  let url = req.protocol + '://' + req.get('host');
  req.body.image = url + '/images/' + req.file.filename
  Doctor.updateOne({ _id: req.params.id }, req.body).then((data) => {
    res.status(200).json({
      result: "edited with success",
    });
  });
});
router.delete("/:id", (req, res) => {
  Doctor.deleteOne({ _id: req.params.id }).then((data) => {
    res.status(200).json({
      result: "deleted with success",
    });
  });
});
router.get("/search-professional/:input", (req, res) => {
  Doctor.find({ $or: [
    { firstName: { $regex: req.params.input.toLowerCase("") } },
    { department: { $regex: req.params.input.toLowerCase("") } }
  ]}).then(
    (data) => {
      res.status(200).json({
        result: data,
      });
    }
  );
});
router.get("/doctors&appointments", (req, res) => {
  Doctor.aggregate(
    [
      {
        $lookup: {
          from: "appointments", // collection to join
          localField: "_id", //field from the input documents
          foreignField: "doctorId", //field from the documents of the "from" collection
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


module.exports = router;