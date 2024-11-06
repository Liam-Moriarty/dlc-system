// PACKAGE IMPORTS
import express from "express";
import { body } from "express-validator";

// PRODUCTS CONTROLLERS
import {
  addProducts,
  deleteProduct,
  getPaginatedProducts,
  getProducts,
  updateProducts,
} from "../controllers/generalControllers/productsControllers.js";

const router = express();

// Validation for adding products

const productValidation = [
  body("product")
    .exists()
    .withMessage("Product is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Product name must be between 2 and 50 characters long only")
    .trim(),
  body("price")
    .exists()
    .withMessage("Price is required")
    .isNumeric()
    .withMessage("Price must be numeric values")
    .custom((value) => {
      if (value <= 0) {
        throw new Error("Price must be greater than or equal to zero");
      }
      return true;
    }),
  body("category").exists().withMessage("Category is required"),
  body("status").exists().withMessage("Status is required"),
  body("description")
    .exists()
    .withMessage("Description is required")
    .isLength({ min: 5, max: 100 })
    .withMessage("Description must be between 5 and 100 characters long only")
    .trim(),
];

// PRODUCT ROUTES

router.get("/paginatedProducts", getPaginatedProducts);

router.get("/products", getProducts);

router.post("/products", productValidation, addProducts);

router.delete("/products/:id", deleteProduct);

router.patch("/products/:id", updateProducts);

export default router;
