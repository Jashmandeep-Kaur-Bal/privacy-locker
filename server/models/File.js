const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  filename: String,
  path: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("File", fileSchema);