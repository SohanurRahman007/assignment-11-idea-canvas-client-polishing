import React from "react";
import { motion } from "framer-motion";

const tips = [
  "Write consistently – even 10 mins a day helps!",
  "Use high-quality images in your blog posts.",
  "Add personal stories to connect with your readers.",
  "Optimize your post title for SEO and clarity.",
  "Keep paragraphs short and easy to scan.",
  "Engage with your readers in the comments.",
];

const QuickTips = () => {
  return (
    <motion.section
      className="py-12 shadow-sm rounded-md"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: false, amount: 0.4 }}
    >
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-3 mt-4 text-orange-600">
          Quick Tips for You
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tips.map((tip, index) => (
            <motion.div
              key={index}
              className="bg-gray-50 border-l-4 border-orange-500 p-4 shadow-sm rounded-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              viewport={{ once: true }}
            >
              <p className="text-gray-800">{tip}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default QuickTips;
