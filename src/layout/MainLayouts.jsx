import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router";

const MainLayouts = () => {
  return (
    <div className="md:w-7xl mx-auto">
      <Navbar></Navbar>
      <div className="min-h-[calc(100vh-160px)]">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default MainLayouts;
