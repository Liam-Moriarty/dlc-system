import React, { Fragment, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

// COMPONENTS IMPORTS
import Submenu from "./Submenu";
import Tooltips from "../../components/Tooltip";

// OTHER LIBRARY PACKAGES
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";

// REACT ICONS IMPORTS
import { IoIosArrowBack } from "react-icons/io";
import { RxDashboard } from "react-icons/rx";
import { LuUsers2, LuUserPlus, LuUserCheck, LuTextQuote } from "react-icons/lu";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { IoDocumentTextOutline, IoCartOutline } from "react-icons/io5";
import { SlSettings } from "react-icons/sl";
import { MdMenu } from "react-icons/md";
import { TbInvoice } from "react-icons/tb";

const Sidebar = () => {
  let isTab = useMediaQuery({ query: "(max-width: 768px)" });
  const [isOpen, setIsOpen] = useState(isTab ? false : true);

  const Sidebar_animation = isTab
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
    if (isTab) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, [isTab]);

  const menuList = {
    salesDept: [
      { title: "sales department" },
      {
        category: "sales",
        name: "clients",
        icon: LuUsers2,
        menus: ["new-clients", "manage-clients"],
        menusIcons: [LuUserPlus, LuUserCheck],
      },
      {
        category: "sales",
        name: "quotes",
        icon: LuTextQuote,
        menus: ["quote-form", "documents"],
        menusIcons: [LiaFileInvoiceDollarSolid, IoDocumentTextOutline],
      },
    ],

    accountingDept: [
      { title: "accounting department" },
      {
        category: "accounting",
        name: "invoice",
        icon: IoCartOutline,
      },
      {
        category: "accounting",
        name: "orders",
        icon: TbInvoice,
      },
    ],
  };

  return (
    <div>
      <div
        onClick={() => setIsOpen(false)}
        className={`md:hidden fixed inset-0 max-h-screen z-[998] bg-black/50
          ${isOpen ? "block" : "hidden"}`}
      ></div>
      <motion.div
        variants={Sidebar_animation}
        initial={{ x: isTab ? -250 : 0 }}
        animate={isOpen ? "open" : "closed"}
        className="bg-secondary-bg shadow-xl z-[999] w-[16rem] max-w-[16rem]
        h-screen overflow-hidden md:relative fixed"
      >
        {/* LOGO */}
        <div className="flex items-center gap-3 font-medium border-b border-primary-borders py-3 mx-3">
          <img
            src="https://img.icons8.com/color/512/firebase.png"
            alt="logo-img"
            width={45}
          />
          <span className="text-xl whitespace-pre">DLC Corporation</span>
        </div>

        {/* MENU'S */}
        <div className="flex flex-col h-full">
          {/* First */}
          <ul
            className="whitespace-pre px-2.5 text-sm py-5 flex flex-col 
            gap-1 font-medium overflow-x-hidden scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-100 h-[100%]"
          >
            <li id="dashboard">
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

            <div className="border-y py-5 border-secondary-borders">
              {Object.keys(menuList).map((deptKey) => (
                <div key={deptKey} className={`${!isOpen ? "mb-10" : null}`}>
                  {menuList[deptKey].map((menu, index) => (
                    <Fragment key={index}>
                      {menu.title && (
                        <small
                          className={`pl-2 text-secondary-txt text-xs capitalize my-3 ${
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
          className="absolute w-fit h-fit z-50 right-2 bottom-5 cursor-pointer md:block hidden"
        >
          <IoIosArrowBack size={25} />
        </motion.div>
      </motion.div>

      {/* MENU IN MOBILE VIEW */}
      <div className="m-3 md:hidden" onClick={() => setIsOpen(true)}>
        <MdMenu size={25} />
      </div>
    </div>
  );
};

export default Sidebar;
