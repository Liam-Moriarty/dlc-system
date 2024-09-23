import React, { Fragment, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import dummyLogo from "/images/obanai.png";

// COMPONENTS IMPORTS
import Submenu from "./Submenu";
import Tooltips from "../../components/Tooltip";
import { menuList } from "./SidebarMenus";

// OTHER LIBRARY PACKAGES
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";

// REACT ICONS IMPORTS
import { IoIosArrowBack } from "react-icons/io";
import { RxDashboard } from "react-icons/rx";
import { SlSettings } from "react-icons/sl";
import { MdMenu } from "react-icons/md";

const Sidebar = () => {
  // const tabletView = useMediaQuery({ maxWidth: 768 });
  const tabletAndMobileView = useMediaQuery({ maxWidth: 992 });
  const [isOpen, setIsOpen] = useState(tabletAndMobileView ? false : true);

  const Sidebar_animation = tabletAndMobileView
    ? {
        // mobile view
        open: {
          x: 0,
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          x: -250,
          width: 0,
          transition: {
            damping: 40,
            delay: 0.15,
          },
        },
      }
    : {
        // System view
        open: {
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          width: "4rem",
          transition: {
            damping: 40,
          },
        },
      };

  useEffect(() => {
    if (tabletAndMobileView) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, [tabletAndMobileView]);

  return (
    <div>
      <motion.div
        variants={Sidebar_animation}
        initial={{ x: tabletAndMobileView ? -250 : 0 }}
        animate={isOpen ? "open" : "closed"}
        className="dark:bg-secondary-bg-dark bg-secondary-bg shadow-xl z-[999] w-[16rem] max-w-[16rem]
        h-screen overflow-hidden relative lg:fixed"
      >
        {/* LOGO */}
        <div className="flex items-center gap-3 font-medium border-b border-primary-borders dark:border-primary-borders-dark py-3 mx-3">
          <img
            src={dummyLogo}
            alt="logo-img"
            className="w-10 h-10 object-cover rounded-full"
          />
          <h1 className="whitespace-pre">DLC Corporation</h1>
        </div>

        {/* MENU'S */}
        <div className="flex flex-col h-full">
          {/* First */}
          <ul
            className="whitespace-pre px-2.5 text-sm flex flex-col 
            gap-1 font-medium overflow-x-hidden scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-100 h-[100%] text-primary-txt dark:text-primary-txt-dark"
          >
            <li id="dashboard" className="py-2">
              <NavLink to="/" className={"link"}>
                <RxDashboard size={23} className="min-w-max" />
                Dashboard
              </NavLink>
              <Tooltips
                anchorSelect="#dashboard"
                content="Dashboard"
                place="right"
                isOpen={isOpen}
              />
            </li>

            <div className="border-y py-5 border-primary-borders dark:border-primary-borders-dark">
              {Object.keys(menuList).map((deptKey) => (
                <div key={deptKey} className={`${!isOpen ? "mb-10" : null}`}>
                  {menuList[deptKey].map((menu, index) => (
                    <Fragment key={index}>
                      {menu.title && (
                        <small
                          className={`pl-2 text-secondary-txt dark:text-secondary-txt-dark text-xs capitalize my-3 ${
                            !isOpen ? "hidden" : "block"
                          }`}
                        >
                          {menu.title}
                        </small>
                      )}

                      {/* Render the Submenu component for items with names */}
                      {menu.name && (
                        <div className="flex flex-col gap-1">
                          <Submenu data={menu} isOpen={isOpen} />
                        </div>
                      )}
                    </Fragment>
                  ))}
                </div>
              ))}
            </div>

            {/* SETTINGS */}

            <li id="settings">
              <NavLink to="/settings" className={"link"}>
                <SlSettings size={23} className="min-w-max" />
                Settings
              </NavLink>
              <Tooltips
                anchorSelect="#settings"
                content="Settings"
                place="right"
                isOpen={isOpen}
              />
            </li>
          </ul>
        </div>

        {/* CONTROLL BUTTON */}
        <motion.div
          animate={
            isOpen
              ? {
                  x: 0,
                  y: 0,
                  rotate: 0,
                }
              : {
                  x: -10,
                  y: -200,
                  rotate: 180,
                }
          }
          onClick={() => setIsOpen(!isOpen)}
          className="absolute w-fit h-fit z-50 right-2 bottom-5 cursor-pointer md:block"
        >
          <IoIosArrowBack size={25} />
        </motion.div>
      </motion.div>

      {/* MENU IN MOBILE VIEW */}
      <div
        className="m-5 lg:block hidden fixed top-0 left-0 z-50"
        onClick={() => setIsOpen(true)}
      >
        <MdMenu size={25} />
      </div>
    </div>
  );
};

export default Sidebar;
