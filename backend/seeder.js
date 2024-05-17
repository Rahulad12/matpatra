import mongoose from "mongoose";
import dotenv from "dotenv";
import citizens from "./data/citizenid.js";
import candidates from "./data/candidates.js";
import cititzen from "./models/citizenModel.js";
import candidate from "./models/candidateModel.js";

import Database from "./config/db.js";

dotenv.config();
Database();

const importData = async () => {
    try {
        await cititzen.deleteMany();
        // await candidate.deleteMany();
        await cititzen.insertMany(citizens);
        // const adminUser = createdCitizen[0]._id;
        // const sampleCandidates = candidates.map((candidate) => {
        //     return { ...candidate, user: adminUser };
        // });

        // await candidate.insertMany(candidates);

        console.log("Data Imported!");
        process.exit();
    } catch (error) {
        
        console.error(`${error}`);
        process.exit(1);

    }
};

const destroyData = async () => {
    try {
        await cititzen.deleteMany();
        await candidate.deleteMany();
        console.log("Data Destroyed!");
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
}

if (process.argv[2] === "-d") {
    destroyData();
} else {
    importData();
}
// Path: backend/server.js
