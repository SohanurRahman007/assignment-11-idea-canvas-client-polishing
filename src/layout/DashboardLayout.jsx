import React, { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { Home, User, Menu, X, Users, ArrowLeft } from "lucide-react";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // A list of items for the sidebar navigation with updated icons
  const navItems = [
    { to: "/dashboard", icon: Home, name: "Dashboard" },
    { to: "/allSubscribe", icon: Users, name: "All Subscriber" },
    { to: "/dashboard/profile", icon: User, name: "Profile" },
    { to: "/", icon: ArrowLeft, name: "Go Home" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 text-base-content">
      {/* Sidebar with sticky position */}
      <aside
        className={`w-64 bg-white shadow-md transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-40 h-screen flex flex-col lg:translate-x-0`}
      >
        <div className="flex items-center justify-between p-4 border-b border-orange-500">
          <span className="text-xl font-bold text-orange-400">Dashboard</span>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden text-base-content"
          >
            <X size={24} />
          </button>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2 text-base-content">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              onClick={() => setIsSidebarOpen(false)}
              end={item.to === "/dashboard"}
              className={({ isActive }) =>
                `flex items-center gap-4 p-2 rounded-lg transition-colors duration-200 text-base-content
                ${
                  isActive
                    ? "bg-orange-400 text-white"
                    : "text-gray-900 hover:bg-gray-200"
                }`
              }
            >
              <item.icon size={20} />
              <span className="font-medium">{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-64">
        {/* Mobile header with menu button */}
        <header className="bg-white p-4 shadow-sm lg:hidden flex items-center justify-between">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-base-content"
          >
            <Menu size={24} />
          </button>
          <span className="text-xl font-bold text-orange-400">Dashboard</span>
          <div className="w-6"></div> {/* Spacer for alignment */}
        </header>

        {/* This is where the specific dashboard page content will be rendered */}
        <main className="flex-1 p-6 overflow-x-hidden overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
