import React from "react";
import Slider from "../../components/Slider/Slider";
import Banner from "../../components/Banner/Banner";
import QuickTips from "../../components/QuickTips/QuickTips";
import RecentBlogs from "../../components/RecentBlogs/RecentBlogs";
import Newsletter from "../../components/Newsletter/Newsletter";
import WhatYoullGet from "../../components/WhatYoullGet/WhatYoullGet";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <RecentBlogs></RecentBlogs>
      <Slider></Slider>
      <QuickTips></QuickTips>
      <WhatYoullGet></WhatYoullGet>
      <Newsletter></Newsletter>
    </div>
  );
};

export default Home;
