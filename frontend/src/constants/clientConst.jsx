export const clientsHeader = [
  { title: "Company", sortable: true, accesor: "company", colsHidden: false },
  {
    title: "Contacts",
    sortable: false,
    accesor: "contacts",
    colsHidden: false,
  },
  { title: "Email", sortable: false, accesor: "email", colsHidden: false },
  { title: "City", sortable: true, accesor: "city", colsHidden: false },
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

export const clientsBody = [
  "company",
  "contacts",
  "email",
  "city",
  "createdAt",
  "updatedAt",
]; // The keys of our data body

export const productsHeader = [
  { title: "Products", sortable: true, accesor: "product", colsHidden: false },
  { title: "Image", sortable: false, accesor: "image", colsHidden: false },
  {
    title: "Category",
    sortable: true,
    accesor: "category",
    colsHidden: false,
  },
  {
    title: "Description",
    sortable: false,
    accesor: "description",
    colsHidden: true,
  },
  { title: "Price", sortable: true, accesor: "price", colsHidden: false },
  {
    title: "Status",
    sortable: true,
    accesor: "status",
    colsHidden: false,
  },
  // {
  //   title: "Created",
  //   sortable: true,
  //   accesor: "created",
  //   colsHidden: true,
  // },
  // {
  //   title: "Update",
  //   sortable: true,
  //   accesor: "updated",
  //   colsHidden: true,
  // },
  { title: "", sortable: false, accesor: "", colsHidden: false },
];

export const productsBody = [
  "product",
  "image",
  "category",
  "description",
  "price",
  "status",
  // "createdAt",
  // "updatedAt",
]; // The keys of our data body

export const productsCategory = [
  "coffee equipment",
  "food warming showcase",
  "carpigiani",
  "scotsman",
  "uncategorized",
  "other equipments",
];

export const productsStatus = ["active", "inactive"];
