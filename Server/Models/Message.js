const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  room: String,
  user: String,
  message: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Message", messageSchema);