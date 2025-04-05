import express from "express";
import {
  signUp,
  login,
} from "../controllers/adminControllers/authController.js";
import validatePassword from "../middlewares/validatePassword.js";

const router = express();

router.post("/admin-signup", validatePassword, signUp);

router.post("/admin-login", login);

export default router;
