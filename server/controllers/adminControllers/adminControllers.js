import Admin from "../../models/adminSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Update User profile
export const updateAdmin = async (req, res) => {
  try {
    const { email, ...updateData } = req.body;

    // Email validation
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: "Please enter a valid email" });
    }

    const updateProfile = await Admin.findByIdAndUpdate(
      req.admin._id,
      { $set: { ...updateData, ...(email && { email }) } }, // Only update fields present in req.body
      { new: true }
    );

    res.status(200).json({ status: "Success", results: { updateProfile } });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: error.message || "Validation failed",
      });
    }

    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      const value = error.keyValue[field];
      return res.status(400).json({
        message: `The ${field} "${value}" is already in use. Please use a different ${field}.`,
      });
    }

    res.status(400).json({
      status: "Failed",
      message: error.message,
    });
  }
};

// Change Password in the Profile Page
export const changePassword = async (req, res) => {
  try {
    // Validate if the body contains all required fields
    const { currentPassword, password, confirmPassword } = req.body;

    if (!currentPassword || !password || !confirmPassword) {
      return res.status(400).json({
        status: "Failed",
        message: "All fields are required!!",
      });
    }

    const admin = await Admin.findById(req.admin._id).select("+password");

    const verified = await bcrypt.compare(
      req.body.currentPassword,
      admin.password
    );

    if (!admin || !verified) {
      return res.status(400).json({
        status: "Failed",
        message: "Admin not found or invalid current password",
      });
    }

    if (req.body.password !== req.body.confirmPassword) {
      return res.status(400).json({
        status: "Failed",
        message: "Password didn't match",
      });
    }

    admin.password = req.body.password;
    admin.confirmPassword = req.body.confirmPassword;

    await admin.save();

    const jwtToken = jwt.sign({ id: admin._id }, process.env.SECRET, {
      expiresIn: "30d",
    });

    res.status(200).json({ id: "Success", results: { jwtToken } });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "Failed to update password please try again",
    });
  }
};

// Paginated Admin
export const paginatedAdmin = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    const startIndex = (page - 1) * limit;
    const totalItems = await Admin.countDocuments();

    const admins = await Admin.find()
      .sort({ name: 1 })
      .skip(startIndex)
      .limit(limit);

    // mapping thru the admin documents and excluding
    // password, id and updatedAt fields
    const admin = admins
      .map((item) => {
        const { password, updatedAt, ...adminWithoutPassword } =
          item.toObject();
        return {
          ...adminWithoutPassword,
          name: item.name.toLowerCase(),
          username: item.username.toLowerCase(),
          email: item.email.toLowerCase(),
          role: item.role.toLowerCase(),
        };
      })
      .sort((a, b) => a.name.localeCompare(b.name));

    res.status(200).json({
      status: "Success",
      results: {
        totalItems,
        currentPage: page,
        totalPages: Math.ceil(totalItems / limit),
        admin,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "Failed to show admin data please try again",
    });
  }
};

// Delete Admin
export const deleteAdmin = async (req, res) => {
  const { id } = req.params;
  try {
    const admin = await Admin.findByIdAndDelete(id);

    if (!admin) {
      return res.status(404).json({ message: "No such admin" });
    }

    res.status(200).json({ status: "Success", results: admin });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Failed to delete admin please try again",
    });
  }
};

// Get All Admins
export const getAdmins = async (req, res) => {
  try {
    const admin = await Admin.find({});

    res.status(200).json({ status: "Success", results: admin });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "Failed to show admin data please try again",
    });
  }
};
