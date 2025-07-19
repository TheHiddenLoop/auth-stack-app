import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import signupRouter from "./routes/authRoutes.js";
import cors from "cors"

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true              
}));
app.use("/api/auth", signupRouter);

async function main() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Database connected");
  app.listen(process.env.PORT, () => {
    console.log(`Server is running at :http://localhost:${process.env.PORT}`);
  });
}

main();
