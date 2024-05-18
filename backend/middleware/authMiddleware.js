import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import Citizen from "../models/citizenModel.js";

const protect = asyncHandler(async (req, res, next) => {
//   let token;
// Extract the token from the Authorization header
let token = req.headers.authorization?.split(" ")[1];

if (!token) {
  token = req.cookies.jwt; // Read the JWT token from the cookie if not found in the headers
}

//   token = req.cookies.jwt; // Read the JWT token from the cookie if not found in the headers

  // Read the JWT token from the cookie if not found in the headers

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the citizen by ID and select all fields except the password
      const citizen = await Citizen.findById(decoded.citizenId).select(
        "-password"
      );

      // Check if the session token matches the one stored in the database
      if (citizen && citizen.currentSessionToken === decoded.sessionToken) {
        req.citizen = citizen;
        next();
      } else {
        res.status(401);
        throw new Error("Not authorized, invalid session");
      }
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

export { protect };
