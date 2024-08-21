// PACKAGES
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// ROUTE FILES
import clientsRoutes from "./routes/clientsRoutes.js";
import quotesRoutes from "./routes/quotesRoutes.js";

const app = express();
dotenv.config();

// MIDDLEWARES
app.use(express.json());
app.use(cors({}));

// ROUTES
app.use("/sales", clientsRoutes);
app.use("/sales", quotesRoutes);

// DB CONNECTION
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
