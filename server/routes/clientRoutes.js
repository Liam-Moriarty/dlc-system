// PACKAGE IMPORTS
import express from "express";
import { body } from "express-validator";

// CLIENT CONTROLLERS
import {
  addClient,
  deleteClient,
  getPaginatedClients,
  updateClient,
} from "../controllers/generalControllers/clientsControllers.js";

const router = express();

// Validation for adding clients
const clientValidation = [
  body("company")
    .exists()
    .withMessage("Company is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Company name must be between 2 and 50 characters")
    .trim(),
  body("contacts")
    .exists()
    .withMessage("Contacts is required")
    .isLength({ min: 10, max: 10 })
    .withMessage("Contact number must be 10 valid numbers")
    .trim(),
  body("email")
    .exists()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail(),
  body("city")
    .exists()
    .withMessage("City is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("City name must be between 2 and 50 characters")
    .trim(),
];

// CLIENT ROUTES
router.get("/paginatedClients", getPaginatedClients);

router.post("/paginatedClients", clientValidation, addClient); // Validation applied here

router.delete("/paginatedClients/:id", deleteClient);

router.patch("/paginatedClients/:id", updateClient);

export default router;
