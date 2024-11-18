export const transactionHeader = [
  {
    title: "Products",
    sortable: true,
    accesor: "productName",
    colsHidden: false,
  },
  {
    title: "Clients",
    sortable: true,
    accesor: "clientName",
    colsHidden: false,
  },
  {
    title: "Price",
    sortable: true,
    accesor: "unitPrice",
    colsHidden: false,
  },
  {
    title: "Quantity",
    sortable: false,
    accesor: "quantity",
    colsHidden: false,
  },
  {
    title: "Total",
    sortable: true,
    accesor: "totalPrice",
    colsHidden: true,
  },
  {
    title: "Date of Sale",
    sortable: true,
    accesor: "dateOfSale",
    colsHidden: true,
  },
  { title: "", sortable: false, accesor: "", colsHidden: false },
];

export const transactionBody = [
  "productName",
  "clientName",
  "unitPrice",
  "quantity",
  "totalPrice",
  "dateOfSale",
];
