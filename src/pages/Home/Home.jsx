import React from "react";
import Slider from "../../components/Slider/Slider";
import Banner from "../../components/Banner/Banner";
import QuickTips from "../../components/QuickTips/QuickTips";
import RecentBlogs from "../../components/RecentBlogs/RecentBlogs";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <RecentBlogs></RecentBlogs>
      <Slider></Slider>
      <QuickTips></QuickTips>
    </div>
  );
};

export default Home;
