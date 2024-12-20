import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// ROUTES
import productRoutes from "./routes/productRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";
import transactionRoutes from "./routes/transaction.js";

// CONFIGURATION
dotenv.config();
const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json());

app.use("/general", clientRoutes);
app.use("/general", productRoutes);
app.use("/general", transactionRoutes);

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
