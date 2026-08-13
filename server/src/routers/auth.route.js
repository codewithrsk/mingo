import express from "express";
import {
  LoginUser,
  LogoutUser,
  RegisterUser,
} from "../controller/auth.controller.js";

const router = express.Router();

router.post("/register", RegisterUser);
router.post("/login", LoginUser);


export default router;