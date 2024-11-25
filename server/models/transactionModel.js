import mongoose from "mongoose";

export const TransactionSchema = new mongoose.Schema(
  {
    clientId: {
      type: mongoose.Types.ObjectId,
      ref: "Client",
    },
    productId: [
      {
        products: {
          type: mongoose.Types.ObjectId,
          ref: "Products",
        },
        quantity: {
          type: Number,
          required: true,
        },
        priceAtSale: {
          type: Number,
          required: true,
        },
        total: {
          type: Number,
          required: true,
        },
      },
    ],
    totalAmount: {
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
    saleDate: {
      type: Date,
      default: Date.now,
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
