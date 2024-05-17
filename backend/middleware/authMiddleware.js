import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import Citizen from "../models/citizenModel.js";

const protect = asyncHandler(async (req, res, next) => {
    let token;

    //Read the JWT token from the cookie

    token = req.cookies.jwt;

    if(token){
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.citizen = await Citizen.findById(decoded.citizenId).select("-password");
            next();
        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error("Not authorized, token failed");
        }
    }
    else{
        res.status(401);
        throw new Error("Not authorized, no token");
    }
});

export { protect };