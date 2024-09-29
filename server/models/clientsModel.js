import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Company is required"],
      trim: true,
      minlength: [2, "Company name must be at least 2 characters"],
      maxlength: [50, "Company name cannot exceed 50 characters"],
    },
    contacts: {
      type: String,
      required: [true, "Phone number required"],
      trim: true,
      minlength: [10, "Contact number must be at least 10 characters"],
      maxlength: [10, "Contact number cannot exceed 10 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      unique: true,
      match: [/\S+@\S+\.\S+/, "Please provide a valid email address"],
    },
    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
      minlength: [2, "City name must be at least 2 characters"],
      maxlength: [50, "City name cannot exceed 50 characters"],
    },
  },
  { timestamps: true }
);

const Client = mongoose.model("Client", ClientSchema, "clients");
export default Client;
