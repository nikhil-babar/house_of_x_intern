import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import Sidebar from "../components/Sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="w-full h-screen flex justify-between">
        <Sidebar />
        <Outlet />
        <ToastContainer position="top-right" />
      </div>
      <TanStackRouterDevtools />
    </>
  ),
});
