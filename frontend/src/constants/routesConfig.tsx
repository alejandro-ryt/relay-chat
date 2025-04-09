import { ROUTES } from "@/constants/routes";
import Contact from "@/pages/Contact";
import Settings from "@/pages/Settings";
import Chat from "@/pages/Chat";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import { RouteConfig } from "@/types/auth.types";

export const PROTECTED_ROUTES: RouteConfig[] = [
  {
    path: ROUTES.CHAT,
    element: <Chat />,
  },
  {
    path: ROUTES.CONTACT,
    element: <Contact />,
  },
  {
    path: ROUTES.SETTING,
    element: <Settings />,
  },
];

export const PUBLIC_ROUTES: RouteConfig[] = [
  {
    path: ROUTES.SIGN_IN,
    element: <SignIn />,
  },
  {
    path: ROUTES.SIGN_UP,
    element: <SignUp />,
  },
];
