import { Route, Routes } from "react-router";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import Layout from "@/layout/Layout";
import NotFound from "@/pages/NotFound";
import Chat from "@/pages/Chat";

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />} path="/">
        <Route index element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="chat" element={<Chat />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
