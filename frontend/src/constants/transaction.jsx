export const transactionHeader = [
  {
    title: "Company",
    sortable: false,
    accesor: "company",
    colsHidden: false,
  },
  {
    title: "Products",
    sortable: false,
    accesor: "product",
    colsHidden: false,
  },
  {
    title: "Quantity",
    sortable: false,
    accesor: "quantity",
    colsHidden: false,
  },
  {
    title: "Price",
    sortable: false,
    accesor: "productPrice",
    colsHidden: false,
  },
  {
    title: "Discount",
    sortable: false,
    accesor: "priceAtSale",
    colsHidden: false,
  },
  {
    title: "Amount",
    sortable: false,
    accesor: "total",
    colsHidden: true,
  },
  {
    title: "Total",
    sortable: true,
    accesor: "totalAmount",
    colsHidden: true,
  },
  {
    title: "Payment",
    sortable: true,
    accesor: "paymentMethod",
    colsHidden: true,
  },
  {
    title: "City",
    sortable: false,
    accesor: "city",
    colsHidden: true,
  },
  {
    title: "Status",
    sortable: true,
    accesor: "statusOrder",
    colsHidden: true,
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
  "company",
  "product",
  "quantity",
  "productPrice",
  "priceAtSale",
  "total",
  "totalAmount",
  "paymentMethod",
  "city",
  "statusOrder",
  "saleDate",
];
