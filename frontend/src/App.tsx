import { Route, Routes } from "react-router";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";

const App = () => {
  return (
    <Routes>
      <Route index element={<SignIn />} />
      <Route path="sign-up" element={<SignUp />} />
    </Routes>
  );
};

export default App;
