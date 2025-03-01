import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/db/connect.js";
import cookieParser from "cookie-parser";
import fs from "node:fs";

dotenv.config();
const port = process.env.PORT || 8000;

const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//routes
const routeFiles = fs.readdirSync("./src/routes");
console.log(routeFiles);


const server = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log("Server is running on port: ", port);
    });
  } catch (error) {
    console.log("Error in server: ", error.message);
    process.exit(1);
  }
};

server();
