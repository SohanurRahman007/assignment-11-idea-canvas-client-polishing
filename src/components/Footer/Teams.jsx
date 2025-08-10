import React from "react";
import { motion } from "framer-motion";

const teamMembers = [
  {
    name: "Sohanur Rahman",
    role: "Frontend Developer",
    image: "https://i.ibb.co/7dgc2fMx/sohan2.jpg",
  },
  {
    name: "Aisha Khan",
    role: "UI/UX Designer",
    image: "https://i.ibb.co/Kc3C8B0t/slider-4.jpg",
  },
  {
    name: "Riyad Ahmed",
    role: "Backend Developer",
    image: "https://i.ibb.co/VLQs5ZN/irene-strong-v2a-Knj-Mb-P-k-unsplash.jpg",
  },
  {
    name: "Fatima Noor",
    role: "Project Manager",
    image: "https://i.ibb.co/h2vmGg8/download-4.jpg",
  },
];

const Teams = () => {
  return (
    <section className="mt-6 text-base-content mb-6 md:rounded-sm bg-base-100 py-16">
      <div className=" mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold text-orange-500 mb-4">
          Meet Our Team
        </h2>
        <p className="text-base-content max-w-xl mx-auto">
          Our team is composed of passionate professionals dedicated to bringing
          your ideas to life with precision and creativity.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {teamMembers.map((member, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            className="bg-base-100 rounded-sm shadow shadow-orange-300 hover:shadow-md p-6 text-center"
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-24 h-24 mx-auto rounded-full mb-4 object-cover"
            />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              {member.name}
            </h3>
            <p className="text-sm text-orange-500">{member.role}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Teams;
