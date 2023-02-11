import Store from "electron-store";
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import NoAuth from "../pages/NoAuth";

export default function PrivateRoute() {
  const store = new Store();
  const isLoggedIn = store?.get("isLoggedIn");
  const user = store?.get("user");
  const location = useLocation();
  const { pathname } = location;
  if (!isLoggedIn) return <Navigate to="/login" />;
  if (isLoggedIn && user?.isAdmin) return <Outlet />;
  if (isLoggedIn && user?.pages?.includes(pathname)) return <Outlet />;
  return <NoAuth />;
}
