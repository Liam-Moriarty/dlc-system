import mongoose from "mongoose";

const InventoryMovementsSchema = new mongoose.Schema(
  {
    suppliersId: {
      type: mongoose.Types.ObjectId,
      ref: "Supplier",
      required: true,
    },
    productDetails: {
      type: mongoose.Types.ObjectId,
      ref: "Products",
      required: true,
    },
    type: {
      type: String,
      enum: ["ingoing", "outgoing"],
      required: true,
      trim: true,
    },
    movementStatus: {
      type: String,
      enum: ["purchase", "return", "transfer"],
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    createdBy: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

// middleware to convert values into lowercase before sending to DB
InventoryMovementsSchema.pre("save", function (next) {
  this.createdBy = this.createdBy.toLowerCase();
  this.location = this.location.toLowerCase();
  next();
});

// middleware to convert updated values into lowercase
InventoryMovementsSchema.pre("findOneAndUpdate", function (next) {
  // Access the update object
  const update = this.getUpdate();

  // Convert the relevant fields to lowercase, if they exist in the update
  if (update.createdBy) {
    update.createdBy = update.createdBy.toLowerCase();
  }

  if (update.location) {
    update.location = update.location.toLowerCase();
  }

  next();
});

const Movements = mongoose.model(
  "Movements",
  InventoryMovementsSchema,
  "movements"
);
export default Movements;
