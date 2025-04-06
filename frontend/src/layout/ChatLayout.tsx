import EditProfile from "@/components/chat/EditProfile";
import Avatar from "@/components/ui/Avatar";
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
  const { authUserDetails } = useAuthStore();
  const navigate = useNavigate();
  const { showModal, getUserDetails, getContacts } = useUser();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(ROUTES.SIGN_IN, { replace: true });
      return;
    }

    getUserDetails();
    getContacts();
  }, [isAuthenticated, navigate]);

  return (
    <section className="relative flex rounded-[1.5rem]">
      {/* Sidebar */}
      <aside className="flex flex-col w-24 flex-1 items-center justify-between pt-4 pb-2">
        <div className="dropdown dropdown-start">
          <div
            tabIndex={0}
            role="button"
            className="btn block mask h-full w-full mask-squircle"
          >
            <Avatar pic={authUserDetails?.profilePic} sizeClass="w-16" />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
          >
            <li>
              <button onClick={showModal}>Edit Profile</button>
            </li>
          </ul>
        </div>
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
      <div className="flex-10">
        <Outlet />
      </div>
      {/* Dynamic Container */}
    </section>
  );
};
