import React, { useState } from "react";
import { LuSettings } from "react-icons/lu";
import Tooltips from "../../components/Tooltip";
import dummyImg from "/images/obanai.png";
import ToggleTheme from "../../components/ToggleTheme";

const Topbar = ({ title, description }) => {
  return (
    <div className="w-full h-[5rem] flex justify-between p-3 mb-8">
      {/* Left Side */}
      <div className="w-full">
        <h1 className="whitespace-pre font-semibold">{title}</h1>
        <p className="text-secondary-txt dark:text-secondary-txt-dark font-medium capitalize">
          {description}
        </p>
      </div>

      {/* Right Side */}
      <div className="w-full flex justify-end items-center gap-4 py-2 px-4">
        {/* Search */}
        <input type="text" placeholder="Search" className="search" />

        {/* Icons */}
        <div className="flex justify-evenly items-center gap-3">
          {/* <ToggleSwitch /> */}
          <ToggleTheme />

          <button id="topbar-settings" className="cursor-pointer">
            <LuSettings size={23} />
          </button>
          <Tooltips
            anchorSelect="#topbar-settings"
            content="Settings"
            place="bottom"
          />

          <img
            id="topbar-profile"
            src={dummyImg}
            alt="profile images"
            className="rounded-full h-[1.8rem] w-[1.8rem] object-contain cursor-pointer"
          />
          <Tooltips
            anchorSelect="#topbar-profile"
            content="Profile"
            place="bottom"
          />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
