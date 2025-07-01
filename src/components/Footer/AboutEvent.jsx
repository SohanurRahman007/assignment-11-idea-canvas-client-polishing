import React from "react";
import { motion } from "framer-motion";

const AboutEvent = () => {
  return (
    <section className=" mt-6 text-base-content mb-6 md:rounded-sm bg-base-100 py-16 ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src="https://i.ibb.co/nNnNvty3/about-us.jpg"
            alt="About the Event"
            className="rounded-xl shadow-lg w-full"
          />
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-orange-500 mb-4">
            About the Event
          </h2>
          <p className="text-base-content mb-4 leading-relaxed">
            Join us for a transformative experience where innovation meets
            inspiration. The IdeaCanvas Event brings together creative minds,
            tech enthusiasts, and problem solvers to learn, connect, and
            collaborate.
          </p>
          <p className="text-base-content mb-4 leading-relaxed">
            Our mission is to empower individuals through hands-on workshops,
            expert-led sessions, and real-world project showcases. Whether
            you're a beginner or a pro, there's something for everyone.
          </p>
          <ul className="list-disc pl-5 text-base-content space-y-2">
            <li>💡 Keynote talks from industry leaders</li>
            <li>🛠️ Live coding & UI/UX workshops</li>
            <li>🤝 Networking & mentorship opportunities</li>
            <li>🏆 Showcase your ideas & win exciting prizes</li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutEvent;
