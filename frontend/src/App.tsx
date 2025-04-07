import { ChatLayout } from "@/layout/ChatLayout";
import Layout from "@/layout/Layout";
import Chat from "@/pages/Chat";
import { Contact } from "@/pages/Contact";
import NotFound from "@/pages/NotFound";
import Settings from "@/pages/Settings";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import { useThemeStore } from "@/store/useThemeStore";
import { Route, Routes } from "react-router";

const App = () => {
  const { theme } = useThemeStore();

  return (
    <div data-theme={theme}>
      <Routes>
        <Route element={<Layout />} path="/">
          <Route index element={<SignIn />} />
          <Route element={<ChatLayout />}>
            <Route path="chat" element={<Chat />} />
            <Route path="contact" element={<Contact />} />
            <Route path="setting" element={<Settings />} />
          </Route>
          <Route path="sign-up" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
