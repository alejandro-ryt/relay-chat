import { Outlet } from "react-router";

const Layout = () => {
  return (
    <main className="grid place-items-center h-dvh max-w-[65vw] mx-auto">
      <section className="bg-base-200 rounded-[1.5rem] w-full min-h-[75vh]">
        <Outlet />
      </section>
    </main>
  );
};

export default Layout;
