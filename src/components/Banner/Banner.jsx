import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/effect-fade";
import { Link } from "react-router";

const slides = [
  {
    img: "https://i.ibb.co/bFdk4ft/tatiana-zanon-VP2mjt-Jq-Wv-Y-unsplash.jpg",
    heading: "Unleash Your Creativity",
    desc: "Write, share, and inspire with your unique stories. Join a community passionate about ideas.",
  },
  {
    img: "https://i.ibb.co/JyShKKr/fareed-akhyear-chowdhury-x-Rl-ZUxp-Mp-Y4-unsplash.jpg",
    heading: "Discover New Voices",
    desc: "Explore diverse perspectives from bloggers around the globe and find your next read.",
  },
  {
    img: "https://i.ibb.co/tXV8Sf3/sumit-chinchane-j-WKk-0-ZBUyg-unsplash.jpg",
    heading: "Connect & Grow",
    desc: "Engage with readers and grow your influence through meaningful conversations.",
  },
];

const Banner = () => {
  return (
    <section className="w-full relative">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        loop
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        className="w-full h-[70vh] md:h-[80vh] rounded-sm overflow-hidden"
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <div className="w-full h-full relative">
              <img
                src={slide.img}
                alt={`Slide ${idx + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/60 flex items-center justify-start px-6 md:px-20">
                <motion.div
                  initial={{ opacity: 0, x: -60 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.9 }}
                  className="max-w-xl text-white"
                >
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 text-orange-400">
                    {slide.heading}
                  </h2>
                  <p className="text-base sm:text-lg md:text-xl leading-relaxed mb-6">
                    {slide.desc}
                  </p>
                  <Link to="/allBlogs">
                    <button className="bg-orange-400 hover:bg-orange-500 transition-colors duration-300 text-white font-semibold px-6 py-3 rounded shadow-lg cursor-pointer">
                      Explore Blogs
                    </button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Banner;
