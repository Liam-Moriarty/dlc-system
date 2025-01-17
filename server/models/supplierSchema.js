import mongoose from "mongoose";

const SupplierSchema = new mongoose.Schema(
  {
    suppliers: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    contacts: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

// middleware to convert values into lowercase before sending to DB
SupplierSchema.pre("save", function (next) {
  this.suppliers = this.suppliers.toLowerCase();
  this.location = this.location.toLowerCase();
  next();
});

// middleware to convert updated values into lowercase
SupplierSchema.pre("findOneAndUpdate", function (next) {
  // Access the update object
  const update = this.getUpdate();

  // Convert the relevant fields to lowercase, if they exist in the update
  if (update.suppliers) {
    update.suppliers = update.suppliers.toLowerCase();
  }

  if (update.location) {
    update.location = update.location.toLowerCase();
  }

  next();
});

const Suppliers = mongoose.model("Supplier", SupplierSchema, "supplier");
export default Suppliers;
