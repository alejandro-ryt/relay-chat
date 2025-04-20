import { Outlet } from "react-router";

const Layout = () => {
  return (
    <main className="container h-svh md:mx-auto md:min-h-screen flex items-center justify-center">
      <section className="bg-base-200 rounded-[1.5rem] w-full h-full md:h-[calc(100dvh-2rem)]">
        <Outlet />
      </section>
    </main>
  );
};

export default Layout;
