// components/Navbar/Navbar.jsx
import React, { useContext, useEffect, useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { AuthContext } from "../../provider/AuthProvider";
import Swal from "sweetalert2";
import logo from "../../assets/logo/logo.png";
import NotificationBell from "../NotificationBell/NotificationBell";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isOpen, setIsOpen] = useState(false);

  // Set theme on component mount and when theme changes
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Toggle between light and dark theme
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  // Handle user logout
  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f97316",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Logout!",
    });

    if (result.isConfirmed) {
      try {
        await logOut();
        Swal.fire("Logged out!", "You have been logged out.", "success");
      } catch (error) {
        console.log(error);
        Swal.fire("Error!", "Logout failed.", "error");
      }
    }
  };

  // Navigation items
  const navItems = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "text-orange-400 font-bold" : "hover:text-orange-400"
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/allBlogs"
        className={({ isActive }) =>
          isActive ? "text-orange-400 font-bold" : "hover:text-orange-400"
        }
      >
        All Blogs
      </NavLink>
      <NavLink
        to="/featuredBlogs"
        className={({ isActive }) =>
          isActive ? "text-orange-400 font-bold" : "hover:text-orange-400"
        }
      >
        Featured
      </NavLink>
      {user && (
        <>
          <NavLink
            to="/addBlog"
            className={({ isActive }) =>
              isActive ? "text-orange-400 font-bold" : "hover:text-orange-400"
            }
          >
            Add Blog
          </NavLink>
          <NavLink
            to="/wishlist"
            className={({ isActive }) =>
              isActive ? "text-orange-400 font-bold" : "hover:text-orange-400"
            }
          >
            Wishlist
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "text-orange-400 font-bold" : "hover:text-orange-400"
            }
          >
            Dashboard
          </NavLink>
        </>
      )}
    </>
  );

  return (
    <>
      {/* ===== Main Navbar ===== */}
      <nav className="bg-base-100 sticky top-0 z-50 shadow-sm w-full">
        <div className="max-w-screen-xl mx-auto py-3 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="w-10 h-10 rounded-sm" />
            <span className="text-xl font-bold text-base-content">
              Idea <span className="text-orange-400">Canvas</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex gap-6 text-base-content">{navItems}</ul>

          {/* Right Side (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            {/* Notification Bell - Show for ANY logged in user */}
            {user && <NotificationBell />}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="text-xl cursor-pointer p-2 rounded-full hover:bg-gray-100 transition-colors"
              title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>

            {/* User Section */}
            {user ? (
              <div className="flex items-center gap-3">
                <div
                  title={user.displayName || user.email}
                  className="w-10 h-10 rounded-full border overflow-hidden bg-gray-100"
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="User"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FaUserCircle className="w-full h-full text-gray-400" />
                  )}
                </div>
                <button
                  onClick={handleLogout}
                  className="btn btn-sm bg-orange-400 text-white hover:bg-orange-500 border-none"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-3">
                <Link
                  to="/login"
                  className="hover:text-orange-400 transition-colors px-3 py-2 rounded"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-orange-400 text-white hover:bg-orange-500 px-4 py-2 rounded transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Menu */}
          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden text-2xl p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <FaBars />
          </button>
        </div>
      </nav>

      {/* ===== Mobile Drawer Menu ===== */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 md:hidden"
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-x-full"
            enterTo="opacity-100 translate-x-0"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-x-0"
            leaveTo="opacity-0 translate-x-full"
          >
            <div className="fixed inset-0 flex z-50">
              {/* Overlay */}
              <div
                className="fixed inset-0 bg-black/40"
                onClick={() => setIsOpen(false)}
              ></div>

              {/* Drawer Panel */}
              <div className="relative bg-base-100 w-64 p-6 shadow-lg z-50 ml-auto">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Menu</h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-xl text-red-500 p-1 rounded-full hover:bg-red-50"
                  >
                    <FaTimes />
                  </button>
                </div>

                <nav className="flex flex-col gap-4 text-base-content">
                  {navItems}

                  {/* Mobile Notification Section - Show for ANY logged in user */}
                  {user && (
                    <div className="mt-2 mb-2 p-3 bg-gray-50 rounded-lg border">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">
                          Notifications
                        </span>
                        <NotificationBell />
                      </div>
                      <p className="text-xs text-gray-500">
                        Tap the bell to see new subscribers
                      </p>
                    </div>
                  )}

                  <hr className="my-2" />

                  {/* Theme Toggle */}
                  <button
                    onClick={toggleTheme}
                    className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 transition-colors"
                  >
                    <span className="text-lg">
                      {theme === "light" ? "🌙" : "☀️"}
                    </span>
                    <span>
                      {theme === "light" ? "Dark Mode" : "Light Mode"}
                    </span>
                  </button>

                  {/* Auth Buttons */}
                  {user ? (
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        handleLogout();
                      }}
                      className="btn bg-orange-400 text-white hover:bg-orange-500 mt-2 border-none"
                    >
                      Logout
                    </button>
                  ) : (
                    <div className="flex flex-col gap-2 mt-2">
                      <Link
                        to="/login"
                        onClick={() => setIsOpen(false)}
                        className="btn btn-outline border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white"
                      >
                        Login
                      </Link>
                      <Link
                        to="/register"
                        onClick={() => setIsOpen(false)}
                        className="btn bg-orange-400 text-white hover:bg-orange-500 border-none"
                      >
                        Register
                      </Link>
                    </div>
                  )}
                </nav>
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
};

export default Navbar;
