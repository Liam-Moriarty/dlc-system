import mongoose from "mongoose";

const ProductsSchema = new mongoose.Schema(
  {
    product: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
    },
    quantityInStock: {
      type: Number,
      min: 0,
      default: 0,
    },
    reorderLevel: {
      type: Number,
      default: 10,
    },
    status: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

// middleware to convert values into lowercase before sending to DB
ProductsSchema.pre("save", function (next) {
  this.product = this.product.toLowerCase();
  this.category = this.category.toLowerCase();
  this.status = this.status.toLowerCase();
  next();
});

// middleware to convert updated values into lowercase
ProductsSchema.pre("findOneAndUpdate", function (next) {
  // Access the update object
  const update = this.getUpdate();

  // Convert the relevant fields to lowercase, if they exist in the update
  if (update.product) {
    update.product = update.product.toLowerCase();
  }

  if (update.category) {
    update.category = update.category.toLowerCase();
  }

  if (update.status) {
    update.status = update.status.toLowerCase();
  }

  next();
});

const Products = mongoose.model("Products", ProductsSchema, "products");

export default Products;
