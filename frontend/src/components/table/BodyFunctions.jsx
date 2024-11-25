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

function nestedColumn(column, items) {
  const products = items.productId || [];

  const columnRenderers = {
    company: (product, productIndex) =>
      productIndex === 0 ? (
        <p
          key={`${items._id}-${productIndex}`}
          className="text-sm line-clamp-1"
        >
          {items.clientId?.company || "N/A"}
        </p>
      ) : null,

    product: (product, productIndex) => (
      <p key={`${items._id}-${productIndex}`} className="text-sm line-clamp-1">
        {product.products?.product || "N/A"}
      </p>
    ),

    productPrice: (product, productIndex) => (
      <p key={`${items._id}-${productIndex}`} className="text-sm">
        ₱
        {product.products?.price.toLocaleString(undefined, {
          minimumFractionDigits: 2,
        }) || "0.00"}
      </p>
    ),

    quantity: (product, productIndex) => (
      <p key={`${items._id}-${productIndex}`} className="text-sm">
        {product.quantity || "N/A"}
      </p>
    ),
    priceAtSale: (product, productIndex) => (
      <p key={`${items._id}-${productIndex}`} className="text-sm">
        ₱
        {product.priceAtSale?.toLocaleString(undefined, {
          minimumFractionDigits: 2,
        }) || "0.00"}
      </p>
    ),

    total: (product, productIndex) => (
      <p key={`${items._id}-${productIndex}`} className="text-sm">
        ₱
        {product.total?.toLocaleString(undefined, {
          minimumFractionDigits: 2,
        }) || "0.00"}
      </p>
    ),

    city: (product, productIndex) =>
      productIndex === 0 ? (
        <p key={`${items._id}-${productIndex}`} className="text-sm">
          {items.clientId?.city || "N/A"}
        </p>
      ) : null,
  };

  // Render the column based on the provided key
  return products.map(
    (product, productIndex) =>
      columnRenderers[column]?.(product, productIndex) || null
  );
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
  }
}

function paymentAndStatusIndicator(column, items) {
  const defaultStyle = "p-2 rounded-xl flex justify-center items-center xl:p-1";

  if (column === "paymentMethod") {
    if (items.paymentMethod === "g-cash") {
      return `bg-blue-500 ${defaultStyle}`;
    }

    if (items.paymentMethod === "cod") {
      return `bg-green-500 ${defaultStyle}`;
    }

    if (items.paymentMethod === "card") {
      return `bg-red-500 ${defaultStyle}`;
    }
  }

  if (column === "statusOrder") {
    if (items.statusOrder === "pending") {
      return `bg-gray-500 ${defaultStyle}`;
    }

    if (items.statusOrder === "completed") {
      return `bg-green-500 ${defaultStyle}`;
    }

    if (items.statusOrder === "cancelled") {
      return `bg-red-500 ${defaultStyle}`;
    }

    if (items.statusOrder === "returned") {
      return `bg-blue-500 ${defaultStyle}`;
    }
  }
}

function formatDate(column, items) {
  if (["createdAt", "updatedAt", "dateOfSale", "saleDate"].includes(column)) {
    return dayjs(items[column]).format("MMM D, YYYY");
  }

  if (["price", "totalPrice", "unitPrice", "totalAmount"].includes(column)) {
    return <span>₱{items[column].toLocaleString()}</span>;
  }

  return items[column];
}

export {
  getIndicators,
  imageColumn,
  columnTextFormat,
  formatDate,
  nestedColumn,
  paymentAndStatusIndicator,
};
