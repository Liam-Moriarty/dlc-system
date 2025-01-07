import express from "express";
import {
  deleteAdmin,
  paginatedAdmin,
} from "../controllers/adminControllers/adminControllers.js";

const router = express();

router.get("/admins", paginatedAdmin);

router.delete("/admin/:id", deleteAdmin);

export default router;
