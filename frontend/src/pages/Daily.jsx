import React, { useEffect, useState } from "react";
import Datepicker from "../components/Datepicker.jsx";
import { useCreateDynamicDatesMutation } from "../api/analyticsApi/performanceApi.js";
import SectionHeader from "../components/visualization/SectionHeader.jsx";
import AreaVisual from "../components/visualization/AreaVisual.jsx";

const Daily = () => {
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

  const handleSubmit = async (daterange) => {
    try {
      await createDynamicDates(daterange);
    } catch (error) {
      console.error("Error fetching daily sales:", error);
    }
  };

  return (
    <div className="w-full overflow-auto flex-1">
      {/* Header */}
      <Datepicker onSubmit={handleSubmit} />

      {/* Content */}
      <div className="w-full h-auto p-2 flex justify-center xl:items-center">
        <div className="w-auto h-auto xl:w-full xl:h-[20rem]">
          <SectionHeader title="Daily Sales" />
          <div className="w-[70rem] h-[35rem] xl:w-full xl:h-[30rem]">
            <AreaVisual data={data} isLoading={isLoading} error={error} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Daily;
