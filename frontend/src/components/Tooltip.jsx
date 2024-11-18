import React from "react";
import { useSelector } from "react-redux";
import { Tooltip } from "react-tooltip";

const Tooltips = ({ anchorSelect, content, place, isOpen }) => {
  const theme = useSelector((state) => state.theme.mode);

  return (
    <>
      {!isOpen && (
        <Tooltip
          anchorSelect={anchorSelect}
          content={content}
          place={place}
          style={{
            backgroundColor: `${theme === "light" ? "#E7E8EC" : "#54776A"}`,
            color: `${theme === "light" ? "#1E1F24" : "#E8F0E6"}`,
            position: "fixed",
            zIndex: "999",
            textTransform: "capitalize",
            padding: "0.2rem 0.5rem",
            fontSize: "0.8rem",
            fontFamily: "Inter",
            fontWeight: "600",
            maxWidth: "15rem",
          }}
        />
      )}
    </>
  );
};

export default Tooltips;
