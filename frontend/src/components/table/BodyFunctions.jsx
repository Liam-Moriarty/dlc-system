import dayjs from "dayjs";

const getIndicators = (column, items) => {
  if (column === "quantityInStock") {
    return items.reorderLevel > items.quantityInStock
      ? "dark:text-red-500 font-bold"
      : "dark:text-green-500 font-bold";
  }

  if (column === "status") {
    return items.status === "active"
      ? "p-2 rounded-xl bg-green-500 flex justify-center items-center"
      : "p-2 rounded-xl bg-red-500 flex justify-center items-center";
  }
};

function imageColumn(column, items) {
  if (column === "image") {
    return (
      <img
        src={items.image.replace(/\.(jpg|png|webp)/, ".jpg")}
        alt="product image"
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
      return "lowercase";
    case "product":
    case "productName":
      return "uppercase";
    case "image":
      return "hidden";
    case "description":
      return "line-clamp-2";
    default:
      return "capitalize";
  }
}

function formatDate(column, items) {
  if (["createdAt", "updatedAt", "dateOfSale"].includes(column)) {
    return dayjs(items[column]).format("MMM D, YYYY");
  }

  if (["price", "totalPrice", "unitPrice"].includes(column)) {
    return <span>₱{items[column].toLocaleString()}</span>;
  }

  return items[column];
}

export { getIndicators, imageColumn, columnTextFormat, formatDate };
