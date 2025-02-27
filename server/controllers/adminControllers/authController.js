import Admin from "../../models/adminSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Sign Up Admin
export const signUp = async (req, res) => {
  try {
    const {
      name,
      username,
      email,
      password,
      confirmPassword,
      role,
      profilePic,
    } = req.body;

    const emptyFields = [];

    if (!name) {
      emptyFields.push("name");
    }
    if (!username) {
      emptyFields.push("username");
    }
    if (!email) {
      emptyFields.push("email");
    }
    if (!password) {
      emptyFields.push("password");
    }
    if (!confirmPassword) {
      emptyFields.push("confirmPassword");
    }
    if (!role) {
      emptyFields.push("role");
    }
    if (!profilePic) {
      emptyFields.push("profilePic");
    }

    if (emptyFields.length > 0) {
      return res
        .status(400)
        .json({ message: "Please fill in all the fields", emptyFields });
    }

    if (!profilePic) {
      return res.status(400).json({ message: "No images uploaded!" });
    }

    const admin = await Admin.create({
      name,
      username,
      email,
      password,
      confirmPassword,
      role,
      profilePic,
    });

    // Implement jwt to the header and payload
    const jwtToken = jwt.sign({ id: admin._id }, process.env.SECRET, {
      expiresIn: "30d",
    });

    res.status(200).json({ status: "Success", results: { admin, jwtToken } });
  } catch (error) {
    if (error.name === "ValidationError") {
      if (error.errors.confirmPassword) {
        return res.status(400).json({ message: "password didn't match" });
      }
    }

    if (error.name === "ValidationError") {
      if (error.errors.email) {
        return res.status(400).json({ message: "Please enter a valid email" });
      }
    }

    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      const value = error.keyValue[field];
      return res.status(400).json({
        message: `Email is already use try another one`,
      });
    }
    res.status(400).json({ message: error.message });
  }
};

// Login Admin
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validation to check if the input is empty or not
    if (!username || !password) {
      throw Error("Username or Password is empty");
    }

    const admin = await Admin.findOne({ username }).select("+password");

    if (!admin) {
      throw Error("Username doesn't exist");
    }

    const verified = await bcrypt.compare(password, admin.password);

    if (!verified) {
      throw Error("Invalid password");
    }

    const jwtToken = jwt.sign({ id: admin._id }, process.env.SECRET, {
      expiresIn: "30d",
    });

    res.status(200).json({
      username: admin.username,
      result: jwtToken,
      profilePic: admin.profilePic,
      name: admin.name,
      role: admin.role,
      name: admin.name,
    });
  } catch (error) {
    res.status(500).json({ status: "Failed", message: error.message });
  }
};

// Protect Data
export const protectData = async (req, res, next) => {
  // check if the client is authorized to see the data
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ status: "Failed", message: "Access Token is missing" });
    }

    jwt.verify(token, process.env.SECRET, async (err, decodedToken) => {
      if (err) {
        return res
          .status(401)
          .json({ status: "Failed", message: "Invalid Token" });
      }

      console.log("decoded token", decodedToken.iat);

      const admin = await Admin.findById(decodedToken.id);

      if (!admin) {
        return res
          .status(401)
          .json({ status: "Failed", message: "Admin doesn't exist" });
      }

      const passwordVerified = admin.verifyPassword(decodedToken.iat);

      if (passwordVerified) {
        return res.status(401).json({
          status: "Failed",
          message: "User change password please login again",
        });
      }

      req.admin = admin;
      next();
    });
  } else {
    return res.status(401).json({ status: "Failed", message: "Unauthorized" });
  }
};
