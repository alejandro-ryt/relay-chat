import { useAuthStore } from "@/store/useAuthStore";
import { Navigate, Outlet } from "react-router";

export const AuthenticationLayout = () => {
  const { authUser } = useAuthStore();
  // Put authUser === null on the validation to mimic you are auth
  return authUser ? <Outlet /> : <Navigate to={"/"} replace />;
};
