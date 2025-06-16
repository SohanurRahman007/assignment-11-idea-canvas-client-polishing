import React from "react";
import Slider from "../../components/Slider/Slider";
import Banner from "../../components/Banner/Banner";
import QuickTips from "../../components/QuickTips/QuickTips";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Slider></Slider>
      <QuickTips></QuickTips>
    </div>
  );
};

export default Home;
