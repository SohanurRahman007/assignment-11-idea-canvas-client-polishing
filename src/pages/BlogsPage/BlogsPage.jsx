import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import { AuthContext } from "../../provider/AuthProvider";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const categories = ["All", "Tech", "Life", "Education", "Business"];

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const { loading, user } = useContext(AuthContext);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    try {
      const params = {};
      if (category !== "All") params.category = category;
      if (search.trim()) params.search = search.trim();

      const res = await axios.get("http://localhost:3000/blogs", { params });
      let data = res.data;

      // Prioritize matching title first
      if (search.trim()) {
        data = [
          ...data.filter((b) =>
            b.title.toLowerCase().startsWith(search.toLowerCase())
          ),
          ...data.filter(
            (b) =>
              !b.title.toLowerCase().startsWith(search.toLowerCase()) &&
              b.title.toLowerCase().includes(search.toLowerCase())
          ),
        ];
      }

      setBlogs(data);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [category, search]);

  const handleWishlist = async (blog) => {
    if (!user?.email) {
      return toast.error("Please login to add to wishlist");
    }

    try {
      const res = await axios.post("http://localhost:3000/wishlist", {
        blogId: blog._id,
        userEmail: user.email,
      });

      if (res.data.success) {
        toast.success("Added to wishlist");
      } else {
        toast(res.data.message || "Already in wishlist");
      }
    } catch (error) {
      toast.error("Error adding to wishlist");
    }
  };

  if (loading) return <Loading />;

  return (
    <section className=" mx-auto py-10">
      <h1 className="text-2xl text-center md:text-3xl lg:text-4xl font-bold text-orange-500">
        Explore Insightful Blog Posts
      </h1>
      <p className="text-base-content mt-1.5 max-w-2xl mx-auto text-center mb-8">
        Dive into a curated selection of blogs on tech, lifestyle, education,
        and business. Stay informed, inspired, and up-to-date with the latest
        ideas and stories from our growing community.
      </p>
      {/* Filter and Search */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-orange-400 px-4 py-2 rounded-sm shadow-sm text-gray-700 dark:text-white bg-white dark:bg-gray-800"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat === "All" ? "" : cat}>
              {cat}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-orange-400 px-4 py-2 rounded-sm shadow-sm w-full md:w-1/2 bg-white dark:bg-gray-800 text-gray-700 dark:text-white"
        />
      </div>

      {/* Blog Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {blogs.map((blog, index) => (
          <motion.div
            key={blog._id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
            className="rounded-sm shadow-sm bg-white dark:bg-gray-900 dark:text-white overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-56 object-cover"
            />

            <div className="flex flex-col justify-between p-5 flex-grow">
              <div>
                <h2 className="text-xl font-bold text-orange-600 dark:text-orange-400 mb-1">
                  {blog.title}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  {blog.shortDescription?.slice(0, 100)}...
                </p>
                <p className="text-xs text-orange-500">
                  Category: {blog.category}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-4">
                <button
                  onClick={() => navigate(`/blog/${blog._id}`)}
                  className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold py-2 rounded-md transition-all duration-200 cursor-pointer"
                >
                  Details
                </button>
                <button
                  onClick={() => handleWishlist(blog)}
                  className="border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white text-sm font-semibold py-2 rounded-md transition-all duration-200 cursor-pointer"
                >
                  Wishlist
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default BlogsPage;
