import mongoose from "mongoose";
import Suppliers from "../../models/supplierSchema.js";

// UPDATE SUPPLIER
export const updateSupplier = async (req, res) => {
  const { id } = req.params;

  try {
    // check if the id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "No such supplier" });
    }

    const suppliers = await Suppliers.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );

    // check if client exists
    if (!suppliers) {
      return res.status(400).json({ error: "No such supplier" });
    }

    return res.status(200).json(suppliers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE SUPPLIER
export const deleteSupplier = async (req, res) => {
  const { id } = req.params;

  try {
    const supplier = await Suppliers.findByIdAndDelete(id);

    // fire this if we cant see any id
    if (!supplier) {
      return res.status(400).json({ message: "No such Supplier" });
    }

    res.status(200).json({ message: "Supplier deleted successfully", id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SUPPLIER
export const getPaginatedSuppliers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 30;

    const startIndex = (page - 1) * limit;
    const totalItems = await Suppliers.countDocuments();

    const suppliers = await Suppliers.find()
      .sort({ suppliers: 1 })
      .skip(startIndex)
      .limit(limit);

    const supplier = suppliers.map((item) => ({
      ...item.toObject(),
    }));

    res.json({
      totalItems,
      currentPage: page,
      totalPages: Math.ceil(totalItems / limit),
      supplier,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE SUPPLIERS
export const createSupplier = async (req, res) => {
  try {
    const { suppliers, location, email, contacts } = req.body;

    const emptyFields = [];
    const fields = ["suppliers", "contacts", "email", "location"];

    fields.forEach((field) => {
      if (!req.body[field]) {
        emptyFields.push(field);
      }
    });

    if (emptyFields.length > 0) {
      return res
        .status(400)
        .json({ message: "Please fill in all the fields", emptyFields });
    }

    // Email validation
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: "Please enter a valid email!!" });
    }

    // Contacts validation: Ensure it is 10 digits and starts with 9
    if (!/^9\d{9}$/.test(contacts)) {
      return res.status(400).json({
        message: "Contacts must be a 10-digit number starting with 9",
      });
    }

    const supplier = await Suppliers.create({
      suppliers,
      location,
      email,
      contacts,
    });
    res.status(200).json(supplier);
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      const value = error.keyValue[field];
      return res.status(400).json({
        message: `Email is already use try another one`,
      });
    }
    res.status(500).json({ message: error.message });
  }
};

// EXTRAS

// GET ALL SUPPLIERS DATA
export const getSupplier = async (req, res) => {
  try {
    const supplier = await Suppliers.aggregate([
      {
        $group: {
          _id: "$suppliers",
          originalId: { $first: "$_id" }, // Capture the original _id of the first document in the group
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
      {
        $project: {
          _id: "$originalId",
          suppliers: "$_id",
        },
      },
    ]);

    res.status(200).json(supplier);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
