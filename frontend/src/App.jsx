import React from "react";
import { Route, Routes } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import {
  Dashboard,
  Clients,
  Settings,
  Transactions,
  Daily,
  Weekly,
  Monthly,
  Yearly,
  Products,
} from "./pages/index";

const App = () => {
  return (
    <RootLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />

        <Route path="/general/paginatedClients" element={<Clients />} />
        <Route path="/general/products" element={<Products />} />
        <Route path="/general/transactions" element={<Transactions />} />

        <Route path="/reports/daily" element={<Daily />} />
        <Route path="/reports/weekly" element={<Weekly />} />
        <Route path="/reports/monthly" element={<Monthly />} />
        <Route path="/reports/yearly" element={<Yearly />} />

        <Route path="/settings" element={<Settings />} />
      </Routes>
    </RootLayout>
  );
};

export default App;
