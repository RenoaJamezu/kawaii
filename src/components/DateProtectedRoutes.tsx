import { Navigate, Outlet } from "react-router-dom";


export default function DateProtectedRoutes() {
  const loginAt = localStorage.getItem("loginAt");
  const UNLOCK_DATE = new Date("2025-12-27T00:00:00");

  if (!loginAt) return <Navigate to={"/"} replace />

  const now = new Date();

  if (now < UNLOCK_DATE) return <Navigate to={"/locked"} replace />

  return <Outlet />
}