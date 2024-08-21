import express from "express";
import { getClient, getClients } from "../controllers/clientsControllers.js";

const router = express.Router();

router.get("/clients/manage-client", getClients);

router.post("/clients/new-client", getClient);

export default router;
