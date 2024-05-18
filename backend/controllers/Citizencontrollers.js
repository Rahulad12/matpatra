import Citizen from "../models/citizenModel.js";
import Candidate from "../models/candidateModel.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

// @desc    Fetch all citizens
// @route   GET /api/citizens
// @access  Public

const authCitizen = asyncHandler(async (req, res, next) => {
  const { citizenid, name, password } = req.body;

  // Authenticate user
  const citizens = await Citizen.findOne({ citizenid });
  if (
    citizens &&
    (await citizens.matchPassword(password)) &&
    citizens.name === name
  ) {
    if (citizens.currentSessionToken) {
      // If a session token already exists, remove it
      citizens.currentSessionToken = null;
      await citizens.save();
    }

    // Generate a unique session token
    const sessionToken = uuidv4();
    console.log(sessionToken);

    // Save session token in database
    citizens.currentSessionToken = sessionToken;
    await citizens.save();

    // Generate JWT with session token
    const token = jwt.sign(
      { citizenId: citizens._id, sessionToken }, // Include sessionToken in payload
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Set JWT token in cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 3600000, // 1 hour
    });

    // send response with user data and JWT token
    res.json({
      _id: citizens._id,
      citizenid: citizens.citizenid,
      name: citizens.name,
      isAdmin: citizens.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid citizen data");
  }
});

const registerCitizen = asyncHandler(async (req, res) => {
  res.send("register citizen");
});

// @desc    logout/clear all citizens
// @route   GET /api/citizens/logout/:id
// @access  Public
const logoutCitizen = asyncHandler(async (req, res) => {
  const { citizenId } = req.body; // Find citizen by ID
  // console.log(citizenId);
  const citizen = await Citizen.findById(citizenId);

  if (citizen) {
    // Clear session token in database
    citizen.currentSessionToken = null;
    await citizen.save();

    // Clear session token in database
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ message: "Logged out successfully" });
  }
  else{
    res.status(404);
    throw new Error("Citizen not found");
  
  }
});

const getCitizens = asyncHandler(async (req, res) => {
  const citizens = await Citizen.find({});
  res.json(citizens);
});

// @desc    Fetch single citizen
// @route   GET /api/citizens/:id
// @access  Public
const getCitizensById = asyncHandler(async (req, res) => {
  const citizen = await Citizen.findById(req.params.id);

  if (citizen) {
    res.json(citizen);
  } else {
    res.status(404);
    throw new Error("Citizen not found");
  }
});

// @desc    vote for a candidate
// @route   POST /api/citizens/vote
// @access  Private
const voteCandidate = asyncHandler(async (req, res) => {
  const { candidateId } = req.body;
  // console.log(candidateId);
  const candidate = await Candidate.findById(candidateId);
  if (candidate) {
    candidate.votes = candidate.votes + 1;
    const updatedCandidate = await candidate.save();
    res.json(updatedCandidate);
  } else {
    res.status(404);
    throw new Error("Candidate not found");
  }
});

// @desc    Delete a citizen
// @route   DELETE /api/citizens/:id
// @access  Private

const deleteCitizen = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Thank you for voting " });
  const { citizenId } = req.body;

  console.log(citizenId);
  const citizen = await Citizen.findById(citizenId);
  if (citizen) {
    await citizen.deleteOne();

    res.json({ message: "Citizen removed" });
  } else {
    res.status(404);
    throw new Error("Citizen not found");
  }
});

export {
  authCitizen,
  registerCitizen,
  logoutCitizen,
  getCitizens,
  voteCandidate,
  deleteCitizen,
  getCitizensById,
};
