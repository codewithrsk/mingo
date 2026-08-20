import dotenv from "dotenv";
dotenv.config();


import express from "express";
import connectDB from "./src/config/dbConnection.config.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import AuthRouter from "./src/routers/auth.route.js";
import UserRouter from "./src/routers/user.route.js";

import http from "http"
import { Server } from "socket.io";


const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/auth", AuthRouter);
app.use("/user", UserRouter);

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
  console.log("base api hit");
});


app.use((err, req, res, next) => {
  const ErrMessage = err.message || "Internal Server Error";
  const ErrStausCode = err.statusCode || 500;

  res.status(ErrStausCode).json({ message: ErrMessage });
});


const PORT = process.env.PORT || 5000;

const httpServer =http.createServer(app)
httpServer.listen(PORT,'0.0.0.0', () => {
  console.log(`server is running on port ${PORT}`);
  connectDB();
});
