import React from "react";
import TopPerformingProducts from "../components/visualization/TopPerformingProducts.jsx";
import LeastPerformingProducts from "../components/visualization/LeastPerformingProducts.jsx";
import SectionHeader from "../components/visualization/SectionHeader.jsx";

const Performance = () => {
  return (
    <div className="w-full h-full overflow-auto flex-1">
      <SectionHeader title="Top and Least Performing Products" />

      <div className="w-full h-auto p-2 flex justify-center gap-5 xl:items-center xl:flex-col xl:gap-2">
        {/* Top Performing Products */}
        <div className="w-[50rem] h-[30rem] mb-20 xl:w-full xl:h-[20rem]">
          <SectionHeader title="Top Performing Products" />
          <TopPerformingProducts />
        </div>

        {/* Least Performing Products */}

        <div className="w-[50rem] h-[30rem] mb-20 xl:w-full xl:h-[20rem]">
          <SectionHeader title="Least Performing Products" />
          <LeastPerformingProducts />
        </div>
      </div>
    </div>
  );
};

export default Performance;
