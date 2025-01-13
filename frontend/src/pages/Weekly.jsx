import React from "react";
import SectionHeader from "../components/visualization/SectionHeader";
import LineVisual from "../components/visualization/LineVisual";

const Weekly = () => {
  return (
    <div className="w-full h-full overflow-auto flex-1">
      <SectionHeader title="Sales in last 7 Weeks" />

      <div className="w-full h-auto p-2 flex justify-center gap-5 xl:items-center xl:flex-col xl:gap-2">
        {/* Top Performing Products */}
        <div className="w-[70rem] h-[35rem] mb-20 xl:w-full xl:h-[20rem] p-5 default-container">
          <LineVisual />
        </div>
      </div>
    </div>
  );
};

export default Weekly;
