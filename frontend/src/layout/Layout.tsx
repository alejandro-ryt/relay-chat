import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <main className="grid max-w-[65vw] min-h-[80vh] my-24 m-auto rounded-[1.5rem] bg-base-200">
      {children}
    </main>
  );
};

export default Layout;
