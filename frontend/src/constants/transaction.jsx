export const transactionHeader = [
  {
    title: "Client",
    sortable: true,
    accesor: "clientId",
    colsHidden: false,
  },

  {
    title: "Product",
    sortable: true,
    accesor: "productName",
    colsHidden: false,
  },
  {
    title: "Price",
    sortable: true,
    accesor: "price",
    colsHidden: false,
  },

  {
    title: "Quantity",
    sortable: true,
    accesor: "quantity",
    colsHidden: false,
  },
  {
    title: "Discount",
    sortable: true,
    accesor: "priceAtSale",
    colsHidden: false,
  },
  {
    title: "Total",
    sortable: true,
    accesor: "total",
    colsHidden: false,
  },

  {
    title: "Payment",
    sortable: true,
    accesor: "paymentMethod",
    colsHidden: false,
  },
  {
    title: "City",
    sortable: true,
    accesor: "companyCity",
    colsHidden: true,
  },
  {
    title: "Status",
    sortable: true,
    accesor: "statusOrder",
    colsHidden: false,
  },
  {
    title: "Date",
    sortable: true,
    accesor: "saleDate",
    colsHidden: true,
  },
  { title: "", sortable: false, accesor: "", colsHidden: false },
];

export const transactionBody = [
  "clientId",
  "productName",
  "price",
  "quantity",
  "priceAtSale",
  "total",
  "paymentMethod",
  "companyCity",
  "statusOrder",
  "saleDate",
];

export const transactionStatus = [
  "pending",
  "completed",
  "cancelled",
  "returned",
];

export const transactionPaymentMethod = ["cod", "g-cash", "card"];

export const transactionDiscount = [
  {
    label: "No Discount",
    value: "no discount",
  },
  {
    label: "10%",
    value: 10,
  },
  {
    label: "20%",
    value: 20,
  },
  {
    label: "40%",
    value: 40,
  },
  {
    label: "50%",
    value: 50,
  },
  {
    label: "70%",
    value: 70,
  },
];
