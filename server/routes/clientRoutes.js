// PACKAGE IMPORTS
import express from "express";

// CLIENT CONTROLLERS
import {
  addClient,
  deleteClient,
  getClients,
  getPaginatedClients,
  updateClient,
} from "../controllers/generalControllers/clientsControllers.js";

const router = express();

// CLIENT ROUTES
router.get("/paginatedClients", getPaginatedClients);

router.post("/paginatedClients", addClient);

router.delete("/paginatedClients/:id", deleteClient);

router.patch("/paginatedClients/:id", updateClient);

router.get("/clients", getClients);

export default router;
