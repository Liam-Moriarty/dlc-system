import express from "express";
import {
  changePassword,
  deleteAdmin,
  paginatedAdmin,
  updateAdmin,
} from "../controllers/adminControllers/adminControllers.js";

import { protectData } from "../controllers/adminControllers/authController.js";

const router = express();

// protectData verify if the admin is login then we will allow it to change credentials
router.put("/changePassword", protectData, changePassword);

router.put("/updateProfile", protectData, updateAdmin);

router.get("/admins", paginatedAdmin);

router.delete("/admin/:id", deleteAdmin);

export default router;
