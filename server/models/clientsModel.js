import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
      trim: true,
    },
    contacts: {
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
    city: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

// middleware to convert values into lowercase before sending to DB
ClientSchema.pre("save", function (next) {
  this.company = this.company.toLowerCase();
  this.city = this.city.toLowerCase();
  next();
});

// middleware to convert updated values into lowercase
ClientSchema.pre("findOneAndUpdate", function (next) {
  // Access the update object
  const update = this.getUpdate();

  // Convert the relevant fields to lowercase, if they exist in the update
  if (update.company) {
    update.company = update.company.toLowerCase();
  }

  if (update.city) {
    update.city = update.city.toLowerCase();
  }

  next();
});

const Client = mongoose.model("Client", ClientSchema, "clients");
export default Client;
