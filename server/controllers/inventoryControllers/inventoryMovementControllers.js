import mongoose from "mongoose";
import Movements from "../../models/inventoryMovementsSchema.js";

// UPDATE INVENTORY
export const updateInventoryMovement = async (req, res) => {
  const { id } = req.params;

  try {
    // check if the id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "No such movement" });
    }

    const movement = await Movements.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );

    // check if movement exists
    if (!movement) {
      return res.status(400).json({ error: "No such movement" });
    }

    return res.status(200).json(movement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE INVENTORY
export const deleteInventoryMovements = async (req, res) => {
  const { id } = req.params;

  try {
    const movement = await Movements.findByIdAndDelete(id);

    // fire this if we cant see any id
    if (!movement) {
      return res.status(400).json({ message: "No such movement" });
    }

    res.status(200).json({ message: "Movement deleted successfully", id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET PAGINATED INVENTORY
export const getPaginatedMovement = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 30;

    const startIndex = (page - 1) * limit;
    const totalItems = await Movements.countDocuments();

    const movements = await Movements.find()
      .sort({ createdAt: -1 })
      .populate("productDetails", "product")
      .populate("suppliersId", "suppliers")
      .skip(startIndex)
      .limit(limit);

    const movement = movements.map((item) => ({
      ...item.toObject(),
    }));

    res.json({
      totalItems,
      currentPage: page,
      totalPages: Math.ceil(totalItems / limit),
      movement,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE INVENTORY
export const createInventoryMovements = async (req, res) => {
  try {
    const {
      suppliersId,
      productDetails,
      type,
      movementStatus,
      quantity,
      location,
      createdBy,
    } = req.body;

    const emptyFields = [];
    const fields = [
      "suppliersId",
      "productDetails",
      "type",
      "quantity",
      "movementStatus",
      "location",
      "createdBy",
    ];

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

    const movement = await Movements.create({
      suppliersId,
      productDetails,
      type,
      quantity,
      movementStatus,
      location,
      createdBy,
    });
    res.status(200).json(movement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
