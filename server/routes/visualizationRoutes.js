import express from "express";
import {
  getDailySales,
  getMonthSales,
  getWeekSales,
} from "../controllers/analyticsControllers/analyticsControllers.js";
import {
  leastProducts,
  topProducts,
} from "../controllers/analyticsControllers/performanceController.js";
import {
  latestSale,
  numberOfClients,
  statusCount,
  statusRevenue,
} from "../controllers/analyticsControllers/statisticController.js";

const router = express();

router.get("/top-products", topProducts);

router.get("/least-products", leastProducts);

router.post("/daily-sales", getDailySales);

router.get("/week-sales", getWeekSales);

router.get("/month-sales", getMonthSales);

router.get("/status-revenue", statusRevenue);

router.get("/status-count", statusCount);

router.get("/sales-today", latestSale);

router.get("/client-count", numberOfClients);

export default router;
