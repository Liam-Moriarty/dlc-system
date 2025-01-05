import express from "express";
import {
  signUp,
  getAdmins,
  login,
  protectData,
} from "../controllers/generalControllers/authController.js";

const router = express();

router.get("/admins", protectData, getAdmins);

router.post("/admin-signup", signUp);

router.post("/admin-login", login);

export default router;
