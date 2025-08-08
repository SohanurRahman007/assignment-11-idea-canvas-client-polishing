import React from "react";
import { motion } from "framer-motion";

const BlogCard = ({ blog, index, onWishlistClick, onDetailsClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, duration: 0.4 }}
      className="bg-base-100 rounded-sm shadow-sm shadow-orange-300 flex flex-col h-full"
    >
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full rounded-t-sm h-56 object-cover"
      />
      <div className="flex flex-col justify-between p-5 flex-grow">
        <div>
          <h2 className="text-xl font-bold text-orange-500 mb-1">
            {blog.title}
          </h2>
          <p className="text-sm text-base-content mb-2">
            {blog.shortDescription?.slice(0, 100)}...
          </p>
          <p className="text-xs text-orange-500">Category: {blog.category}</p>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-auto pt-4">
          <button
            onClick={onDetailsClick}
            className="bg-orange-500 hover:bg-orange-600 text-white text-sm py-2 rounded-sm cursor-pointer"
          >
            Details
          </button>
          <button
            onClick={() => onWishlistClick(blog)}
            className="border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white text-sm py-2 rounded-sm cursor-pointer"
          >
            Wishlist
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogCard;
