export const movementHeader = [
  {
    title: "Supplier",
    sortable: true,
    accesor: "suppliersId",
    colsHidden: false,
  },
  {
    title: "Products",
    sortable: true,
    accesor: "productDetails",
    colsHidden: false,
  },
  {
    title: "Quantity",
    sortable: true,
    accesor: "quantity",
    colsHidden: false,
  },
  {
    title: "Location",
    sortable: true,
    accesor: "location",
    colsHidden: true,
  },
  {
    title: "Admin",
    sortable: true,
    accesor: "createdBy",
    colsHidden: true,
  },
  {
    title: "Type",
    sortable: true,
    accesor: "type",
    colsHidden: false,
  },
  {
    title: "Status",
    sortable: true,
    accesor: "movementStatus",
    colsHidden: false,
  },
  {
    title: "Create",
    sortable: true,
    accesor: "createdAt",
    colsHidden: true,
  },
  {
    title: "Update",
    sortable: true,
    accesor: "updatedAt",
    colsHidden: true,
  },
  { title: "", sortable: false, accesor: "", colsHidden: false },
];

export const movementBody = [
  "suppliersId",
  "productDetails",
  "quantity",
  "location",
  "createdBy",
  "type",
  "movementStatus",
  "createdAt",
  "updatedAt",
];

export const movementStatus = ["purchase", "return", "transfer"];

export const movementType = ["ingoing", "outgoing"];
