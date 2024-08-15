import React from "react";
import Sidebar from "./sidebar/Sidebar";

const RootLayout = ({ children }) => {
  return (
    <div className="flex gap-5">
      <Sidebar />
      <main className="w-full flex-1 py-4">{children}</main>
    </div>
  );
};

export default RootLayout;
