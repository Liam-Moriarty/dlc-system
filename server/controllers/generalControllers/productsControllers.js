import Products from "../../models/productsModel.js";

// GET ALL PRODUCTS
export const getProducts = async (req, res) => {
  try {
    const products = await Products.find({});
    const product = products.map((item) => ({
      ...item.toObject(),
      product: item.product.toLowerCase(),
      category: item.category.toLowerCase(),
      price: item.price.toLocaleString(),
      status: item.status.toLowerCase(),
    }));
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE PRODUCTS
export const addProducts = async (req, res) => {
  const { product, category, description, price, status, image } = req.body;

  try {
    if (!image) {
      return res.status(400).json({ message: "No images uploaded!" });
    }

    const products = await Products.create({
      product,
      category,
      description,
      price,
      status,
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
