import React, { useEffect, useState } from "react";
import AreaVisual from "./visualization/AreaVisual";
import TopPerformingProducts from "./visualization/TopPerformingProducts";
import ComposedVisual from "./visualization/ComposedVisual";
import PieVisual from "./visualization/PieVisual";
import { useCreateDynamicDatesMutation } from "../api/analyticsApi/performanceApi";

const DashboardAnalytics = () => {
  const [createDynamicDates, { data, isLoading, error }] =
    useCreateDynamicDatesMutation();

  const [daterange, setDaterange] = useState({
    startDate: "2024-12-01", // Will trigger default value in backend
    endDate: "2024-12-14", // Will trigger default value in backend
  });

  useEffect(() => {
    // Fetch data on initial load with default values
    const fetchDefaultData = async () => {
      try {
        await createDynamicDates(daterange); // Fetch data with default date range
      } catch (error) {
        console.error("Error fetching default daily sales:", error);
      }
    };

    fetchDefaultData();
  }, []); // Only runs on initial mount

  return (
    <>
      <div className="rounded-lg h-auto col-span-2 lg:col-span-1 flex justify-center default-container">
        <div className="h-[20rem] w-[60rem] xxl:w-[40rem] xxl:h-[15rem]">
          <AreaVisual data={data} isLoading={isLoading} error={error} />
        </div>
      </div>

      <div className="rounded-lg col-span-1 flex justify-center default-container">
        <div className="h-[20rem] w-[30rem] xxl:w-[20rem] xxl:h-[15rem]">
          <TopPerformingProducts />
        </div>
      </div>

      <div className="rounded-lg h-auto col-span-2 lg:col-span-1 flex justify-center default-container">
        <div className="h-[20rem] w-[60rem] xxl:w-[40rem] xxl:h-[15rem]">
          <ComposedVisual />
        </div>
      </div>

      <div className="rounded-lg h-auto col-span-1 flex justify-center default-container">
        <div className="h-[20rem] w-[30rem] xxl:w-[20rem] xxl:h-[15rem]">
          <PieVisual />
        </div>
      </div>
    </>
  );
};

export default DashboardAnalytics;
