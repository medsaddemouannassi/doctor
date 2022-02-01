const mongoose = require("mongoose");

const connectedUserSchema = mongoose.Schema({
  email: String,
  password: String,
});


const connectedUser = mongoose.model("ConnectedUser", connectedUserSchema);

module.exports = connectedUser;