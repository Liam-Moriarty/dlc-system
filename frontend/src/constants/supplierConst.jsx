export const suppliersHeader = [
  {
    title: "Supplier",
    sortable: true,
    accesor: "suppliers",
    colsHidden: false,
  },
  {
    title: "Email",
    sortable: false,
    accesor: "email",
    colsHidden: false,
  },
  {
    title: "Contacts",
    sortable: false,
    accesor: "contacts",
    colsHidden: false,
  },
  { title: "Location", sortable: true, accesor: "location", colsHidden: false },
  {
    title: "Create",
    sortable: true,
    accesor: "created",
    colsHidden: true,
  },
  {
    title: "Update",
    sortable: true,
    accesor: "updated",
    colsHidden: true,
  },
  { title: "", sortable: false, accesor: "", colsHidden: false },
];

export const suppliersBody = [
  "suppliers",
  "email",
  "contacts",
  "location",
  "createdAt",
  "updatedAt",
];
