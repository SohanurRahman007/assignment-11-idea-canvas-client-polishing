import { motion } from "framer-motion";
import { FaPenNib, FaChartLine, FaBookmark } from "react-icons/fa";

const features = [
  {
    icon: <FaPenNib />,
    title: "Powerful Writing Tools",
    desc: "Easily draft, format, and edit your posts with a modern and intuitive writing interface.",
  },
  {
    icon: <FaChartLine />,
    title: "Analytics & Growth",
    desc: "Track views, engagement, and more to understand how your content is performing.",
  },
  {
    icon: <FaBookmark />,
    title: "Save & Curate Content",
    desc: "Bookmark favorite articles, create wishlists, and keep your reading organized.",
  },
];

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.5,
      type: "spring",
    },
  }),
};

const WhatYoullGet = () => {
  return (
    <section className="mt-12  mb-15">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-orange-500">
          What You’ll Get with IdeaCanvas
        </h2>
        <p className="text-base-content mt-1.5 mb-6 max-w-2xl mx-auto">
          Whether you're a beginner or a pro, our platform offers everything you
          need to write, grow, and connect with your audience.
        </p>

        <div className="grid md:grid-cols-3 gap-8 text-left">
          {features.map((item, i) => (
            <motion.div
              key={i}
              className=" p-6 rounded-sm shadow-sm shadow-orange-300 "
              custom={i}
              variants={cardVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="text-3xl text-orange-500 mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-base-content">
                {item.title}
              </h3>
              <p className="text-sm text-base-content">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatYoullGet;
