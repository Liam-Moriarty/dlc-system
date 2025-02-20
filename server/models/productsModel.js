import mongoose from "mongoose";
import { ProductsSchema } from "dlc-shared-schema";

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
