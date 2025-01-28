import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { ClientSchema } from "dlc-shared-schema";

// this is to hash the password in the database and hide/remove
// the confirm password into the database and response
ClientSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, 10);
    this.confirmPassword = undefined;
  }
  next();
});

// this is to hide/remove the password in response
// when the user get information or when passing the information
// into the frontend
ClientSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

// to check if the password been changed
ClientSchema.methods.verifyPassword = function (jwtTimestamp) {
  if (this.passwordChangeDate) {
    const convertDate = parseInt(this.passwordChangeDate.getTime() / 1000);
    return convertDate > jwtTimestamp;
  }

  return false;
};

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
