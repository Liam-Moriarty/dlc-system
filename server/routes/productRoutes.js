// PACKAGE IMPORTS
import express from "express";

// PRODUCTS CONTROLLERS
import {
  addProducts,
  deleteProduct,
  getPaginatedProducts,
  getProducts,
  updateProducts,
} from "../controllers/generalControllers/productsControllers.js";

const router = express();

// PRODUCT ROUTES

router.get("/paginatedProducts", getPaginatedProducts);

router.get("/products", getProducts);

router.post("/products", addProducts);

router.delete("/products/:id", deleteProduct);

router.patch("/products/:id", updateProducts);

export default router;
