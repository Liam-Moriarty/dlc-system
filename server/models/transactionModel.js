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
    saleDate: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

// middleware to convert values into lowercase before sending to DB
TransactionSchema.pre("save", function (next) {
  this.paymentMethod = this.paymentMethod.toLowerCase();
  this.statusOrder = this.statusOrder.toLowerCase();
  this.priceAtSale = this.priceAtSale.toLowerCase();
  next();
});

// middleware to convert updated values into lowercase
TransactionSchema.pre("findOneAndUpdate", function (next) {
  // Access the update object
  const update = this.getUpdate();

  // Convert the relevant fields to lowercase, if they exist in the update
  if (update.paymentMethod) {
    update.paymentMethod = update.paymentMethod.toLowerCase();
  }

  if (update.statusOrder) {
    update.statusOrder = update.statusOrder.toLowerCase();
  }

  if (update.priceAtSale) {
    update.priceAtSale = update.priceAtSale.toLowerCase();
  }

  next();
});

const Transaction = mongoose.model(
  "Transactions",
  TransactionSchema,
  "transactions"
);
export default Transaction;
