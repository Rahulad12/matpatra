import asyncHandler from "express-async-handler";
import Candidate from "../models/candidateModel.js";

// @desc    Fetch all candidates
// @route   GET /api/candidates
// @access  Public
const getCandidates = asyncHandler(async (req, res) => {
  const candidates = await Candidate.find({});
  res.json(candidates);
});

// @desc    Fetch single candidate
// @route   GET /api/candidates/:id
// @access  Public
const getCandidatesById = asyncHandler(async (req, res) => {
  const candidates = await Candidate.findById(req.params.id);

  if (candidates) {
    res.json(candidates);
  } else {
    res.status(404).send({ message: "Candidate Not Found" });
  }
});

const getHighestVotedCandidate = asyncHandler(async (req, res) => {
  const candidates = await Candidate.find({}).sort({ votes: -1 }).limit(2);
  res.json(candidates);
});

// @desc    Create a candidate
// @route   POST /api/candidates
// @access  Private/Admin
const createCandidate = asyncHandler(async (req, res) => {
  const candidate = new Candidate({
    symbol: "/images/sample.jpg",
    name: "sample name",
    parties: "sample parties",
    age: 0,
    image: "/images/sample.jpg",
    description: "sample description",
    votes: 0,
  });

  const createdCandidate = await candidate.save();
  res.status(201).json(createdCandidate);
});
// @desc    Update a candidate
// @route   PUT /api/candidates/:id
// @access  Private/Admin

const updateCandidate = asyncHandler(async (req, res) => {
  const { symbol, name, parties, age, image, description, votes } = req.body;

  const candidate = await Candidate.findById(req.params.id);

  if (candidate) {
    candidate.symbol = symbol;
    candidate.name = name;
    candidate.parties = parties;
    candidate.age = age;
    candidate.image = image;
    candidate.description = description;
  
    const updatedCandidate = await candidate.save();
    res.json(updatedCandidate);
  } else {
    res.status(404);
    throw new Error("Candidate not found");
  }
});

export {
  getCandidates,
  getCandidatesById,
  getHighestVotedCandidate,
  createCandidate,
  updateCandidate,
};
