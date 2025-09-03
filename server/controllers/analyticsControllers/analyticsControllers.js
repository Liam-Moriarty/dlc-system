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

// Aggregation Call to get sales for November-December 2024 with fixed return values
export const getWeekSales = async (req, res) => {
  try {
    // Fixed date range: November 1, 2024 - December 31, 2024
    const startDate = new Date("2024-11-01T00:00:00.000Z");
    const endDate = new Date("2024-12-31T23:59:59.999Z");

    // Generate fixed weeks for Nov-Dec 2024
    const generateFixedWeeks = () => {
      const weeks = [];

      // Manually define the weeks for Nov-Dec 2024 using ISO week format
      const novDecWeeks = [
        "2024-44", // Week starting Oct 28 (includes Nov 1-3)
        "2024-45", // Week starting Nov 4
        "2024-46", // Week starting Nov 11
        "2024-47", // Week starting Nov 18
        "2024-48", // Week starting Nov 25
        "2024-49", // Week starting Dec 2
        "2024-50", // Week starting Dec 9
        "2024-51", // Week starting Dec 16
        "2024-52", // Week starting Dec 23 (includes Dec 29-31)
      ];

      novDecWeeks.forEach((weekString) => {
        weeks.push({
          saleDate: weekString,
          totalWeeklyCompletedSales: 0,
          totalWeeklyCancelledSales: 0,
        });
      });

      return weeks;
    };

    // Get actual sales data for Nov-Dec 2024
    const weekStats = await Transaction.aggregate([
      {
        $match: {
          saleDate: {
            $gte: startDate,
            $lte: endDate,
          },
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
          _id: "$week", // Group by week
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
    ]);

    // Create fixed weeks structure for Nov-Dec 2024
    const fixedWeeks = generateFixedWeeks();

    // Merge actual data with fixed structure
    const finalResult = fixedWeeks.map((fixedWeek) => {
      const actualWeek = weekStats.find(
        (week) => week.saleDate === fixedWeek.saleDate
      );
      return actualWeek || fixedWeek; // Use actual data if exists, otherwise use default
    });

    res.status(200).json(finalResult);
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
