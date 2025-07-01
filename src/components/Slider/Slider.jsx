import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const slides = [
  {
    src: "https://i.ibb.co/jP3rQ06z/slider-4.jpg",
    title: "Creative Ideas",
    description: "Discover innovative ideas to boost your creativity daily.",
  },
  {
    src: "https://i.ibb.co/k2JLwQcV/banner-1.jpg",
    title: "Personal Growth Journeys",
    description:
      "Explore inspiring stories of transformation and self-discovery.",
  },
  {
    src: "https://i.ibb.co/Nd2dFGQF/slider-5.jpg",
    title: "Tech Tutorials",
    description: "Learn cutting-edge skills with expert-led tech tutorials.",
  },
  {
    src: "https://i.ibb.co/PzrzJ48j/slider-1.jpg",
    title: "Community Insights",
    description: "Dive into the latest trends and insights from our community.",
  },

  {
    src: "https://i.ibb.co/twwNxg9h/slider-3.jpg",
    title: "Expert Opinions",
    description: "Get inspired by thought leaders and industry experts.",
  },
];

const SliderSection = () => {
  return (
    <section className="mt-18 md:pt-10 shadow-sm shadow-orange-300 mb-10 ">
      <div className=" mx-auto flex flex-col lg:flex-row items-center gap-10">
        {/* Text Left Side (40%) */}
        <div className="w-full md:p-4 lg:w-2/5 space-y-5 text-center lg:text-left">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-orange-500">
            Discover Inspiring Stories
          </h2>
          <p className="text-base-content mt-1.5 max-w-2xl mx-auto">
            From personal growth journeys to tech tutorials, explore a curated
            selection of powerful posts handpicked just for you. Stay inspired,
            stay informed with fresh ideas, expert opinions, and trending topics
            from our vibrant community.
          </p>
        </div>

        {/* Slider Right Side (60%) */}
        <div className="w-full lg:w-3/5">
          <Swiper
            direction="vertical"
            slidesPerView={1}
            spaceBetween={30}
            mousewheel={true}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            modules={[Mousewheel, Pagination, Autoplay]}
            className="h-[460px] "
          >
            {slides.map((slide, i) => (
              <SwiperSlide key={i}>
                <div className="relative w-full h-[420px] rounded-sm overflow-hidden shadow-sm">
                  <img
                    src={slide.src}
                    alt={slide.title}
                    className="w-full h-full object-cover brightness-90"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-6 flex flex-col justify-end">
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {slide.title}
                    </h3>
                    <p className="text-white/90">{slide.description}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default SliderSection;
