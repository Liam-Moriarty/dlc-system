import React from "react";
import { Tooltip } from "react-tooltip";

const Tooltips = ({ anchorSelect, content, place, isOpen }) => {
  return (
    <>
      {!isOpen && (
        <Tooltip
          anchorSelect={anchorSelect}
          content={content}
          place={place}
          style={{
            backgroundColor: "#54776A",
            color: "#E8F0E6",
            position: "fixed",
            zIndex: "999",
            textTransform: "capitalize",
          }}
        />
      )}
    </>
  );
};

export default Tooltips;
