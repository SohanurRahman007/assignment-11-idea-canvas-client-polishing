import { Toaster } from "react-hot-toast";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router";

const MainLayouts = () => {
  return (
    <>
      <Navbar></Navbar>
      <div className="md:w-7xl mx-auto">
        <Toaster position="top-right" reverseOrder={false} />
        <div className="min-h-[calc(100vh-160px)]">
          <Outlet></Outlet>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default MainLayouts;
