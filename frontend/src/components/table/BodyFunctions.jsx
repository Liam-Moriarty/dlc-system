import dayjs from "dayjs";
import { FaLaptopCode } from "react-icons/fa";
import {
  AiOutlineDollarCircle,
  AiOutlineLineChart,
  AiOutlineUsergroupAdd,
  AiOutlineQuestionCircle,
} from "react-icons/ai";
import { LiaUserTieSolid } from "react-icons/lia";

const getIndicators = (column, items) => {
  const defaultIndicatorStyle =
    "p-2 rounded-xl flex justify-center items-center capitalize max-w-22 lg:p-1.5 text-primary-txt-dark text-center ";

  if (column === "quantityInStock") {
    return items.reorderLevel > items.quantityInStock
      ? "text-red-500 dark:text-red-500 font-bold"
      : "text-green-500 dark:text-green-500 font-bold";
  }

  if (column === "currentStock") {
    return items.lowStockThreshold > items.currentStock
      ? "text-red-500 dark:text-red-500 font-bold"
      : "text-green-500 dark:text-green-500 font-bold";
  }

  if (column === "status") {
    switch (items.status) {
      case "functional":
        return `${defaultIndicatorStyle} bg-green-500`;
      case "defective":
        return `${defaultIndicatorStyle} bg-red-500`;
      case "repair":
        return `${defaultIndicatorStyle} bg-orange-500`;
      case "discontinued":
        return `${defaultIndicatorStyle} bg-gray-500`;
      case "expired":
        return `${defaultIndicatorStyle} bg-purple-500`;
    }
  }

  if (column === "type") {
    return items.type === "ingoing"
      ? `${defaultIndicatorStyle} bg-green-500`
      : `${defaultIndicatorStyle} bg-red-500`;
  }

  if (column === "movementStatus") {
    switch (items.movementStatus) {
      case "purchase":
        return `${defaultIndicatorStyle} bg-green-500`;
      case "return":
        return `${defaultIndicatorStyle} bg-red-500`;
      case "transfer":
        return `${defaultIndicatorStyle} bg-blue-500`;
    }
  }

  if (column === "statusOrder") {
    switch (items.statusOrder) {
      case "completed":
        return `${defaultIndicatorStyle} bg-green-500`;
      case "cancelled":
        return `${defaultIndicatorStyle} bg-red-500`;
      case "returned":
        return `${defaultIndicatorStyle} bg-blue-500`;
      case "pending":
        return `${defaultIndicatorStyle} bg-gray-500`;
    }
  }

  if (column === "paymentMethod") {
    switch (items.paymentMethod) {
      case "cod":
        return `${defaultIndicatorStyle} bg-green-500`;
      case "card":
        return `${defaultIndicatorStyle} bg-red-500`;
      case "g-cash":
        return `${defaultIndicatorStyle} bg-blue-500`;
    }
  }
};

function imageColumn(column, items) {
  if (column === "image") {
    return (
      <img
        src={items.image.replace(/\.(jpg|png|webp)/, ".jpg")}
        alt="image"
        loading="lazy"
        className="h-10 w-10 rounded-full object-cover border dark:bg-secondary-bg-dark bg-secondary-bg dark:border-primary-borders-dark border-primary-borders"
      />
    );
  } else {
    return null;
  }
}

function pfpColumn(column, items) {
  if (column === "profilePic") {
    return (
      <img
        src={items.profilePic}
        alt="image"
        loading="lazy"
        className="h-10 w-10 rounded-full object-cover border dark:bg-secondary-bg-dark bg-secondary-bg dark:border-primary-borders-dark border-primary-borders"
      />
    );
  } else {
    return null;
  }
}

function columnTextFormat(column) {
  switch (column) {
    case "email":
      return "lowercase line-clamp-1";
    case "product":
    case "company":
    case "clientId":
    case "productName":
    case "productDetails":
    case "suppliers":
    case "suppliersId":
      return "uppercase line-clamp-1";
    case "image":
    case "profilePic":
      return "hidden";
    case "description":
      return "line-clamp-2";
    case "createdAt":
    case "updatedAt":
    case "dateOfSale":
    case "saleDate":
      return "line-clamp-1";
  }
}

function formats(column, items) {
  if (["createdAt", "updatedAt", "dateOfSale", "saleDate"].includes(column)) {
    return dayjs(items[column]).format("MMM D, YYYY");
  }

  if (["price", "total", "productPrice"].includes(column)) {
    return `₱${items[column].toLocaleString()}`;
  }

  if (["priceAtSale"].includes(column)) {
    if (items[column] === "no discount") {
      return `${items[column].toLocaleString()}`;
    } else {
      return `${items[column].toLocaleString()}%`;
    }
  }

  switch (column) {
    case "clientId":
      return items.clientId?.company || "N/A";
    case "companyCity":
      return items.clientId?.city || "N/A";
    case "productName":
      return items.productId?.product || "N/A";
    case "productDetails":
      return items.productDetails?.product || "N/A";
    case "suppliersId":
      return items.suppliersId?.suppliers || "N/A";
  }

  if (column === "role") {
    switch (items.role) {
      case "software engineer":
        return (
          <span className="flex gap-2 justify-start items-center">
            <FaLaptopCode /> software engineer
          </span>
        );
      case "finance manager":
        return (
          <span className="flex gap-2 justify-start items-center">
            <AiOutlineDollarCircle /> finance manager
          </span>
        );
      case "data analyst":
        return (
          <span className="flex gap-2 justify-start items-center">
            <AiOutlineLineChart /> data analyst
          </span>
        );
      case "ceo":
        return (
          <span className="flex gap-2 justify-start items-center">
            <LiaUserTieSolid /> ceo
          </span>
        );
      case "hr manager":
        return (
          <span className="flex gap-2 justify-start items-center">
            <AiOutlineUsergroupAdd /> hr manager
          </span>
        );
      case "others":
        return (
          <span className="flex gap-2 justify-start items-center">
            <AiOutlineQuestionCircle /> others
          </span>
        );
    }
  }

  return items[column];
}

export { getIndicators, imageColumn, columnTextFormat, formats, pfpColumn };
