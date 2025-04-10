import { Outlet } from "react-router";

const Layout = () => {
  return (
    <main className="container mx-auto min-h-screen flex items-center justify-center">
      <section className="bg-base-200 rounded-[1.5rem] w-full h-[calc(100dvh-2rem)]">
        <Outlet />
      </section>
    </main>
  );
};

export default Layout;
