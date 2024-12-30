import Transaction from "../../models/transactionModel.js";
import Client from "../../models/clientsModel.js";

export const numberOfClients = async (req, res) => {
  try {
    const clientCount = await Client.aggregate([
      {
        $group: {
          _id: "$company",
        },
      },
      {
        $count: "totalNumberOfClients",
      },
    ]);

    res.status(200).json(clientCount);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Sales for Today
export const latestSale = async (req, res) => {
  // Get the current date in UTC
  const now = new Date();

  // Adjust for Philippines Time (UTC+8)
  const offset = 8 * 60; // 8 hours in minutes

  // Calculate the start of the current day (midnight) in local timezone (UTC+8)
  const startOfDay = new Date(now);
  startOfDay.setHours(0, 0, 0, 0);
  startOfDay.setMinutes(startOfDay.getMinutes() + offset); // Apply the timezone offset

  // Calculate the end of the current day (23:59:59) in local timezone (UTC+8)
  const endOfDay = new Date(now);
  endOfDay.setHours(23, 59, 59, 999);
  endOfDay.setMinutes(endOfDay.getMinutes() + offset); // Apply the timezone offset

  try {
    const salesToday = await Transaction.aggregate([
      {
        $match: {
          saleDate: { $gte: startOfDay, $lte: endOfDay },
          statusOrder: "completed",
        },
      },
      {
        $group: {
          _id: null,
          totalSalesToday: {
            $sum: "$total",
          },
        },
      },
      {
        $project: {
          _id: 0,
          totalSalesToday: 1,
          dateToday: {
            $dateToString: {
              format: "%B %d %Y",
              date: startOfDay,
            },
          },
        },
      },
    ]);

    res.status(200).json(salesToday);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Status Count
export const statusCount = async (req, res) => {
  try {
    const statsCount = await Transaction.aggregate([
      {
        $group: {
          _id: "$statusOrder",
          countOfAllStatus: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
      {
        $project: {
          _id: 0,
          countOfAllStatus: 1,
          status: "$_id",
        },
      },
    ]);

    res.status(200).json(statsCount);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Status Revenue
export const statusRevenue = async (req, res) => {
  try {
    const statsRevenue = await Transaction.aggregate([
      {
        $group: {
          _id: "$statusOrder",
          statusRevenue: {
            $sum: "$total",
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
      {
        $project: {
          _id: 0,
          statusRevenue: 1,
          status: "$_id",
        },
      },
    ]);

    res.status(200).json(statsRevenue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
