import { Route, Routes } from "react-router";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import Layout from "@/layout/Layout";
import Chat from "@/pages/Chat";
import NotFound from "@/pages/NotFound";
import { ChatLayout } from "@/layout/ChatLayout";
import { Contact } from "@/pages/Contact";
import { Setting } from "@/pages/Settings";

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />} path="/">
        <Route index element={<SignIn />} />
        <Route element={<ChatLayout />}>
          <Route path="chat" element={<Chat />} />
          <Route path="contact" element={<Contact />} />
          <Route path="setting" element={<Setting />} />
        </Route>
        <Route path="sign-up" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
