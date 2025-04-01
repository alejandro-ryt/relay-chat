import { Outlet } from "react-router";

const Layout = () => {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <section className="grid bg-base-200 rounded-[1.5rem] xl:max-w-[65vw] w-full min-h-[75vh]">
        <Outlet />
      </section>
    </main>
  );
};

export default Layout;
