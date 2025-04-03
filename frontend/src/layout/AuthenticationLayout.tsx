import { useAuthStore } from "@/store/useAuthStore";
import { Navigate, Outlet } from "react-router";

export const AuthenticationLayout = () => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <Outlet /> : <Navigate to={"/"} replace />;
};
