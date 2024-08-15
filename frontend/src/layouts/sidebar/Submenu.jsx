import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";
import Tooltips from "../../components/Tooltip";

import { IoIosArrowBack } from "react-icons/io";
import { RxDashboard } from "react-icons/rx";
import { LuUsers2, LuUserPlus, LuUserCheck } from "react-icons/lu";
import { LuTextQuote } from "react-icons/lu";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { IoDocumentTextOutline } from "react-icons/io5";
import { SlSettings } from "react-icons/sl";
import { MdMenu } from "react-icons/md";

const Submenu = ({ data, isOpen }) => {
  const { pathname } = useLocation();
  const [subMenuOpen, setSubMenuOpen] = useState(false);

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
  };

  return (
    <>
      <li
        key={data.name}
        id={`${data.name}`}
        className={`link ${subMenuOpen ? "active-secondary" : ""}  
          ${pathname.includes(!data.name) && "text-secondary-txt"}`}
        onClick={() => setSubMenuOpen(!subMenuOpen)}
      >
        <data.icon size={23} className="min-w-max" />
        <p className="capitalize flex-1 ">{data.name}</p>
        <IoIosArrowDown
          className={` ${subMenuOpen && "rotate-180"} duration-200 `}
        />
        <Tooltips
          anchorSelect={`#${data.name}`}
          content={`${data.name}`}
          place="right"
          isOpen={isOpen}
        />
      </li>

      <motion.ul
        key={`${data.name}-submenu`}
        animate={
          subMenuOpen
            ? {
                height: "fit-content",
              }
            : {
                height: 0,
              }
        }
        className={`flex flex-col text-[0.8rem] font-normal overflow-hidden h-0 ${
          isOpen && "pl-4"
        }`}
      >
        {data.menus.map((menu, index) => (
          <li key={menu} id={`${menu}`}>
            <NavLink
              to={`${data.category}/${data.name}/${menu}`}
              className="link capitalize"
            >
              {React.createElement(data.menusIcons[index], {
                size: 18,
                className: "min-w-max",
              })}
              {menu}
            </NavLink>
            <Tooltips
              anchorSelect={`#${menu}`}
              content={`${menu}`}
              place="right"
              isOpen={isOpen}
            />
          </li>
        ))}
      </motion.ul>
    </>
  );
};

export default Submenu;
