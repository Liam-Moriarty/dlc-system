import { LuUsers } from "react-icons/lu";
import { BsCart2, BsCreditCard2Front } from "react-icons/bs";
import { MdOutlineToday } from "react-icons/md";
import { BsCalendar4Week } from "react-icons/bs";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { RiAdminLine } from "react-icons/ri";
import { LuWarehouse } from "react-icons/lu";
import { CiExport } from "react-icons/ci";

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

  inventory: [
    { title: "Inventory" },
    {
      category: "inventory",
      url: "suppliers",
      name: "Supplier",
      icon: MdOutlinePhoneInTalk,
    },
    {
      category: "inventory",
      url: "movement",
      name: "Movement",
      icon: CiExport,
    },
    {
      category: "general",
      url: "products",
      name: "Products",
      icon: BsCart2,
    },
    // {
    //   category: "inventory",
    //   url: "inventory",
    //   name: "Inventory",
    //   icon: LuWarehouse,
    // },
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
  ],
};
