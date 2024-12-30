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
  Performance,
} from "./pages/index";

const App = () => {
  return (
    <RootLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />

        <Route path="/general/paginatedClients" element={<Clients />} />
        <Route path="/general/products" element={<Products />} />
        <Route path="/general/transactions" element={<Transactions />} />

        <Route path="/analytics/performance" element={<Performance />} />
        <Route path="/analytics/daily" element={<Daily />} />
        <Route path="/analytics/weeks" element={<Weekly />} />
        <Route path="/analytics/months" element={<Monthly />} />
        <Route path="/analytics/year" element={<Yearly />} />

        <Route path="/settings" element={<Settings />} />
      </Routes>
    </RootLayout>
  );
};

export default App;
