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
const allowedOrigins = [
  "https://dlc-system-dyba.vercel.app",
  "https://dlc-system-dyba-git-master-fernando-ordiales-projects.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true); // Allow the request
      } else {
        callback(new Error("Not allowed by CORS")); // Block the request
      }
    },
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
app.options("*", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PATCH,DELETE,OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.status(200).end();
});
app.use(express.json());

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
