import { LuUsers } from "react-icons/lu";
import { BsCart2, BsCreditCard2Front } from "react-icons/bs";
import { MdOutlineToday } from "react-icons/md";
import { BsCalendar4Week } from "react-icons/bs";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { LuCalendarCheck } from "react-icons/lu";
import { RiAdminLine } from "react-icons/ri";

export const menuList = {
  general: [
    { title: "General" },
    {
      category: "general",
      url: "paginatedClients",
      name: "Clients",
      icon: LuUsers,
    },
    {
      category: "general",
      url: "products",
      name: "Products",
      icon: BsCart2,
    },
    {
      category: "general",
      url: "transactions",
      name: "Transactions",
      icon: BsCreditCard2Front,
    },
    {
      category: "general",
      url: "admin",
      name: "Admin",
      icon: RiAdminLine,
    },
  ],

  reports: [
    { title: "Analytics" },
    {
      category: "analytics",
      url: "performance",
      name: "Performance",
      icon: MdOutlineToday,
    },
    {
      category: "analytics",
      url: "daily",
      name: "Daily",
      icon: MdOutlineToday,
    },
    {
      category: "analytics",
      url: "weeks",
      name: "Weeks",
      icon: BsCalendar4Week,
    },
    {
      category: "analytics",
      url: "months",
      name: "Months",
      icon: IoCalendarNumberOutline,
    },
    // {
    //   category: "analytics",
    //   url: "year",
    //   name: "Year",
    //   icon: LuCalendarCheck,
    // },
  ],
};
