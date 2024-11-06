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
  { title: "", sortable: false, accesor: "", colsHidden: false },
];

export const productsBody = [
  "product",
  "image",
  "category",
  "description",
  "price",
  "status",
];

export const productsCategory = [
  "coffee equipment",
  "food warming showcase",
  "carpigiani",
  "scotsman",
  "uncategorized",
  "other equipments",
];

export const productsStatus = ["active", "inactive"];
