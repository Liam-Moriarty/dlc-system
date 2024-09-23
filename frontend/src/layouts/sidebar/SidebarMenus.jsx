import { LuUsers } from "react-icons/lu";
import { BsCart2, BsCreditCard2Front } from "react-icons/bs";
import { MdOutlineToday } from "react-icons/md";
import { BsCalendar4Week } from "react-icons/bs";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { LuCalendarCheck } from "react-icons/lu";

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
  ],

  reports: [
    { title: "Reports" },
    {
      category: "reports",
      url: "daily",
      name: "Daily",
      icon: MdOutlineToday,
    },
    {
      category: "reports",
      url: "weekly",
      name: "Weekly",
      icon: BsCalendar4Week,
    },
    {
      category: "reports",
      url: "monthly",
      name: "Monthly",
      icon: IoCalendarNumberOutline,
    },
    {
      category: "reports",
      url: "yearly",
      name: "Yearly",
      icon: LuCalendarCheck,
    },
  ],
};
