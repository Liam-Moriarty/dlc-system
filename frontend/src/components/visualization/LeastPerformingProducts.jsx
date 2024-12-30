import React, { useMemo } from "react";
import { useGetLeastPerformingProductsQuery } from "../../api/analyticsApi/performanceApi";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";

const TopPerformingProducts = React.memo(() => {
  const tabletAndMobileView = React.memo(() =>
    useMediaQuery({ maxWidth: 1250 })
  );
  const theme = useSelector((state) => state.theme.mode);

  const { data, isLoading, error } = useGetLeastPerformingProductsQuery();

  const processedData = useMemo(() => {
    return (
      data?.map((item) => ({
        ...item,
        totalProductSales: item.totalProductSales || 0,
        totalQuantitySold: item.totalQuantitySold || 0,
      })) || []
    );
  }, [data]);

  const getCursorColor = theme === "dark" ? "#1E2F29" : "#F3F4F6";
  const getXaxisColor = theme === "dark" ? "#E8F0E6" : "#1E1F24";

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-4 dark:bg-primary-bg-dark bg-primary-bg flex flex-col gap-4 rounded-md">
          <p className="text-sm font-medium uppercase">{label}</p>
          <p className="text-sm font-medium">
            Product Revenue:{" "}
            <span className="ml-2">₱{payload[0].value.toLocaleString()}</span>
          </p>
          <p className="text-sm font-medium">
            Quantity Sold: <span className="ml-2">{payload[1].value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomAxisTick = ({ x, y, payload }) => {
    return (
      <text
        x={x}
        y={y}
        dy={16}
        textAnchor="middle"
        fill={getXaxisColor}
        className="text-sm sm:text-xs font-semibold uppercase"
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
      <BarChart
        data={processedData}
        margin={{
          top: 5,
          right: 10,
          left: 40,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tick={<CustomAxisTick />} />
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
        />
        <Tooltip
          content={<CustomTooltip />}
          cursor={{ fill: getCursorColor }}
        />
        <Legend />

        <Bar
          yAxisId="left"
          dataKey="totalProductSales"
          fill="#54776A"
          name="Product Revenue"
          activeBar={{ fill: "#466258" }}
        />
        <Bar
          yAxisId="right"
          dataKey="totalQuantitySold"
          fill="#4C6545"
          name="Quantity Sold"
          activeBar={{ fill: "#568b47" }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
});

export default TopPerformingProducts;
