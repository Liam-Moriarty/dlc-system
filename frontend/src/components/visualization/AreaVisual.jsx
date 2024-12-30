import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import CustomToolTip from "./CustomToolTip";

const AreaVisual = ({ data, isLoading, error }) => {
  const tabletAndMobileView = React.memo(() =>
    useMediaQuery({ maxWidth: 1250 })
  );
  const theme = useSelector((state) => state.theme.mode);

  const getCursorColor = theme === "dark" ? "#1E2F29" : "#F3F4F6";
  const getXaxisColor = theme === "dark" ? "#E8F0E6" : "#1E1F24";

  const CustomAxisTick = ({ x, y, payload }) => {
    return (
      <text
        x={x}
        y={y}
        dy={16}
        textAnchor="middle"
        fill={getXaxisColor}
        className="text-sm sm:text-xs font-semibold uppercase lg:font-medium"
      >
        {payload.value}
      </text>
    );
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
      <AreaChart
        data={data}
        margin={{
          top: 20,
          right: 20,
          left: 20,
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="dateOfSales" tick={<CustomAxisTick />} />
        <YAxis
          yAxisId="left"
          axisLine={false}
          tickLine={false}
          tickCount={6}
          tick={{
            fill: getXaxisColor,
            fontSize: `${tabletAndMobileView ? "14px" : "16px"}`,
          }}
          tickFormatter={(number) => `₱${number.toLocaleString()}`}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          axisLine={false}
          tickLine={false}
          tickCount={6}
          tick={{
            fill: getXaxisColor,
            fontSize: `${tabletAndMobileView ? "14px" : "16px"}`,
          }}
          tickFormatter={(number) => `₱${number.toLocaleString()}`}
        />
        <Tooltip
          content={
            <CustomToolTip
              label1="Daily Completed Sales"
              label2="Daily Cancelled Sales"
            />
          }
          cursor={{ fill: getCursorColor }}
        />
        <Legend />
        <Area
          yAxisId="left"
          type="monotone"
          dataKey="totalDailyCompletedSales"
          name="Daily Sales"
          stackId="1"
          stroke="#8884d8"
          fill="#8884d8"
        />
        <Area
          yAxisId="right"
          type="monotone"
          dataKey="totalDailyCancelledSales"
          name="Cancel Transaction"
          stackId="1"
          stroke="#82ca9d"
          fill="#82ca9d"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaVisual;
