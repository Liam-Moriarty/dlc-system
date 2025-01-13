import React from "react";
import TopPerformingProducts from "../components/visualization/TopPerformingProducts.jsx";
import LeastPerformingProducts from "../components/visualization/LeastPerformingProducts.jsx";
import SectionHeader from "../components/visualization/SectionHeader.jsx";

const Performance = () => {
  return (
    <div className="w-full h-full overflow-auto flex-1">
      <SectionHeader title="Top and Least Performing Products" />

      <div className="w-full h-auto p-2 flex justify-center gap-5 tems-center flex-col">
        {/* Top Performing Products */}
        <div className="flex flex-col items-center">
          <SectionHeader title="Top Performing Products" />
          <div className="w-[50rem] h-[30rem] xl:w-full xl:h-[20rem] p-5 default-container">
            <TopPerformingProducts />
          </div>
        </div>

        {/* Least Performing Products */}

        <div className="flex flex-col items-center">
          <SectionHeader title="Least Performing Products" />
          <div className="w-[50rem] h-[30rem] xl:w-full xl:h-[20rem] p-5 default-container">
            <LeastPerformingProducts />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Performance;
