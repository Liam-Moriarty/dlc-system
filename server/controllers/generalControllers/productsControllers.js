import mongoose from "mongoose";
import Products from "../../models/productsModel.js";
import Client from "../../models/clientsModel.js";
import { validationResult } from "express-validator";

// GET PAGINATED PRODUCTS
export const getPaginatedProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    const startIndex = (page - 1) * limit;
    const totalItems = await Products.countDocuments();

    const products = await Products.find()
      .skip(startIndex)
      .limit(limit)
      .sort({ product: 1 });

    const product = products.map((item) => ({
      ...item.toObject(),
    }));

    res.json({
      totalItems,
      currentPage: page,
      totalPages: Math.ceil(totalItems / limit),
      product,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL PRODUCTS
export const getProducts = async (req, res) => {
  try {
    const products = await Products.find({}).sort({ product: 1 });

    const product = products.map((item) => ({
      ...item.toObject(),
      product: item.product.toLowerCase(),
      category: item.category.toLowerCase(),
      status: item.status.toLowerCase(),
    }));

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE PRODUCTS
export const addProducts = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { image, ...productData } = req.body;
    if (!image) {
      return res.status(400).json({ message: "No images uploaded!" });
    }

    const products = await Products.create({
      ...productData,
      image,
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE PRODUCTS
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const products = await Products.findByIdAndDelete(id);

    // check if we didnt find id
    if (!products) {
      return res.status(404).json({ error: "No such products" });
    }

    res.status(200).json({ message: "Product deleted successfully! : ", id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE PRODUCTS
export const updateProducts = async (req, res) => {
  const { id } = req.params;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "No such products found" });
    }

    const products = await Products.findByIdAndUpdate(id, { ...req.body });

    if (!products) {
      return res.status(400).json({ error: "No such products found" });
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// export const getUniqueProducts = async (req, res) => {
//   try {
//     const uniqueProducts = await Products.distinct("product");
//     const lowerCaseProducts = uniqueProducts.map((products) =>
//       products.toLowerCase()
//     );
//     res.status(200).json(lowerCaseProducts);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const getUniqueClients = async (req, res) => {
//   try {
//     const uniqueClients = await Client.distinct("company");
//     const lowerCaseClients = uniqueClients.map((clients) =>
//       clients.toLowerCase()
//     );
//     res.status(200).json(lowerCaseClients);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
