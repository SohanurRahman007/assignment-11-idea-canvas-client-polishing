import React from "react";
import Slider from "../../components/Slider/Slider";
import Banner from "../../components/Banner/Banner";
import QuickTips from "../../components/QuickTips/QuickTips";
import RecentBlogs from "../../components/RecentBlogs/RecentBlogs";
import Newsletter from "../../components/Newsletter/Newsletter";
import WhatYoullGet from "../../components/WhatYoullGet/WhatYoullGet";
import { Helmet } from "react-helmet-async";
import FeaturedPost from "../../components/FeaturedPost/FeaturedPost";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home | Idea Canvas</title>
      </Helmet>
      <Banner></Banner>
      <RecentBlogs></RecentBlogs>
      <Slider></Slider>
      <QuickTips></QuickTips>
      <FeaturedPost />
      <WhatYoullGet></WhatYoullGet>
      <Newsletter></Newsletter>
    </div>
  );
};

export default Home;
