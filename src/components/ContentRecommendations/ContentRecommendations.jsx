// components/ContentRecommendations/ContentRecommendations.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { TrendingUp, Calendar, Heart } from "lucide-react";

const ContentRecommendations = ({
  currentBlogId,
  userEmail,
  type = "related",
}) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);

        // Always use recent blogs for now (since recommendation APIs are not implemented)
        const endpoint = `https://b11a11-server-side-sohanpk24.vercel.app/recent`;

        console.log("Fetching recent blogs for recommendations");

        const response = await axios.get(endpoint);

        // Handle response data
        let recommendationsData = [];

        if (Array.isArray(response.data)) {
          recommendationsData = response.data;
        } else {
          recommendationsData = [];
        }

        console.log("Recommendations data:", recommendationsData);

        // Remove current blog from recommendations if it exists
        const filteredRecommendations = recommendationsData.filter(
          (blog) => blog._id !== currentBlogId
        );

        // Show only 4 recommendations
        setRecommendations(filteredRecommendations.slice(0, 4));
      } catch (error) {
        console.error("Error fetching recommendations:", error);
        setRecommendations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [currentBlogId, userEmail, type]);

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown date";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "Unknown date";
    }
  };

  // Safe data access with fallbacks
  const getBlogData = (blog) => ({
    _id: blog._id || blog.id || `fallback-${Math.random()}`,
    title: blog.title || "Untitled Blog",
    image: blog.image || "https://source.unsplash.com/400x300/?blog,writing",
    category: blog.category || "General",
    likes: blog.likes || 0,
    createdAt: blog.createdAt || blog.createdDate || new Date().toISOString(),
  });

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card bg-base-100 border border-orange-200 rounded-xl p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-orange-500 rounded-lg">
            <TrendingUp className="text-white" size={24} />
          </div>
          <div className="animate-pulse">
            <div className="h-6 bg-orange-200 rounded w-48 mb-2"></div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-orange-200 rounded-lg h-32"
            ></div>
          ))}
        </div>
      </motion.div>
    );
  }

  // Don't show anything if no recommendations
  if (recommendations.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card bg-base-100 border border-orange-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
    >
      {/* Header - Simple */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-orange-500 rounded-lg">
          <TrendingUp className="text-white" size={24} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-orange-500">
            More Blogs You May Like
          </h3>
          {/* Removed the "Discover other interesting content" subtitle */}
        </div>
      </div>

      {/* Recommendations Grid - Show only 4 items */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {recommendations.slice(0, 4).map((blog, index) => {
          const blogData = getBlogData(blog);
          return (
            <motion.div
              key={blogData._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <Link
                to={`/blog/${blogData._id}`}
                className="block bg-base-100 rounded-lg border border-orange-200 hover:border-orange-500 p-4 hover:shadow-md transition-all duration-300 group"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={blogData.image}
                    alt={blogData.title}
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src =
                        "https://source.unsplash.com/400x300/?blog,writing";
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-orange-500 text-sm line-clamp-2 group-hover:text-orange-600 transition-colors">
                      {blogData.title}
                    </h4>

                    <div className="flex items-center gap-2 mt-2">
                      <span
                        className={`text-xs px-2 py-1 rounded-full border ${
                          blogData.category === "Technology"
                            ? "bg-blue-100 text-blue-800 border-blue-200"
                            : blogData.category === "Education"
                            ? "bg-green-100 text-green-800 border-green-200"
                            : blogData.category === "Business"
                            ? "bg-purple-100 text-purple-800 border-purple-200"
                            : "bg-orange-100 text-orange-800 border-orange-200"
                        }`}
                      >
                        {blogData.category}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-3 text-xs text-base-content">
                      <div className="flex items-center gap-1">
                        <Calendar size={12} />
                        <span>{formatDate(blogData.createdAt)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart size={12} className="text-red-500" />
                        <span>{blogData.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default ContentRecommendations;
