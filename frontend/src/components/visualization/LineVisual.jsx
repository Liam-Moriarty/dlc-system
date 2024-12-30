import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useGetWeeksStatsQuery } from "../../api/analyticsApi/performanceApi";
import CustomToolTip from "./CustomToolTip";

const LineVisual = () => {
  const { data, isLoading, error } = useGetWeeksStatsQuery();

  const tabletAndMobileView = React.memo(() =>
    useMediaQuery({ maxWidth: 1250 })
  );
  const theme = useSelector((state) => state.theme.mode);

  const processedData = useMemo(() => {
    return (
      data?.map((item) => ({
        ...item,
        weekSales: item.weekSales || 0,
        weekLabel: item.weekLabel || "",
      })) || []
    );
  }, [data]);

  const getCursorColor = theme === "dark" ? "#1E2F29" : "#F3F4F6";
  const getXaxisColor = theme === "dark" ? "#E8F0E6" : "#1E1F24";

  const CustomizedCompleteLabel = ({ x, y, value, fill }) => {
    return (
      <text
        x={x}
        y={y}
        dy={-4}
        fill={fill}
        textAnchor="middle"
        className="text-sm sm:text-xs font-semibold uppercase lg:font-medium"
      >
        {value}
      </text>
    );
  };

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
      <LineChart
        data={processedData}
        margin={{
          top: 20,
          right: 30,
          left: 30,
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="saleDate" tick={<CustomAxisTick />} />
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
              label1="Week Completed Sales"
              label2="Week Cancelled Sales"
            />
          }
          cursor={{ fill: getCursorColor }}
        />
        <Legend />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="totalWeeklyCompletedSales"
          name="Week Revenue"
          stroke="#8884d8"
          label={<CustomizedCompleteLabel fill="#4caf50" />}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="totalWeeklyCancelledSales"
          name="Cancel Transactions"
          stroke="#82ca9d"
          label={<CustomizedCompleteLabel fill="#f44336" />}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineVisual;
