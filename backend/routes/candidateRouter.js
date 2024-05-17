import express from "express";

import {
  getCandidates,
  getCandidatesById,
  getHighestVotedCandidate,
  createCandidate,
  updateCandidate,
} from "../controllers/Candidatecontrollers.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").get(getCandidates).post(protect, createCandidate);
router.route("/highestvoted").get(getHighestVotedCandidate);
router.route("/:id").get(getCandidatesById).put(protect, updateCandidate);

export default router;
