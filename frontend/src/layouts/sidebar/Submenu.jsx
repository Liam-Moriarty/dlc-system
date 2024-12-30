import React, { memo, useCallback, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";
import Tooltips from "../../components/Tooltip";

const Submenu = React.memo(({ data, isOpen }) => {
  const { pathname } = useLocation();
  const [subMenuOpen, setSubMenuOpen] = useState(false);

  const handleSubMenuToggle = useCallback(
    () => setSubMenuOpen((prev) => !prev),
    []
  );

  return (
    <>
      {data.menus ? (
        <li
          id={`${data.name}`}
          className={`link ${subMenuOpen ? "active-secondary my-2" : ""}  
              ${
                pathname.includes(!data.name) &&
                "text-secondary-txt dark:text-secondary-txt-dark"
              }`}
          onClick={handleSubMenuToggle}
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
            isOpen={isOpen ? isOpen : null}
          />
        </li>
      ) : (
        <>
          <NavLink
            id={`${data.name}`}
            to={`${data.category}/${data.url}`}
            className="link capitalize cursor-pointer"
          >
            <data.icon size={23} className="min-w-max" />
            {data.name}
          </NavLink>

          <Tooltips
            anchorSelect={`#${data.name}`}
            content={`${data.name}`}
            place="right"
            isOpen={isOpen ? isOpen : null}
          />
        </>
      )}

      <motion.ul
        animate={
          subMenuOpen
            ? {
                height: "fit-content",
              }
            : {
                height: 0,
              }
        }
        className="flex flex-col text-xs font-normal overflow-hidden h-0"
      >
        {data.menus
          ? data.menus.map((menu, index) => (
              <li key={menu} id={`${menu}`}>
                <NavLink
                  to={`${data.category}/${data.url}/${menu}`}
                  className="link capitalize"
                >
                  {React.createElement(data.menusIcons[index], {
                    size: 23,
                    className: `min-w-max ${!isOpen ? "pl-0" : "pl-4"}`,
                  })}
                  {menu}
                </NavLink>
                <Tooltips
                  anchorSelect={`#${menu}`}
                  content={`${menu}`}
                  place="right"
                  isOpen={isOpen ? isOpen : null}
                />
              </li>
            ))
          : null}
      </motion.ul>
    </>
  );
});

export default Submenu;
