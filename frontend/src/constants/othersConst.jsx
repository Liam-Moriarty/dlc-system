export const adminHeader = [
  { title: "Name", sortable: true, accesor: "name", colsHidden: false },
  {
    title: "Profile",
    sortable: false,
    accesor: "profilePic",
    colsHidden: false,
  },
  {
    title: "Username",
    sortable: true,
    accesor: "username",
    colsHidden: false,
  },
  { title: "Email", sortable: false, accesor: "email", colsHidden: false },
  { title: "Role", sortable: true, accesor: "role", colsHidden: false },
  {
    title: "Member Since",
    sortable: true,
    accesor: "createdAt",
    colsHidden: true,
  },
  { title: "", sortable: false, accesor: "", colsHidden: false },
];

export const adminBody = [
  "name",
  "profilePic",
  "username",
  "email",
  "role",
  "createdAt",
];

export const roles = [
  { role: "software engineer" },
  { role: "finance manager" },
  { role: "data analyst" },
  { role: "CEO" },
  { role: "HR manager" },
  { role: "others" },
];
