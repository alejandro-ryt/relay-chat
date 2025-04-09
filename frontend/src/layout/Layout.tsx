import { Outlet } from "react-router";

const Layout = () => {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <section className="bg-base-200 rounded-[1.5rem] xl:max-w-[80vw] max-w-[95vw] w-full md:min-h-[80vh]">
        <Outlet />
      </section>
    </main>
  );
};

export default Layout;
