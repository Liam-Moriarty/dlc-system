import Transaction from "../../models/transactionModel.js";

// TRY CODES

export const filterData = async (req, res) => {
  try {
    console.log(req.query);
    const transaction = await Transaction.find(req.query);
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
