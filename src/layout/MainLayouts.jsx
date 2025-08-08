import { Toaster } from "react-hot-toast";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router";

const MainLayouts = () => {
  return (
    <>
      <Navbar></Navbar>
      <div className="w-full">
        <Toaster position="top-right" reverseOrder={false} />
        <div className="min-h-[calc(100vh-160px)] max-w-7xl mx-auto ">
          <Outlet></Outlet>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default MainLayouts;
