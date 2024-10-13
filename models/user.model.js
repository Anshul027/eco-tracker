const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
  },
  carbonFootprint: {
    total: {
      type: Number,
      default: 0, // Total carbon footprint
    },
    transportationEmission: {
      type: Number,
      default: 0, // Emission due to transportation
    },
    energyConsumption: {
      type: Number,
      default: 0, // Emission due to energy consumption
    },
    wasteDisposal: {
      type: Number,
      default: 0, // Emission due to waste disposal
    },
  },
});

const User = mongoose.model("user", userSchema);
module.exports = User;
