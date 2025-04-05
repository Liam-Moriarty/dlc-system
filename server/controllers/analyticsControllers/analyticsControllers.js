import Transaction from "../../models/transactionModel.js";

// MONTH PROBLEM
export const getMonthSales = async (req, res) => {
  try {
    const monthsStats = await Transaction.aggregate([
      {
        $match: { statusOrder: { $in: ["completed", "pending", "cancelled"] } },
      },
      {
        $project: {
          saleDate: 1,
          monthYear: {
            $dateToString: {
              format: "%B %Y", // Full name of month and year
              date: "$saleDate",
            },
          },
          total: 1,
          statusOrder: 1,
        },
      },
      {
        $group: {
          _id: "$monthYear",
          totalMonthlyCompletedSales: {
            $sum: {
              $cond: [{ $eq: ["$statusOrder", "completed"] }, "$total", 0],
            },
          },
          totalMonthlyPendingSales: {
            $sum: {
              $cond: [{ $eq: ["$statusOrder", "pending"] }, "$total", 0],
            },
          },
          totalMonthlyCancelledSales: {
            $sum: {
              $cond: [{ $eq: ["$statusOrder", "cancelled"] }, "$total", 0],
            },
          },
          firstSaleDate: { $first: "$saleDate" },
        },
      },
      { $sort: { firstSaleDate: 1 } },
      { $limit: 12 },
      {
        $project: {
          _id: 0,
          monthName: "$_id",
          totalMonthlyCompletedSales: 1,
          totalMonthlyPendingSales: 1,
          totalMonthlyCancelledSales: 1,
        },
      },
    ]);

    res.status(200).json(monthsStats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Aggregation Call to get sales in last 7 weeks
export const getWeekSales = async (req, res) => {
  try {
    const today = new Date();
    const firstDayOfCurrentWeek = new Date(
      today.setDate(today.getDate() - today.getDay() + 1)
    ); // Start of this week
    const sevenWeeksAgo = new Date(firstDayOfCurrentWeek);
    sevenWeeksAgo.setDate(sevenWeeksAgo.getDate() - 7 * 7); // Go back 7 weeks

    const weekStats = await Transaction.aggregate([
      {
        $match: {
          saleDate: { $gte: sevenWeeksAgo },
          statusOrder: { $in: ["completed", "cancelled"] },
        },
      },
      {
        $project: {
          week: {
            $dateToString: {
              format: "%Y-%U", // Extracts the week in "Year-Week" format
              date: "$saleDate",
            },
          },
          total: 1,
          statusOrder: 1,
        },
      },
      {
        $group: {
          _id: "$week", // Group by week instead of the raw date
          totalWeeklyCompletedSales: {
            $sum: {
              $cond: [{ $eq: ["$statusOrder", "completed"] }, "$total", 0],
            },
          },
          totalWeeklyCancelledSales: {
            $sum: {
              $cond: [{ $eq: ["$statusOrder", "cancelled"] }, "$total", 0],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          saleDate: "$_id", // Rename _id back to saleDate
          totalWeeklyCompletedSales: 1,
          totalWeeklyCancelledSales: 1,
        },
      },
      {
        $sort: { saleDate: 1 }, // Sort by the week in descending order
      },
      {
        $limit: 7, // Limit to the last 7 weeks
      },
    ]);

    res.status(200).json(weekStats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Aggregation Call to get dynamic daily sales
export const getDailySales = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;

    const now = new Date();
    const defaultEndDate = now.toISOString().split("T")[0];
    const defaultStartDate = new Date();
    defaultStartDate.setDate(now.getDate() - 7);
    const formattedStartDate = defaultStartDate.toISOString().split("T")[0];

    const start = startDate ? startDate : formattedStartDate;
    const end = endDate ? endDate : defaultEndDate;

    const dailySales = await Transaction.aggregate([
      {
        $match: {
          saleDate: {
            $gte: new Date(start),
            $lte: new Date(end),
          },
          statusOrder: { $in: ["completed", "cancelled"] },
        },
      },
      {
        $group: {
          _id: "$saleDate",
          totalDailyCompletedSales: {
            $sum: {
              $cond: [{ $eq: ["$statusOrder", "completed"] }, "$total", 0],
            },
          },
          totalDailyCancelledSales: {
            $sum: {
              $cond: [{ $eq: ["$statusOrder", "cancelled"] }, "$total", 0],
            },
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
          dateOfSales: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$_id",
            },
          },
          totalDailyCompletedSales: 1,
          totalDailyCancelledSales: 1,
        },
      },
    ]);

    if (!dailySales.length) {
      return res
        .status(404)
        .json({ message: "No sales data found for the specified date range." });
    }

    res.status(200).json(dailySales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
