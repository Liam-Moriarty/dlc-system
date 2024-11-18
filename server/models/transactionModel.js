import mongoose from "mongoose";

export const TransactionSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    clientName: {
      type: String,
      required: true,
      trim: true,
    },
    unitPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    dateOfSale: {
      type: Date,
      // required: true,
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
