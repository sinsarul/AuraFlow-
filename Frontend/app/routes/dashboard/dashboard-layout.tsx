import { SidebarComponent } from "@/components/layout/sidebar-component";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/provider/auth-context";
import { Loader } from "lucide-react";
import React from "react";
import { Navigate, Outlet } from "react-router";

const DashboardLayout = () => {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
     <Loader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" />;
  }

  return (
    <div className="flex h-screen w-full">
      <SidebarComponent />
      <div className="flex flex-1 flex-col h-full">
        {/* <Header/> */}
        <main className="flex-1 overflow-y-auto h-full w-full">
          <div className="mx-auto container px-2 sm:px-6 lg:px-8 py-0 md:py-8 w-full h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
