export const clientsHeader = [
  { title: "ID", sortable: false, accesor: "_id" },
  { title: "Company", sortable: true, accesor: "company" },
  { title: "Contacts", sortable: false, accesor: "contacts" },
  { title: "Email", sortable: false, accesor: "email" },
  { title: "City", sortable: true, accesor: "city" },
  { title: "Created At", sortable: true, accesor: "created" },
  { title: "Updated At", sortable: true, accesor: "updated" },
  { title: "", sortable: false, accesor: "" },
];

export const clientsBody = [
  "_id",
  "company",
  "contacts",
  "email",
  "city",
  "created_at",
  "updated_at",
]; // The keys of our data body
