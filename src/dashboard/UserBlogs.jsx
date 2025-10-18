import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { motion } from "framer-motion";
import {
  Calendar,
  Heart,
  MessageCircle,
  Eye,
  BarChart3,
  FileText,
  TrendingUp,
  Clock,
} from "lucide-react";
import axios from "axios";
// import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Loading from "../components/Loading/Loading";

const UserBlogs = () => {
  const { user } = useContext(AuthContext);
  const [userBlogs, setUserBlogs] = useState([]);
  const [userStats, setUserStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  const API_BASE_URL = "http://localhost:3000";

  useEffect(() => {
    if (user?.email) {
      fetchUserBlogs();
      fetchUserStats();
    }
  }, [user]);

  const fetchUserBlogs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${API_BASE_URL}/user/blogs/${user.email}`
      );
      if (response.data.success) {
        setUserBlogs(response.data.blogs);
      }
    } catch (error) {
      console.error("Error fetching user blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserStats = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/user/stats/${user.email}`
      );
      if (response.data.success) {
        setUserStats(response.data.stats);
      }
    } catch (error) {
      console.error("Error fetching user stats:", error);
    }
  };

  const filteredBlogs = userBlogs.filter((blog) => {
    if (activeTab === "all") return true;
    if (activeTab === "popular") return blog.likes >= 10;
    if (activeTab === "recent") {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      return new Date(blog.createdAt) > oneWeekAgo;
    }
    return true;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-base-100 py-8">
      <Helmet>
        <title>My Blogs | Idea Canvas</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-orange-500 mb-4">
            My Blog Dashboard
          </h1>
          <p className="text-base-content text-lg max-w-2xl mx-auto">
            Manage and track the performance of your published articles
          </p>
        </motion.div>

        {/* Statistics Cards */}
        {userStats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            {/* Total Blogs Card */}
            <div className="card bg-base-100 border border-orange-200 p-6 hover:shadow-lg transition-all duration-300 group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-base-content text-sm font-medium">
                    Total Blogs
                  </p>
                  <h3 className="text-3xl font-bold text-orange-500 mt-2">
                    {userStats.totalBlogs}
                  </h3>
                </div>
                <div className="p-3 bg-orange-500 rounded-lg group-hover:scale-110 transition-transform">
                  <FileText className="text-white" size={24} />
                </div>
              </div>
            </div>

            {/* Total Likes Card */}
            <div className="card bg-base-100 border border-orange-200 p-6 hover:shadow-lg transition-all duration-300 group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-base-content text-sm font-medium">
                    Total Likes
                  </p>
                  <h3 className="text-3xl font-bold text-orange-500 mt-2">
                    {userStats.totalLikes}
                  </h3>
                </div>
                <div className="p-3 bg-orange-500 rounded-lg group-hover:scale-110 transition-transform">
                  <Heart className="text-white" size={24} />
                </div>
              </div>
            </div>

            {/* Total Comments Card */}
            <div className="card bg-base-100 border border-orange-200 p-6 hover:shadow-lg transition-all duration-300 group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-base-content text-sm font-medium">
                    Total Comments
                  </p>
                  <h3 className="text-3xl font-bold text-orange-500 mt-2">
                    {userStats.totalComments}
                  </h3>
                </div>
                <div className="p-3 bg-orange-500 rounded-lg group-hover:scale-110 transition-transform">
                  <MessageCircle className="text-white" size={24} />
                </div>
              </div>
            </div>

            {/* Most Popular Blog Card */}
            <div className="card bg-base-100 border border-orange-200 p-6 hover:shadow-lg transition-all duration-300 group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-base-content text-sm font-medium">
                    Most Popular
                  </p>
                  <h3 className="text-lg font-bold text-orange-500 mt-2 truncate">
                    {userStats.mostPopularBlog?.title || "N/A"}
                  </h3>
                  <p className="text-base-content text-sm mt-1">
                    {userStats.mostPopularBlog?.likes || 0} likes
                  </p>
                </div>
                <div className="p-3 bg-orange-500 rounded-lg group-hover:scale-110 transition-transform">
                  <TrendingUp className="text-white" size={24} />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {[
            { id: "all", label: "All Blogs", count: userBlogs.length },
            {
              id: "popular",
              label: "Popular",
              count: userBlogs.filter((b) => b.likes >= 10).length,
            },
            {
              id: "recent",
              label: "Recent",
              count: userBlogs.filter((b) => {
                const oneWeekAgo = new Date();
                oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
                return new Date(b.createdAt) > oneWeekAgo;
              }).length,
            },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-orange-500 text-white"
                  : "bg-base-200 text-base-content hover:bg-base-300"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`px-2 py-1 text-xs rounded-full ${
                  activeTab === tab.id
                    ? "bg-orange-600 text-white"
                    : "bg-base-300 text-base-content"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Blogs Grid */}
        {filteredBlogs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <FileText className="mx-auto text-orange-500 mb-4" size={64} />
            <h3 className="text-2xl font-bold text-orange-500 mb-2">
              No Blogs Found
            </h3>
            <p className="text-base-content mb-6">
              {activeTab === "all"
                ? "You haven't published any blogs yet."
                : `No blogs match the "${activeTab}" filter.`}
            </p>
            <Link
              to="/addBlog"
              className="btn bg-orange-500 hover:bg-orange-600 text-white border-none font-semibold px-6"
            >
              Write Your First Blog
            </Link>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredBlogs.map((blog, index) => (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="card bg-base-100 border border-orange-200 overflow-hidden group hover:shadow-lg transition-all duration-300"
              >
                {/* Blog Image */}
                <figure className="overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </figure>

                {/* Blog Content */}
                <div className="card-body p-6">
                  {/* Category */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="badge bg-orange-500 text-white border-none">
                      {blog.category}
                    </span>
                    <div className="flex items-center gap-1 text-base-content text-sm">
                      <Calendar size={14} />
                      <span>{formatDate(blog.createdAt)}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="card-title text-lg font-bold text-orange-500 line-clamp-2 mb-3">
                    {blog.title}
                  </h3>

                  {/* Short Description */}
                  <p className="text-base-content text-sm line-clamp-3 mb-4">
                    {blog.shortDescription}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-base-content text-sm">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Heart size={16} className="text-red-500" />
                        <span>{blog.likes || 0}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle size={16} className="text-blue-500" />
                        <span>{blog.commentCount || 0}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye size={16} className="text-green-500" />
                        <span>{blog.views || 0}</span>
                      </div>
                    </div>

                    {/* Read More Button */}
                    <Link
                      to={`/blog/${blog._id}`}
                      className="btn btn-sm bg-orange-500 hover:bg-orange-600 text-white border-none font-semibold"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Performance Insights */}
        {userBlogs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 card bg-base-100 border border-orange-200 p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className="text-orange-500" size={24} />
              <h2 className="text-2xl font-bold text-orange-500">
                Performance Insights
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Engagement Rate */}
              <div className=" rounded-lg p-4">
                <h4 className="font-semibold text-orange-500 mb-2">
                  Engagement Rate
                </h4>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-orange-200 rounded-full h-2">
                    <div
                      className="bg-orange-500 h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min(
                          (userStats?.totalLikes /
                            (userStats?.totalBlogs * 10)) *
                            100 || 0,
                          100
                        )}%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-orange-500 font-bold">
                    {Math.round(
                      (userStats?.totalLikes / (userStats?.totalBlogs * 10)) *
                        100 || 0
                    )}
                    %
                  </span>
                </div>
                <p className="text-sm text-base-content mt-2">
                  Based on likes per blog
                </p>
              </div>

              {/* Average Performance */}
              <div className=" rounded-lg p-4">
                <h4 className="font-semibold text-orange-500 mb-2">
                  Average Performance
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Likes per blog:</span>
                    <span className="font-semibold text-orange-500">
                      {userStats
                        ? Math.round(
                            userStats.totalLikes / userStats.totalBlogs
                          )
                        : 0}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Comments per blog:</span>
                    <span className="font-semibold text-orange-500">
                      {userStats
                        ? Math.round(
                            userStats.totalComments / userStats.totalBlogs
                          )
                        : 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default UserBlogs;
