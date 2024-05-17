import Citizen from "../models/citizenModel.js";
import Candidate from "../models/candidateModel.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

// @desc    Fetch all citizens
// @route   GET /api/citizens
// @access  Public

const authCitizen = asyncHandler(async (req, res, next) => {
  const { citizenid, name, password } = req.body;

  const citizens = await Citizen.findOne({ citizenid });
  if (
    citizens &&
    (await citizens.matchPassword(password)) &&
    citizens.name === name
  ) {
    const token = jwt.sign(
      { citizenId: citizens._id },

      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );
    //set JWT token in cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

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
// @route   GET /api/citizens/logout
// @access  Public
const logoutCitizen = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
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
