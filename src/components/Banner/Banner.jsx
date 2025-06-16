import React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
// import "./Banner.css"; // Optional

const animation = { duration: 20000, easing: (t) => t };

const Banner = () => {
  const [sliderRef] = useKeenSlider({
    loop: true,
    renderMode: "performance",
    drag: false,
    created(s) {
      s.moveToIdx(5, true, animation);
    },
    updated(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation);
    },
    animationEnded(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation);
    },
  });
  return (
    <>
      <h2 className="text-3xl font-bold text-center mb-3 mt-4 text-orange-600">
        Welcome to Our Blog World
      </h2>
      <p className="text-center text-gray-600 mb-8 max-w-xl mx-auto">
        Explore trending topics, expert opinions, and engaging stories curated
        just for you.
      </p>
      <div ref={sliderRef} className="keen-slider shadow-sm rounded-md">
        <div className="keen-slider__slide number-slide1 ">
          <img
            src="https://i.ibb.co/chXPT3NT/banner-6-Copy.jpg"
            className="w-full object-cover"
            alt=""
          />
        </div>
        <div className="keen-slider__slide number-slide2 ">
          <img
            src="https://i.ibb.co/fzD3Jyx0/banner-5-Copy.jpg"
            className="w-full object-cover"
            alt=""
          />
        </div>
        <div className="keen-slider__slide number-slide3 ">
          <img
            src="https://i.ibb.co/67ZVP36K/banner-4-Copy.jpg"
            className="w-full object-cover"
            alt=""
          />
        </div>
        <div className="keen-slider__slide number-slide4 ">
          <img
            src="https://i.ibb.co/BVqtvvRn/banner-3.jpg"
            className="w-full "
            alt=""
          />
        </div>
        <div className="keen-slider__slide number-slide5 ">
          <img
            src="https://i.ibb.co/VprcD2Lj/banner-2.jpg"
            className="w-full object-cover"
            alt=""
          />
        </div>
        <div className="keen-slider__slide number-slide6 ">
          <img
            src="https://i.ibb.co/5gNLhWph/banner-1.jpg"
            className="w-full object-cover"
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default Banner;
