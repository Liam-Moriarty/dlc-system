import express from "express";
import {
  addClient,
  deleteClient,
  getClients,
  getPaginatedClients,
  updateClient,
} from "../controllers/generalControllers/clientsControllers.js";
import { body } from "express-validator";
import {
  addProducts,
  getProducts,
} from "../controllers/generalControllers/productsControllers.js";

const router = express();

// Validation for adding and updating clients
const clientValidation = [
  body("company")
    .isLength({ min: 2, max: 50 })
    .withMessage("Company name must be between 2 and 50 characters")
    .trim(),
  body("contacts")
    .isLength({ min: 10, max: 10 })
    .withMessage("Contact number must be 10 valid numbers")
    .trim(),
  body("email")
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail(),
  body("city")
    .isLength({ min: 2, max: 50 })
    .withMessage("City name must be between 2 and 50 characters")
    .trim(),
];

// CLIENT ROUTES
router.get("/paginatedClients", getPaginatedClients);

router.post("/paginatedClients", clientValidation, addClient); // Validation applied here

router.delete("/paginatedClients/:id", deleteClient);

router.patch("/paginatedClients/:id", clientValidation, updateClient); // Validation applied here

// PRODUCT ROUTES

router.get("/products", getProducts);

router.post("/products", addProducts);

// router.delete("/products/:id", );

// router.patch("/products/:id",);

//  EXTRAS

router.get("/clients", getClients);

export default router;
