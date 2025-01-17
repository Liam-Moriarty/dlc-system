// PACKAGE IMPORTS
import express from "express";
import {
  createInventoryMovements,
  deleteInventoryMovements,
  getPaginatedMovement,
  updateInventoryMovement,
} from "../controllers/inventoryControllers/inventoryMovementControllers.js";
import { getAggregatedProducts } from "../controllers/generalControllers/productsControllers.js";

const router = express();

// SUPPLIER ROUTES

router.post("/movement", createInventoryMovements);

router.get("/paginatedMovement", getPaginatedMovement);

router.delete("/paginatedMovement/:id", deleteInventoryMovements);

router.patch("/paginatedMovement/:id", updateInventoryMovement);

router.get("/aggregatedProducts", getAggregatedProducts);

export default router;
