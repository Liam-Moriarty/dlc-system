import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import {
  Dashboard,
  Clients,
  Profile,
  Transactions,
  Daily,
  Weekly,
  Monthly,
  Yearly,
  Products,
  Performance,
  Supplier,
  Movement,
  Inventory,
  Admin,
  Signup,
  Login,
} from "./pages/index";
import ProtectedRoutes from "./layouts/ProtectedRoutes";

const App = () => {
  const isLoggedIn = window.localStorage.getItem("token");

  return (
    <Routes>
      {!isLoggedIn && (
        <>
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </>
      )}

      <Route
        path="/"
        element={
          <ProtectedRoutes>
            <RootLayout />
          </ProtectedRoutes>
        }
      >
        <Route path="/sign-up" element={<Navigate to="/" />} />
        <Route path="/login" element={<Navigate to="/" />} />

        <Route index element={<Dashboard />} />
        <Route path="/general/paginatedClients" element={<Clients />} />
        <Route path="/general/products" element={<Products />} />
        <Route path="/general/transactions" element={<Transactions />} />
        <Route path="/general/admin" element={<Admin />} />

        <Route path="/inventory/suppliers" element={<Supplier />} />
        <Route path="/inventory/movement" element={<Movement />} />
        <Route path="/inventory/inventory" element={<Inventory />} />

        <Route path="/analytics/performance" element={<Performance />} />
        <Route path="/analytics/daily" element={<Daily />} />
        <Route path="/analytics/weeks" element={<Weekly />} />
        <Route path="/analytics/months" element={<Monthly />} />
        <Route path="/analytics/year" element={<Yearly />} />

        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default App;
