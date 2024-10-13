const mongoose = require("mongoose");
const { Schema } = mongoose;

// Tip Schema
const tipSchema = new Schema({
  message: {
    type: String,
    required: true, // Ensures that every tip has a message
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User", // Reference to a user collection
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set creation date
  },
});

const Tip = mongoose.model("Tip", tipSchema);

module.exports = Tip;
