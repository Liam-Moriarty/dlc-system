import express from "express";
import { filterData } from "../controllers/reportsControllers/dailySalesControllers";

const router = express();

router.get("/filterData", filterData);

export default router;
