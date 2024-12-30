import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import {
  useGetStatusCountQuery,
  useGetStatusRevenueQuery,
} from "../../api/analyticsApi/performanceApi";
import CustomToolTip from "./CustomToolTip";
import { useSelector } from "react-redux";

const PieVisual = () => {
  const { data, isLoading, error } = useGetStatusRevenueQuery();

  const tabletAndMobileView = React.memo(() =>
    useMediaQuery({ maxWidth: 1250 })
  );
  const theme = useSelector((state) => state.theme.mode);

  const getCursorColor = theme === "dark" ? "#1E2F29" : "#F3F4F6";
  const getXaxisColor = theme === "dark" ? "#E8F0E6" : "#1E1F24";

  const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
      console.log("Tooltip Data:", { payload, label });
    }
    if (active && payload && payload.length) {
      const { status, statusRevenue } = payload[0].payload; // Extract status and statusRevenue

      return (
        <div className="p-4 dark:bg-primary-bg-dark bg-primary-bg flex flex-col gap-4 rounded-md">
          <p className="text-sm font-medium uppercase">Status: {status}</p>
          <p className="text-sm font-medium uppercase">
            Revenue: ₱{statusRevenue.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return <p className="text-sm font-medium uppercase">Loading</p>;
  }

  if (error) {
    return (
      <p className="text-sm font-medium uppercase text-red-500">{error}</p>
    );
  }
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          dataKey="statusRevenue"
          name="Revenue of Status"
          isAnimationActive={true}
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        />
        <Tooltip
          content={<CustomTooltip />}
          cursor={{ fill: getCursorColor }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieVisual;
