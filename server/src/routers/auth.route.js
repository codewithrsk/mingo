import express from "express";
import { UserRegister, UserLogin, GoogleUserLogin } from "../controller/auth.controller.js";
import { GoogleProtect } from "../middleware/google.middleware.js";

const router = express.Router();

router.post("/register", UserRegister);
router.post("/login", UserLogin);
router.post("/googleLogin", GoogleProtect, GoogleUserLogin);

export default router;