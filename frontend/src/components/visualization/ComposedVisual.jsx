import React, { useMemo } from "react";
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useGetMonthsStatsQuery } from "../../api/analyticsApi/performanceApi";
import { useSelector } from "react-redux";
import CustomToolTip from "./CustomToolTip";

const ComposedVisual = () => {
  const { data, isLoading, error } = useGetMonthsStatsQuery();

  const tabletAndMobileView = React.memo(() =>
    useMediaQuery({ maxWidth: 1250 })
  );

  const theme = useSelector((state) => state.theme.mode);

  const processedData = useMemo(() => {
    return (
      data?.map((item) => ({
        ...item,
        totalMonthlyCompletedSales: item.totalMonthlyCompletedSales || 0,
        totalMonthlyPendingSales: item.totalMonthlyPendingSales || 0,
        totalMonthlyCancelledSales: item.totalMonthlyCancelledSales || 0,
        monthName: item.monthName || "",
      })) || []
    );
  }, [data]);

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
      <ComposedChart
        data={processedData}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 40,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="monthName" tick={<CustomAxisTick />} />
        <YAxis
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
              label1="Month Completed Sales"
              label2="Month Cancelled Sales"
              label3="Month Pending Sales"
            />
          }
          cursor={{ fill: getCursorColor }}
        />
        <Legend />
        <Area
          type="monotone"
          dataKey="totalMonthlyCompletedSales"
          name="Month Revenue"
          fill="#8884d8"
          stroke="#8884d8"
        />
        <Bar
          dataKey="totalMonthlyCancelledSales"
          name="Cancel Sales"
          barSize={20}
          fill="#413ea0"
        />
        <Line
          type="monotone"
          dataKey="totalMonthlyPendingSales"
          name="Pending Sales"
          stroke="#ff7300"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default ComposedVisual;
