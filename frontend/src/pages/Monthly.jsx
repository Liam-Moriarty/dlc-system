import React from "react";
import SectionHeader from "../components/visualization/SectionHeader";
import ComposedVisual from "../components/visualization/ComposedVisual";

const Monthly = () => {
  return (
    <div className="w-full h-full overflow-auto flex-1">
      <SectionHeader title="Sales of the Months" />

      <div className="w-full h-auto p-2 flex justify-center gap-5 xl:items-center xl:flex-col xl:gap-2">
        {/* Top Performing Products */}
        <div className="w-[70rem] h-[35rem] mb-20 xl:w-full xl:h-[20rem]">
          <ComposedVisual />
        </div>
      </div>
    </div>
  );
};

export default Monthly;
