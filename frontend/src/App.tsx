import { Route, Routes } from "react-router";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import Layout from "@/layout/Layout";
import Chat from "@/pages/Chat";
import NotFound from "@/pages/NotFound";
import { AuthenticationLayout } from "@/layout/AuthenticationLayout";

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />} path="/">
        <Route index element={<SignIn />} />
        <Route element={<AuthenticationLayout />}>
          <Route path="chat" element={<Chat />} />
        </Route>
        <Route path="sign-up" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
