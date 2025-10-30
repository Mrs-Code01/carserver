const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  description: String,
  reply: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Chat", chatSchema);
