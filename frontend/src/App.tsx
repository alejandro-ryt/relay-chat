import { Route, Routes } from "react-router";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import Layout from "./layout/Layout";

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />} path="/">
        <Route index element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
      </Route>
    </Routes>
  );
};

export default App;
