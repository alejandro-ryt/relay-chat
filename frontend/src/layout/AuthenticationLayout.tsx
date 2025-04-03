import { useAuthStore } from "@/store/useAuthStore";
import { Navigate, Outlet } from "react-router";

export const AuthenticationLayout = () => {
  const { isAuthenticated } = useAuthStore();
  console.log("isAuthenticated", isAuthenticated);
  return isAuthenticated ? <Outlet /> : <Navigate to={"/"} replace />;
};
