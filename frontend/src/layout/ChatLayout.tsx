import EditProfile from "@/components/user/EditProfile";
import IconButton from "@/components/ui/IconButton";
import ChatIcon from "@/components/ui/icons/ChatIcon";
import FriendsIcon from "@/components/ui/icons/FriendsIcon";
import LogoutIcon from "@/components/ui/icons/LogoutIcon";
import { SettingIcon } from "@/components/ui/icons/SettingIcon";
import { ROUTES } from "@/constants/routes";
import { useAuth } from "@/hooks/useAuth";
import { useUser } from "@/hooks/useUser";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

export const ChatLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { getUserDetails } = useUser();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(ROUTES.SIGN_IN, { replace: true });
      return;
    }

    getUserDetails();
  }, [isAuthenticated, navigate]);

  return (
    <section className="relative grid grid-cols-12 grid-rows-1 h-full rounded-[1.5rem]">
      {/* Sidebar */}
      <aside className="flex flex-col w-24 flex-1 col-span-1 row-span-1 items-center justify-between pt-4 pb-2">
        <EditProfile />

        <div role="group" className="flex flex-col items-center w-full">
          <IconButton
            shape="squircle"
            title="Chats"
            icon={<ChatIcon />}
            action={() => navigate(ROUTES.CHAT)}
          />
          <IconButton
            shape="squircle"
            title="Contacts"
            icon={<FriendsIcon />}
            action={() => navigate(ROUTES.CONTACT)}
          />
          <IconButton
            shape="squircle"
            title="Settings"
            icon={<SettingIcon />}
            action={() => navigate(ROUTES.SETTING)}
          />
        </div>
        <IconButton
          shape="squircle"
          title="Logout"
          icon={<LogoutIcon />}
          action={logout}
        />
      </aside>
      {/* Sidebar */}
      {/* Dynamic Container */}
      <div className="col-span-11 row-span-1 min-h-[80dvh]">
        <Outlet />
      </div>
      {/* Dynamic Container */}
    </section>
  );
};
