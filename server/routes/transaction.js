import express from "express";
import {
  createTransaction,
  deleteTransaction,
  getAllTransactions,
  getPaginatedTransactions,
  updateTransaction,
} from "../controllers/generalControllers/transactionController.js";
import {
  getUniqueClients,
  getUniqueProducts,
} from "../controllers/generalControllers/productsControllers.js";

const router = express();

// TRANSACTION ROUTER

router.get("/paginatedTransaction", getPaginatedTransactions);

router.post("/paginatedTransaction", createTransaction);

router.delete("/paginatedTransaction/:id", deleteTransaction);

router.patch("/paginatedTransaction/:id", updateTransaction);

router.get("/transactions", getAllTransactions);

router.get("/uniqueProducts", getUniqueProducts);

router.get("/uniqueClients", getUniqueClients);

export default router;
