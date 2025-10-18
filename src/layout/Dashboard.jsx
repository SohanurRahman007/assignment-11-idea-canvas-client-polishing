import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import Loading from "../components/Loading/Loading";
import { motion } from "framer-motion";

// StatCard component matching your RecentBlogs design
const StatCard = ({ title, value, icon, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: delay, duration: 0.5 }}
    whileHover={{ scale: 1.02 }}
    className="card bg-base-100 shadow-sm border border-orange-200 transition-all duration-300 hover:shadow-sm group p-6"
  >
    <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
      <div className="text-3xl text-orange-500 transform transition-transform duration-300 group-hover:scale-110">
        {icon}
      </div>
      <div>
        <h3 className="text-2xl font-bold text-orange-500">{value}</h3>
        <p className="text-base-content text-sm mt-1">{title}</p>
      </div>
    </div>
  </motion.div>
);

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    totalBlogs: 0,
    totalWishlist: 0,
    totalLikes: 0,
    totalComments: 0,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        const blogsCountRes = await fetch(
          "https://b11a11-server-side-sohanpk24.vercel.app/blogs/count"
        );
        const blogsCountData = await blogsCountRes.json();

        const likesCountRes = await fetch(
          "https://b11a11-server-side-sohanpk24.vercel.app/likes/count"
        );
        const likesCountData = await likesCountRes.json();

        const commentsCountRes = await fetch(
          "https://b11a11-server-side-sohanpk24.vercel.app/comments/count"
        );
        const commentsCountData = await commentsCountRes.json();

        let wishlistData = [];
        if (user?.email) {
          const wishlistRes = await fetch(
            `https://b11a11-server-side-sohanpk24.vercel.app/wishlist?email=${user.email}`
          );
          wishlistData = await wishlistRes.json();
        }

        setDashboardData({
          totalBlogs: blogsCountData.count,
          totalLikes: likesCountData.count,
          totalComments: commentsCountData.count,
          totalWishlist: wishlistData.length,
        });
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [user?.email]);

  if (isLoading) return <Loading />;

  return (
    <div className="p-6 bg-base-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Dashboard Header - Matching RecentBlogs header style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-orange-500">
            Welcome, {user?.displayName || "User"}!
          </h1>
          <p className="text-base-content mt-1.5 max-w-2xl mx-auto">
            This is your personal dashboard. Here's a quick overview of your
            activity.
          </p>
        </motion.div>

        {/* Dashboard Stats Grid - Same grid as RecentBlogs */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard
            title="Total Blogs"
            value={dashboardData.totalBlogs}
            icon="📰"
            delay={0.1}
          />
          <StatCard
            title="Wishlist Items"
            value={dashboardData.totalWishlist}
            icon="🔖"
            delay={0.2}
          />
          <StatCard
            title="Total Likes"
            value={dashboardData.totalLikes}
            icon="❤️"
            delay={0.3}
          />
          <StatCard
            title="Total Comments"
            value={dashboardData.totalComments}
            icon="💬"
            delay={0.4}
          />
        </div>

        {/* Thank You Message Section - Matching card style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="card bg-base-100 shadow-sm border border-orange-200 p-8 text-center"
        >
          <h2 className="text-2xl font-bold text-orange-500 mb-2">
            Thank you for being a valuable member!
          </h2>
          <p className="text-base-content">
            We appreciate your contributions and activity. Your involvement
            makes our community thrive.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
