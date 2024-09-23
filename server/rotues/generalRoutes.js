import express from "express";
import {
  addClient,
  getClients,
  getPaginatedClients,
} from "../controllers/generalControllers.js";

const router = express();

router.get("/clients", getClients);

router.get("/paginatedClients", getPaginatedClients);

router.post("/paginatedClients", addClient);

export default router;
