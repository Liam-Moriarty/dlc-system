// PACKAGE IMPORTS
import express from "express";
import {
  createSupplier,
  deleteSupplier,
  getPaginatedSuppliers,
  getSupplier,
  updateSupplier,
} from "../controllers/inventoryControllers/supplierControllers.js";

const router = express();

// SUPPLIER ROUTES

router.post("/suppliers", createSupplier);

router.get("/paginatedSuppliers", getPaginatedSuppliers);

router.delete("/paginatedSuppliers/:id", deleteSupplier);

router.patch("/paginatedSuppliers/:id", updateSupplier);

router.get("/suppliers", getSupplier);

export default router;
