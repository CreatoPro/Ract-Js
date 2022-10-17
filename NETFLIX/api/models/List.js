const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    type: { type: String },
    genre: { type: String },
    constant: { type: Array },
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("List", ListSchema);
