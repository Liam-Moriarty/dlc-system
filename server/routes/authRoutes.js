import express from "express";
import {
  signUp,
  login,
} from "../controllers/adminControllers/authController.js";

const router = express();

router.post("/admin-signup", signUp);

router.post("/admin-login", login);

export default router;
