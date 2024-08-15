import React from "react";
import { Route, Routes } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import {
  Dashboard,
  ClientsForm,
  Clients,
  QuotesForm,
  Documents,
  Settings,
  Invoice,
  Orders,
} from "./pages/index";

const App = () => {
  return (
    <RootLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />

        <Route path="/sales/clients">
          <Route path="new-clients" element={<ClientsForm />} />
          <Route path="manage-clients" element={<Clients />} />
        </Route>

        <Route path="/sales/quotes">
          <Route path="quote-form" element={<QuotesForm />} />
          <Route path="documents" element={<Documents />} />
        </Route>

        <Route path="/accounting/invoice" element={<Invoice />} />
        <Route path="/accounting/orders" element={<Orders />} />

        <Route path="/settings" element={<Settings />} />
      </Routes>
    </RootLayout>
  );
};

export default App;
