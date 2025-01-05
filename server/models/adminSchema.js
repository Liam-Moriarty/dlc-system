import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const AdminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      unique: [true, "Email is already used"],
      validate: [validator.isEmail, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      trim: true,
    },
    confirmPassword: {
      type: String,
      required: [true, "Confirmation password is required"],
      trim: true,
      validate: {
        validator: function (value) {
          return value === this.password;
        },
        message: "Passwords do not match",
      },
    },
    role: {
      type: String,
      required: true,
      trim: true,
    },
    passwordChangeDate: Date,
  },
  { timestamps: true }
);

// this is to hash the password in the database and hide/remove
// the confirm password into the database and response
AdminSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, 10);
    this.confirmPassword = undefined;
  }
  next();
});

// this is to hide/remove the password in response
// when the user get information or when passing the information
// into the frontend
AdminSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

// to check if the password been changed
AdminSchema.methods.verifyPassword = function (jwtTimestamp) {
  if (this.passwordChangeDate) {
    const convertDate = parseInt(this.passwordChangeDate.getTime() / 1000);
    return convertDate > jwtTimestamp;
  }

  return false;
};

// middleware to convert values into lowercase before sending to DB
AdminSchema.pre("save", function (next) {
  this.name = this.name.toLowerCase();
  this.username = this.username.toLowerCase();
  this.role = this.role.toLowerCase();
  next();
});

const Admin = mongoose.model("Admin", AdminSchema, "admin");
export default Admin;
