import mongoose from "mongoose";
import Transaction from "../../models/transactionModel.js";
import Products from "../../models/productsModel.js";

/**
 * Update product stock based on transaction status
 * @param {String} transactionId - The ID of the transaction
 * @param {String} status - The new status of the transaction
 */
const updateStock = async (transactionId, status) => {
  try {
    // Fetch the transaction details
    const transaction = await Transaction.findById(transactionId);
    if (!transaction) throw new Error("Transaction not found");

    // Get the product associated with the transaction
    const product = await Products.findById(transaction.productId._id);
    if (!product) throw new Error("Product not found");

    // Adjust stock based on the new status
    const quantity = transaction.quantity;
    if (status === "completed") {
      product.quantityInStock -= quantity; // Reduce stock
    } else if (status === "returned") {
      product.quantityInStock += quantity; // Increase stock
    } else {
      throw new Error(
        "Invalid status. Only 'completed' or 'returned' are allowed."
      );
    }

    // Save the updated product stock
    await product.save();

    // Update the transaction's status
    transaction.statusOrder = status;
    await transaction.save();

    console.log("Stock and transaction updated successfully");
  } catch (error) {
    console.error("Error updating stock:", error.message);
  }
};

// // Example usage
// (async () => {
//   const transactionId = "6787ac8cf149a922cf942685"; // Replace with actual transaction ID
//   const newStatus = "completed"; // Set to "completed" or "returned"
//   await updateStock(transactionId, newStatus);
// })();

// GET PAGINATED TRANSACTION
export const getPaginatedTransactions = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 30;

    const startIndex = (page - 1) * limit;
    const totalItems = await Transaction.countDocuments();

    const transactions = await Transaction.find()
      .sort({ createdAt: -1 })
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
    const {
      clientId,
      productId,
      price,
      quantity,
      priceAtSale,
      total,
      paymentMethod,
      statusOrder,
      saleDate,
    } = req.body;

    const emptyFields = [];
    const fields = [
      "clientId",
      "productId",
      "price",
      "quantity",
      "priceAtSale",
      "total",
      "paymentMethod",
      "statusOrder",
      "saleDate",
    ];

    fields.forEach((field) => {
      if (!req.body[field]) {
        emptyFields.push(field);
      }
    });

    if (emptyFields.length > 0) {
      return res
        .status(400)
        .json({ message: "All fields required", emptyFields });
    }

    // Fetch product to validate stock
    const product = await Products.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (statusOrder === "returned") {
      // If it's a return, simply add the stock without checking limits
      product.quantityInStock += quantity;
    }

    if (quantity > product.quantityInStock) {
      return res.status(400).json({
        message: `Insufficient stock. Available stock: ${product.quantityInStock}`,
      });
    }

    const transaction = await Transaction.create({
      clientId,
      productId,
      price,
      quantity,
      priceAtSale,
      total,
      paymentMethod,
      statusOrder,
      saleDate,
    });

    if (transaction.statusOrder === "completed") {
      // Adjust the stock
      await updateStock(transaction._id, "completed");
    }

    if (transaction.statusOrder === "returned") {
      // Adjust the stock
      await updateStock(transaction._id, "returned");
    }

    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE TRANSACTION
export const updateTransaction = async (req, res) => {
  const { id } = req.params;

  try {
    const { productId, quantity, statusOrder } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({ message: "No such ID in the Databsae " });
    }

    // Find the current transaction
    const existingTransaction = await Transaction.findById(id);
    if (!existingTransaction) {
      return res.status(404).json({ message: "No such records to update" });
    }

    // Fetch product to validate stock
    const product = await Products.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (statusOrder === "returned") {
      // If it's a return, simply add the stock without checking limits
      product.quantityInStock += quantity;
    }

    if (quantity > product.quantityInStock) {
      return res.status(400).json({
        message: `Insufficient stock. Available stock: ${product.quantityInStock}`,
      });
    }

    const transaction = await Transaction.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );

    // If statusOrder changes, adjust stock accordingly
    if (
      req.body.statusOrder &&
      req.body.statusOrder !== existingTransaction.statusOrder
    ) {
      await updateStock(transaction._id, req.body.statusOrder);
    }

    if (!transaction) {
      res.status(404).json({ message: "No such records to update" });
    }

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
