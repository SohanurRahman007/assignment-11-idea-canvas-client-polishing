import React, { useState } from "react";
import { Outlet, NavLink, Link } from "react-router-dom";
import { Home, User, Menu, X, Users, ArrowLeft } from "lucide-react";
import logo from "../assets/logo/logo.png";
import { Helmet } from "react-helmet-async";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { to: "/dashboard", icon: Home, name: "Dashboard" },
    { to: "/dashboard/allSubscribe", icon: Users, name: "All Subscriber" },
    { to: "/dashboard/profile", icon: User, name: "Profile" },
    { to: "/", icon: ArrowLeft, name: "Go Home" },
  ];

  return (
    <div className="flex min-h-screen bg-base-100 text-base-content">
      <Helmet>
        <title>Dashboard | Idea Canvas</title>
      </Helmet>

      {/* Sidebar with orange theme */}
      <aside
        className={`w-64 bg-base-100 shadow-sm border-r border-orange-200 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-40 h-screen flex flex-col lg:translate-x-0`}
      >
        <div className="flex items-center justify-between p-4 border-b border-orange-200">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="w-10 h-10 rounded-sm" />
            <span className="text-xl font-bold text-base-content">
              Idea <span className="text-orange-500">Canvas</span>
            </span>
          </Link>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden text-base-content hover:text-orange-500 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              onClick={() => setIsSidebarOpen(false)}
              end={item.to === "/dashboard"}
              className={({ isActive }) =>
                `flex items-center gap-4 p-3 rounded-lg transition-all duration-200 group
                ${
                  isActive
                    ? "bg-orange-500 text-white shadow-sm"
                    : "text-base-content hover:bg-orange-50 hover:text-orange-500 border border-transparent hover:border-orange-200"
                }`
              }
            >
              <item.icon
                size={20}
                className="group-hover:scale-110 transition-transform"
              />
              <span className="font-medium">{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-64">
        {/* Mobile header */}
        <header className="bg-base-100 p-4 shadow-sm lg:hidden flex items-center justify-between border-b border-orange-200">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-base-content hover:text-orange-500 transition-colors"
          >
            <Menu size={24} />
          </button>
          <span className="text-xl font-bold text-orange-500">Dashboard</span>
          <div className="w-6"></div>
        </header>

        {/* Main content */}
        <main className="flex-1 p-6 overflow-x-hidden overflow-y-auto bg-base-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
