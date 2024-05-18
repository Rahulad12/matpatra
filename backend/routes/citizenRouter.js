import express from "express";
const router = express.Router();

import {
  authCitizen,
  registerCitizen,
  logoutCitizen,
  getCitizens,
  voteCandidate,
  deleteCitizen,
  getCitizensById
} from "../controllers/Citizencontrollers.js";

import {protect}  from "../middleware/authMiddleware.js";

router.route("/").get(getCitizens).post(registerCitizen);
router.route("/:id").get(getCitizensById);
router.route("/auth").post(authCitizen)
router.route("/vote").put(protect,voteCandidate);
router.route("/:id").get(protect,getCitizensById).delete(protect,deleteCitizen);
router.post("/logout",protect,logoutCitizen)

export default router;
