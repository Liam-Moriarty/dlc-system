import Transaction from "../../models/transactionModel.js";

// TOP PERFORMING PRODUCTS
export const topProducts = async (req, res) => {
  try {
    const productStats = await Transaction.aggregate([
      { $match: { statusOrder: "completed" } },
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "productDetails",
          pipeline: [{ $project: { product: 1 } }],
        },
      },
      { $unwind: "$productDetails" },
      {
        $group: {
          _id: "$productDetails.product",
          totalProductSales: { $sum: "$total" },
          totalQuantitySold: { $sum: "$quantity" },
        },
      },
      { $sort: { totalProductSales: -1 } },
      { $limit: 5 },
      {
        $project: {
          _id: 0,
          name: "$_id",
          totalProductSales: 1,
          totalQuantitySold: 1,
        },
      },
    ]);

    res.status(200).json(productStats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LEAST PERFORMING PRODUCTS
export const leastProducts = async (req, res) => {
  try {
    const productStats = await Transaction.aggregate([
      { $match: { statusOrder: "completed" } },
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "productDetails",
          pipeline: [{ $project: { product: 1 } }],
        },
      },
      { $unwind: "$productDetails" },
      {
        $group: {
          _id: "$productDetails.product",
          totalProductSales: { $sum: "$total" },
          totalQuantitySold: { $sum: "$quantity" },
        },
      },
      { $sort: { totalProductSales: 1 } },
      { $limit: 5 },
      {
        $project: {
          _id: 0,
          name: "$_id",
          totalProductSales: 1,
          totalQuantitySold: 1,
        },
      },
    ]);

    res.status(200).json(productStats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
