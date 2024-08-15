import { IoIosArrowBack } from "react-icons/io";
import { RxDashboard } from "react-icons/rx";
import { LuUsers2, LuUserPlus, LuUserCheck } from "react-icons/lu";
import { LuTextQuote } from "react-icons/lu";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { IoDocumentTextOutline } from "react-icons/io5";
import { SlSettings } from "react-icons/sl";
import { MdMenu } from "react-icons/md";
import Tooltips from "../../components/Tooltip";

export const menu = [
  { title: "Sales Department", icons: null },
  { title: "Clients", icons: <LuUsers2 /> },
  { title: "Quotes", icons: <LuTextQuote /> },
];

const subMenuList = [
  {
    title: "Sales Department",
    salesDept: [
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
  },

  // {
  //   title: "Accounting Department",
  //   accountingDept: [
  //     {
  //       category: "sales",
  //       name: "clients",
  //       icon: LuUsers2,
  //       menus: ["new-clients", "manage-clients"],
  //       menusIcons: [LuUserPlus, LuUserCheck],
  //     },
  //     {
  //       category: "sales",
  //       name: "quotes",
  //       icon: LuTextQuote,
  //       menus: ["quote-form", "documents"],
  //       menusIcons: [LiaFileInvoiceDollarSolid, IoDocumentTextOutline],
  //     },
  //   ],
  // },
];

const menuList = {
  salesDept: [
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
