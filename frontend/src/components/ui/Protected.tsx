import { ROUTES } from "@/constants/routes";
import { ChatLayout } from "@/layout/ChatLayout";
import { useAuthStore } from "@/store/useAuthStore";
import { Outlet, Navigate } from "react-router";

export const Protected = () => {
  const isAuthenticated = useAuthStore().isAuthenticated;

  return isAuthenticated ? (
    <ChatLayout>
      <Outlet />
    </ChatLayout>
  ) : (
    <Navigate to={ROUTES.SIGN_IN} replace={true} />
  );
};
