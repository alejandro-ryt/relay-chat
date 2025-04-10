import EditProfile from "@/components/user/EditProfile";
import IconButton from "@/components/ui/IconButton";
import ChatIcon from "@/components/ui/icons/ChatIcon";
import FriendsIcon from "@/components/ui/icons/FriendsIcon";
import LogoutIcon from "@/components/ui/icons/LogoutIcon";
import SettingIcon from "@/components/ui/icons/SettingIcon";
import { ROUTES } from "@/constants/routes";
import { useAuth } from "@/hooks/useAuth";
import { useUser } from "@/hooks/useUser";
import { FC, PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router";
import { useChatStore } from "@/store/useChatStore";

export const ChatLayout: FC<PropsWithChildren> = ({ children }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { getUserDetails } = useUser();
  const { resetData } = useChatStore();

  useEffect(() => {
    getUserDetails();
    resetData();
  }, []);

  return (
    <section className="relative grid grid-cols-12 grid-rows-1 h-full md:h-max rounded-[1.5rem]">
      {/* Sidebar */}
      <aside className="flex w-full h-full flex-1 order-2 md:order-1 col-span-12 md:flex-col md:col-span-1 row-span-1 items-center justify-between md:my-2">
        <EditProfile />

        <div
          role="group"
          className="flex md:flex-col justify-center items-center w-full h-full"
        >
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
      <section className="col-span-12 md:order-2 md:col-span-11 row-span-1 h-full">
        {children}
      </section>
      {/* Dynamic Container */}
    </section>
  );
};
