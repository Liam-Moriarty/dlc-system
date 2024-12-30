import React from "react";

const CustomToolTip = ({ active, payload, label, label1, label2, label3 }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 dark:bg-primary-bg-dark bg-primary-bg flex flex-col gap-4 rounded-md lg:p-1 lg:gap-2">
        <p className="text-sm font-medium uppercase lg:text-xs">{label}</p>
        <p className="text-sm font-medium lg:text-xs">
          {label1}:{" "}
          <span className="ml-2">₱{payload[0].value.toLocaleString()}</span>
        </p>
        <p className="text-sm font-medium lg:text-xs">
          {label2}:{" "}
          <span className="ml-2">₱{payload[1].value.toLocaleString()}</span>
        </p>
        {label3 && (
          <p className="text-sm font-medium lg:text-xs">
            {label3}:{" "}
            <span className="ml-2">₱{payload[1].value.toLocaleString()}</span>
          </p>
        )}
      </div>
    );
  }
  return null;
};

export default CustomToolTip;
