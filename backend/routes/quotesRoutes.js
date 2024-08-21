import express from "express";

const router = express.Router();

router.get("/quotes/quotes-form", (req, res) => {
  res.send("Hello from quotes/quotes-form");
});

router.get("/quotes/quotes-documents", (req, res) => {
  res.send("Hello from quotes/quotes-documents");
});

export default router;
