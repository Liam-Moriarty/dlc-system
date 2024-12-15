import mongoose from "mongoose";

export const TransactionSchema = new mongoose.Schema(
  {
    clientId: {
      type: mongoose.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    productId: {
      type: mongoose.Types.ObjectId,
      ref: "Products",
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    priceAtSale: {
      type: String,
    },
    total: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["cod", "g-cash", "card"],
      min: 0,
    },
    statusOrder: {
      type: String,
      enum: ["pending", "completed", "cancelled", "returned"],
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model(
  "Transactions",
  TransactionSchema,
  "transactions"
);
export default Transaction;
