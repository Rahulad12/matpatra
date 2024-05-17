import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import candidateRoute from "./routes/candidateRouter.js";
import citizenRoute from "./routes/citizenRouter.js";
import uploadRoute from "./routes/uploadRouter.js";
const port = process.env.PORT || 5000;
import Database from "./config/db.js";

Database(); // Call the function
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser
app.use(cookieParser());

// app.get("/", (req, res) => {
//   res.send("Server is ready");
// });

app.use("/api/candidates", candidateRoute);

app.use("/api/citizens", citizenRoute);
app.use("/api/uploads", uploadRoute);

const __dirname = path.resolve(); // Corrected path
app.use("/uploads", express.static(path.join(__dirname, "/uploads"))); // Corrected path


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );

}
else{
  app.get("/", (req, res) => {
    res.send("API is running....");
  });

}
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
