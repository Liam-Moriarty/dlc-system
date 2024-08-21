import { LuUsers2, LuUserPlus, LuUserCheck, LuTextQuote } from "react-icons/lu";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { IoDocumentTextOutline, IoCartOutline } from "react-icons/io5";
import { TbInvoice } from "react-icons/tb";

export const menuList = {
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
