import React from "react";

const SectionHeader = ({ title }) => {
  return (
    <div className="w-full h-auto flex items-center justify-center py-5 lg:py-2">
      <h1 className="text-xl xl:text-base sm:text-xs">{title}</h1>
    </div>
  );
};

export default SectionHeader;
