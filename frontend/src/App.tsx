import Layout from "@/layout/Layout";
import SignIn from "@/pages/SignIn";
import { useThemeStore } from "@/store/useThemeStore";
import { Route, Routes } from "react-router";
import { Protected } from "@/components/ui/Protected";
import { PROTECTED_ROUTES, PUBLIC_ROUTES } from "@/constants/routesConfig";
import { ROUTES } from "@/constants/routes";

const App = () => {
  const theme = useThemeStore().theme;

  return (
    <div data-theme={theme}>
      <Routes>
        <Route element={<Layout />} path={ROUTES.SIGN_IN}>
          <Route index element={<SignIn />} />
          <Route element={<Protected />}>
            {PROTECTED_ROUTES.map((route) => (
              <Route path={route.path} element={route.element} />
            ))}
          </Route>
          {PUBLIC_ROUTES.map((route) => (
            <Route path={route.path} element={route.element} />
          ))}
        </Route>
      </Routes>
    </div>
  );
};

export default App;
