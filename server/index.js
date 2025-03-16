import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// ROUTES IMPORT
import productRoutes from "./routes/productRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

import supplierRoutes from "./routes/supplierRoutes.js";
import inventoryMovementsRoutes from "./routes/inventoryMovementsRoutes.js";

import authRoutes from "./routes/authRoutes.js";
import visualizationRoutes from "./routes/visualizationRoutes.js";

// CONFIGURATION
dotenv.config();
const app = express();

// MIDDLEWARES
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // Frontend URL
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    credentials: true, // Use this if your app uses cookies/auth
  })
);
app.use(express.json());
app.options("*", cors());

// ROUTES
app.use("/general", clientRoutes);
app.use("/general", productRoutes);
app.use("/general", transactionRoutes);
app.use("/general", adminRoutes);

app.use("/inventory", supplierRoutes);
app.use("/inventory", inventoryMovementsRoutes);

app.use("/", authRoutes);
app.use("/analytics", visualizationRoutes);

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("DATABASE CONNECTED!!");
    app.listen(PORT, () => {
      console.log(`Server connected at port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("DATABASE ERROR : ", error);
  });
