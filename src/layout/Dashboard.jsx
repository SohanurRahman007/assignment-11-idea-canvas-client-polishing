import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import Loading from "../components/Loading/Loading";

// StatCard component for a clean, reusable UI element
const StatCard = ({ title, value, icon, color }) => (
  <div
    className={`p-6 rounded-2xl shadow-xl flex flex-col sm:flex-row items-center gap-4 text-white transform transition-transform hover:scale-105 duration-300 cursor-pointer ${color}`}
  >
    <div className="text-4xl text-white">{icon}</div>
    <div>
      <h3 className="text-2xl font-semibold text-white">{value}</h3>
      <p className="text-gray-100 text-sm">{title}</p>
    </div>
  </div>
);

const Dashboard = () => {
  // Get the user from your authentication context
  const { user } = useContext(AuthContext);

  // State to manage loading status
  const [isLoading, setIsLoading] = useState(true);

  // State to hold the dashboard data, initialized with zeros
  const [dashboardData, setDashboardData] = useState({
    totalBlogs: 0,
    totalWishlist: 0,
    totalLikes: 0,
    totalComments: 0,
  });

  useEffect(() => {
    // Asynchronous function to fetch all data from the API
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        // Fetch total blogs count
        const blogsCountRes = await fetch(
          "https://b11a11-server-side-sohanpk24.vercel.app/blogs/count"
        );
        const blogsCountData = await blogsCountRes.json();

        // Fetch total likes count
        const likesCountRes = await fetch(
          "https://b11a11-server-side-sohanpk24.vercel.app/likes/count"
        );
        const likesCountData = await likesCountRes.json();

        // Fetch total comments count
        const commentsCountRes = await fetch(
          "https://b11a11-server-side-sohanpk24.vercel.app/comments/count"
        );
        const commentsCountData = await commentsCountRes.json();

        console.log("comment", commentsCountData);

        // Fetch wishlist items for the current user
        // Ensure the user object exists and has an email before fetching
        let wishlistData = [];
        if (user?.email) {
          const wishlistRes = await fetch(
            `https://b11a11-server-side-sohanpk24.vercel.app/wishlist?email=${user.email}`
          );
          wishlistData = await wishlistRes.json();
        }

        // Update the state with the fetched data
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
    <div className="p-6 bg-gray-50  min-h-screen">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Dashboard Header */}
        <div className="bg-white  rounded-md shadow-orange-300 shadow-sm p-8 mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-orange-500 mb-2">
            Welcome, {user?.displayName || "User"}!
          </h1>
          <p className="text-base-content">
            This is your personal dashboard. Here's a quick overview of your
            activity.
          </p>
        </div>

        {/* Dashboard Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Blogs"
            value={dashboardData.totalBlogs}
            icon="📰"
            color="bg-blue-500"
          />
          <StatCard
            title="Wishlist Items"
            value={dashboardData.totalWishlist}
            icon="🔖"
            color="bg-green-500"
          />
          <StatCard
            title="Total Likes"
            value={dashboardData.totalLikes}
            icon="❤️"
            color="bg-red-500"
          />
          <StatCard
            title="Total Comments"
            value={dashboardData.totalComments}
            icon="💬"
            color="bg-purple-500"
          />
        </div>

        {/* Thank You Message Section */}
        <div className="bg-white rounded-md shadow-orange-300 shadow-sm p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Thank you for being a valuable member!
          </h2>
          <p className="text-lg text-gray-600">
            We appreciate your contributions and activity. Your involvement
            makes our community thrive.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
