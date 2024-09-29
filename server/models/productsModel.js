import mongoose from "mongoose";

const ProductsSchema = new mongoose.Schema(
  {
    product: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: [String],
      required: true,
      enum: [
        "Ice Cream Machines",
        "Refrigeration Units",
        "Food Warming Showcase",
        "Blenders and Mixers",
        "Food Heaters",
        "Coffee Equipment",
        "Beverage Equipment",
        "Ice Makers",
        "Sealing Equipment",
        "Grilling Equipment",
        "Steam Equipment",
        "Frying Equipment",
        "Cooking Equipment",
      ],
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
    status: {
      type: Boolean,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Products = mongoose.model("Products", ProductsSchema);

export default Products;
