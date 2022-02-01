const express = require("express");
const router = express.Router();

const Admin = require("../models/admin");
const Doctor = require("../models/doctor");
const Patient = require("../models/patient");
const ConnectedUser = require("../models/connectedUser");

const bcrypt = require("bcrypt");

const multer = require("multer");
const { response } = require("express");

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
router.post("/signup", multer({ storage: storage }).single('image'), (req, res) => {
  let url = req.protocol + '://' + req.get('host');
  let imageDoctor;
  let doctorDisponibility;
  let User = (req.body.role == "admin" ) ? Admin : (req.body.role == "doctor" ) ? Doctor : Patient; 
  bcrypt.hash(req.body.password, 8).then((cryptedPassword) => {
    if (req.body.department) {
      req.body.department = req.body.department.toLowerCase();
    }
    if (req.body.firstName) {
      req.body.firstName = req.body.firstName.toLowerCase();
    }
    if (req.body.lastName) {
      req.body.lastName = req.body.lastName.toLowerCase();
    }
      if (req.body.email) {
        req.body.email = req.body.email.toLowerCase();
      }
    if (req.file) {
      imageDoctor = url + '/images/' + req.file.filename;
    }
    if (response !== undefined) {
      try {
        doctorDisponibility = JSON.parse(req.body.disponibility);
      } catch (error) {
        console.error("Not a JSON response")
      }
    } 
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      password: cryptedPassword,
      department: req.body.department,
      disponibility: doctorDisponibility,
      image: imageDoctor,
      role: req.body.role,
    });
    console.log(req.body);
    user.save((error, result) => {
      if (error) {
        if (error.errors.email) {
          res.status(200).json({
            result: "0",
          });
        }
      } else if (result) {
        res.status(200).json({
          result: "1",
        });
      }
    });
  });
});
router.post("/login", (req, res) => {
  Admin.findOne({ email: req.body.email })
    .then((emailResult) => {
      if (!emailResult) {
        Doctor.findOne({ email: req.body.email })
          .then((emailResult) => {
            if (!emailResult) {
              Patient.findOne({ email: req.body.email })
                .then((emailResult) => {
                  if (!emailResult) {
                    res.status(200).json({
                      result: "0",
                    });
                  }
                  return bcrypt.compare(
                    req.body.password,
                    emailResult.password
                  );
                })
                .then((passwordResult) => {
                  if (!passwordResult) {
                    res.status(200).json({
                      result: "0",
                    });
                  }
                  let newConnectedUser = new ConnectedUser({
                    email: req.body.email,
                    password: req.body.password,
                  });
                  newConnectedUser.save().then((data) => {
                    res.status(200).json({
                      result: data.email,
                    });
                  });
                });
            }
            return bcrypt.compare(req.body.password, emailResult.password);
          })
          .then((passwordResult) => {
            if (!passwordResult) {
              res.status(200).json({
                result: "0",
              });
            }
            let newConnectedUser = new ConnectedUser({
              email: req.body.email,
              password: req.body.password,
            });
            newConnectedUser.save().then((data) => {
              res.status(200).json({
                result: data.email,
              });
            });
          });
      }
      return bcrypt.compare(req.body.password, emailResult.password);
    })
    .then((passwordResult) => {
      if (!passwordResult) {
        res.status(200).json({
          result: "0",
        });
      }
      let newConnectedUser = new ConnectedUser({
        email: req.body.email,
        password: req.body.password,
      });
      newConnectedUser.save().then((data) => {
        res.status(200).json({
          result: data.email,
        });
      });
    });
});

router.delete("/:email", (req, res) => {
  ConnectedUser.deleteMany({ email: req.params.email }).then((data) => {
    res.status(200).json({
      result: "disconnected",
    });
  });
});
router.get("/connected", (req, res) => {
  // console.log("fffff", req.body);
  ConnectedUser.findOne().then((connectedUser) => {
    if (connectedUser) {
      Admin.findOne({ email: connectedUser.email }).then((data) => {
        if (data) {
          res.status(200).json({
            result: data,
          });
        } else if (!data) {
          Doctor.findOne({ email: connectedUser.email }).then((data) => {
            if (data) {
              res.status(200).json({
                result: data,
              });
            } else if (!data) {
              Patient.findOne({ email: connectedUser.email }).then((data) => {
                if (data) {
                  res.status(200).json({
                    result: data,
                  });
                }
              });
            }
          });
        }
      });
    }
  });
});

module.exports = router;
