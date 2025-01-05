import mongoose from "mongoose";
import Transaction from "../../models/transactionModel.js";

// GET PAGINATED TRANSACTION
export const getPaginatedTransactions = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 30;

    const startIndex = (page - 1) * limit;
    const totalItems = await Transaction.countDocuments();

    const transactions = await Transaction.find()
      .sort({ saleDate: -1 })
      .populate("clientId", "company city")
      .populate("productId", "product price")
      .skip(startIndex)
      .limit(limit);

    const transaction = transactions.map((item) => ({
      ...item.toObject(),
    }));

    res.json({
      totalItems,
      currentPage: page,
      totalPages: Math.ceil(totalItems / limit),
      transaction,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE TRANSACTION
export const createTransaction = async (req, res) => {
  try {
    const { ...productData } = req.body;
    const transaction = await Transaction.create({ ...productData });

    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE TRANSACTION
export const deleteTransaction = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({ message: "No such transaction ID found" });
    }

    const transaction = await Transaction.findByIdAndDelete(id);

    if (!transaction) {
      res.status(404).json({ message: "No such transaction" });
    }

    res
      .status(200)
      .json({ message: "Transaction deleted successfully : ", id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE TRANSACTION
export const updateTransaction = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({ message: "No such ID in the Databsae " });
    }

    const transaction = await Transaction.findByIdAndUpdate(id, {
      ...req.body,
    });

    if (!transaction) {
      res.status(404).json({ message: "No such records to update" });
    }

    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADD ONS
export const getAllTransactions = async (req, res) => {
  try {
    const transaction = await Transaction.find({})
      .populate("clientId", "company city")
      .populate("productId", "product price")
      .sort({ createdAt: -1 });
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
