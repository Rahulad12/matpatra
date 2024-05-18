import mongoose from "mongoose";
import bcrypt from "bcryptjs";
// Define the schema for the candidate model

const citizenschema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    citizenid: {
      type: String,
      required: true,
      unique: true,
    },
    age: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    currentSessionToken: { type: String, default: null }, // Add this field to store the current session token
  },
  {
    timestamps: true,
  }
);

citizenschema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Cititzen = mongoose.model("Citizen", citizenschema);

export default Cititzen;
// Path: backend/models/candidateModel.js
