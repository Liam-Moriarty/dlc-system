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
