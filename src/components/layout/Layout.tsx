
import { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { MobileNav } from "./MobileNav";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 pb-16 md:pb-0">
        <div className="container mx-auto py-4 px-4 md:px-6">
          <Outlet />
        </div>
      </main>
      <MobileNav />
    </div>
  );
};

export default Layout;
