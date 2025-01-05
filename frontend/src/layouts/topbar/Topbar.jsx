import Tooltips from "../../components/Tooltip";
import ToggleTheme from "../../components/ToggleTheme";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { useState } from "react";

const Topbar = ({ title, description }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const username = window.localStorage.getItem("username");

  console.log(username);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="sticky z-50 w-full h-[5rem] md:h-[3rem] flex items-center justify-between p-3 mb-2 sm:mb-4">
      {/* Left Side */}
      <div className="w-full">
        <h1 className="font-semibold lg:text-sm">{title}</h1>
        <p className="text-secondary-txt dark:text-secondary-txt-dark font-medium capitalize lg:text-xs md:hidden">
          {description}
        </p>
      </div>

      {/* Right Side */}
      <div className="w-full flex justify-end items-center gap-4 py-2 px-4 lg:flex-col-reverse lg:items-end lg:gap-1 lg:py-0 lg:px-0">
        {/* Search */}
        {/* <input type="text" placeholder="Search" className="search lg:hidden" /> */}

        {/* Icons */}
        <div className="flex justify-evenly items-center gap-3">
          {/* <ToggleSwitch /> */}

          {username && (
            <p className="font-medium dark:text-secondary-txt-dark text-secondary-txt text-base">
              Welcome back {username}
            </p>
          )}

          <ToggleTheme />

          <Link
            to="/login"
            onClick={handleLogout}
            id="logout"
            className="font-medium text-sm inline-flex justify-center items-center whitespace-nowrap gap-1 lg:px-2 lg:text-xs px-4 py-2 dark:text-primary-txt-dark bg-transparent border border-primary-borders dark:border-primary-borders-dark text-primary-txt hover:dark:bg-secondary-accent-dark hover:bg-secondary-accent rounded-md"
          >
            Logout
          </Link>
          <Tooltips anchorSelect="#logout" content="Logout" place="bottom" />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
