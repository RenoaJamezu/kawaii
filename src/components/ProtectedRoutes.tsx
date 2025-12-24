import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRoutesProps {
  unlockDate?: Date;
}

export default function ProtectedRoutes({ unlockDate }: ProtectedRoutesProps) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null;

  if (!isAuthenticated) return <Navigate to={'/'} replace />

  if (unlockDate) {
    const now = new Date();
    if (now < unlockDate) return <Navigate to={'/locked'} replace />
  }

  return <Outlet />
}