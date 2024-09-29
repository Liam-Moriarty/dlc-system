import Products from "../../models/productsModel.js";

// GET ALL PRODUCTS
export const getProducts = async (req, res) => {
  try {
    const products = await Products.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE PRODUCTS
export const addProducts = async (req, res) => {
  const { product, category, description, price, status } = req.body;
  try {
    const products = await Products.create({
      product,
      category,
      description,
      price,
      status,
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
