import React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import "./Slider.css";

const carousel = (slider) => {
  const z = 300;
  function rotate() {
    const deg = 360 * slider.track.details.progress;
    slider.container.style.transform = `translateZ(-${z}px) rotateY(${-deg}deg)`;
  }
  slider.on("created", () => {
    const deg = 360 / slider.slides.length;
    slider.slides.forEach((element, idx) => {
      element.style.transform = `rotateY(${deg * idx}deg) translateZ(${z}px)`;
    });
    rotate();
  });
  slider.on("detailsChanged", rotate);
};

const Slider = () => {
  const [sliderRef] = useKeenSlider(
    {
      loop: true,
      selector: ".carousel__cell",
      renderMode: "custom",
      mode: "free-snap",
    },
    [carousel]
  );
  return (
    <>
      <div>
        <h2 className="text-3xl font-bold text-center mb-3 mt-4 text-orange-600">
          Discover Inspiring Stories
        </h2>
        <p className="text-center text-gray-600 mb-8 max-w-xl mx-auto">
          From personal growth journeys to tech tutorials, explore a rotating
          selection of powerful posts handpicked just for you. Stay inspired,
          stay informed.
        </p>
      </div>
      <div className="wrapper">
        <div className="scene">
          <div className="carousel keen-slider" ref={sliderRef}>
            <div className="carousel__cell number-slide1 ">
              <img src="https://i.ibb.co/m5zFghjR/slider-6.jpg" alt="" />
            </div>
            <div className="carousel__cell number-slide2">
              <img src="https://i.ibb.co/Kc3C8B0t/slider-4.jpg" alt="" />
            </div>
            <div className="carousel__cell number-slide3">
              <img src="https://i.ibb.co/SDRxBQnv/slider-5.jpg" alt="" />
            </div>
            <div className="carousel__cell number-slide4">
              <img src="https://i.ibb.co/7td6qc9M/slider-3.jpg" alt="" />
            </div>
            <div className="carousel__cell number-slide5">
              <img src="https://i.ibb.co/BHnjp7dD/slider-2.jpg" alt="" />
            </div>
            <div className="carousel__cell number-slide6">
              <img src=" https://i.ibb.co/7dSrBnnN/slider-1.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Slider;

//
//
//
//
//
