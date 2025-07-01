import React, { useContext, useEffect, useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { AuthContext } from "../../provider/AuthProvider";
import Swal from "sweetalert2";
import logo from "../../assets/logo/logo.png";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

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
        Swal.fire("Error!", "Logout failed.", "error");
      }
    }
  };

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
        </>
      )}
    </>
  );

  return (
    <>
      <nav className="bg-base-100 sticky top-0 z-50 shadow-md w-full">
        <div className="max-w-screen-xl mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="w-10 h-10 rounded-sm" />
            <span className="text-xl font-bold text-base-content">
              Idea <span className="text-orange-400">Canvas</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex gap-6 text-base-content">{navItems}</ul>

          {/* Right Side (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            <button onClick={toggleTheme} className="text-xl">
              {theme === "light" ? "🌙" : "☀️"}
            </button>

            {user ? (
              <div className="flex items-center gap-2">
                <div
                  title={user.displayName}
                  className="w-10 h-10 rounded-full border overflow-hidden"
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="User"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FaUserCircle className="text-2xl text-base-content" />
                  )}
                </div>
                <button
                  onClick={handleLogout}
                  className="btn btn-sm bg-orange-400 text-white hover:bg-orange-500"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link to="/login" className="hover:text-orange-400">
                  Login
                </Link>
                <Link to="/register" className="hover:text-orange-400">
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden text-2xl"
          >
            <FaBars />
          </button>
        </div>
      </nav>

      {/* Drawer with outside click & transparent overlay */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 md:hidden"
          onClose={setIsOpen}
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
              {/* Transparent overlay to close on click */}
              <Dialog.Overlay
                className="fixed inset-0 bg-black/40"
                onClick={() => setIsOpen(false)}
              />
              {/* Drawer content */}
              <div className="relative bg-base-100 w-64 p-6 shadow-lg z-50">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Menu</h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-xl text-red-500"
                  >
                    <FaTimes />
                  </button>
                </div>

                <nav className="flex flex-col gap-4 text-base-content">
                  {navItems}
                  <hr />
                  {user ? (
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        handleLogout();
                      }}
                      className="btn bg-orange-400 text-white hover:bg-orange-500 mt-2"
                    >
                      Logout
                    </button>
                  ) : (
                    <>
                      <Link to="/login" onClick={() => setIsOpen(false)}>
                        Login
                      </Link>
                      <Link to="/register" onClick={() => setIsOpen(false)}>
                        Register
                      </Link>
                    </>
                  )}
                  <button onClick={toggleTheme}>
                    {theme === "light" ? "Dark Mode 🌙" : "Light Mode ☀️"}
                  </button>
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
