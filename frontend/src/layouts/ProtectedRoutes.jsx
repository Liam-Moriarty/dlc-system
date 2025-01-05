import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const isLoggedIn = window.localStorage.getItem("token");
  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default ProtectedRoutes;
