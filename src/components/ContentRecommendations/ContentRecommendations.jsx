// components/ContentRecommendations/ContentRecommendations.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { TrendingUp, Sparkles, Calendar, Heart } from "lucide-react";

const ContentRecommendations = ({
  currentBlogId,
  userEmail,
  type = "related",
}) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setError(null);
        let endpoint = "";
        let response;

        if (type === "personalized" && userEmail) {
          endpoint = `/personalized-recommendations/${userEmail}`;
          response = await axios.get(endpoint);
        } else if (currentBlogId) {
          endpoint = `/recommendations/${currentBlogId}`;
          response = await axios.get(endpoint);
        } else {
          // Fallback to recent blogs
          response = await axios.get("/recent");
        }

        // Handle different response structures
        let recommendationsData = [];

        if (response.data && Array.isArray(response.data)) {
          // If response.data is directly an array
          recommendationsData = response.data;
        } else if (
          response.data &&
          response.data.blogs &&
          Array.isArray(response.data.blogs)
        ) {
          // If response.data has a blogs property that's an array
          recommendationsData = response.data.blogs;
        } else if (
          response.data &&
          response.data.success &&
          Array.isArray(response.data.data)
        ) {
          // If response.data has success and data properties
          recommendationsData = response.data.data;
        } else {
          console.warn("Unexpected API response structure:", response.data);
          recommendationsData = [];
        }

        // Ensure we have an array and limit to 4 items
        setRecommendations(
          Array.isArray(recommendationsData)
            ? recommendationsData.slice(0, 4)
            : []
        );
      } catch (error) {
        console.error("Error fetching recommendations:", error);
        setError("Failed to load recommendations");
        // Fallback to empty array
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
            <div className="h-4 bg-orange-200 rounded w-32"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card bg-base-100 border border-orange-200 rounded-xl p-6"
      >
        <div className="text-center py-8">
          <TrendingUp className="mx-auto text-orange-500 mb-3" size={32} />
          <p className="text-base-content">Unable to load recommendations</p>
          <p className="text-sm text-base-content opacity-70 mt-2">{error}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card bg-base-100 border border-orange-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-orange-500 rounded-lg">
          {type === "personalized" ? (
            <Sparkles className="text-white" size={24} />
          ) : (
            <TrendingUp className="text-white" size={24} />
          )}
        </div>
        <div>
          <h3 className="text-xl font-bold text-orange-500">
            {type === "personalized"
              ? "Recommended For You"
              : "You Might Also Like"}
          </h3>
          <p className="text-base-content text-sm">
            {type === "personalized"
              ? "Based on your reading history"
              : "Similar content you might enjoy"}
          </p>
        </div>
      </div>

      {/* Recommendations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recommendations.length > 0 ? (
          recommendations.map((blog, index) => {
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
          })
        ) : (
          <div className="col-span-2 text-center py-8">
            <TrendingUp className="mx-auto text-orange-500 mb-3" size={32} />
            <p className="text-base-content">
              No recommendations available yet
            </p>
            <p className="text-sm text-base-content opacity-70">
              {type === "personalized"
                ? "Start reading more blogs to get personalized recommendations"
                : "Check back later for more recommendations"}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ContentRecommendations;
