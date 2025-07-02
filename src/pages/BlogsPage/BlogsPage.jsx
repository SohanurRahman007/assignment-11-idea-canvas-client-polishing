import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import { AuthContext } from "../../provider/AuthProvider";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const categories = ["All", "Tech", "Life", "Education", "Business"];

const BlogsPage = () => {
  const [allBlogs, setAllBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const { loading, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const params = {};
        if (category !== "All") params.category = category;

        const res = await axios.get(
          "https://b11a11-server-side-sohanpk24.vercel.app/blogs",
          { params }
        );
        setAllBlogs(res.data);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      }
    };

    fetchBlogs();
  }, [category]);

  useEffect(() => {
    const term = search.toLowerCase();

    const startsWithMatch = allBlogs.filter((b) =>
      b.title.toLowerCase().startsWith(term)
    );

    const includesMatch = allBlogs.filter(
      (b) =>
        !b.title.toLowerCase().startsWith(term) &&
        b.title.toLowerCase().includes(term)
    );

    setFilteredBlogs([...startsWithMatch, ...includesMatch]);
  }, [search, allBlogs]);

  const handleWishlist = async (blog) => {
    if (!user?.email) {
      return toast.error("Please login to add to wishlist");
    }

    try {
      const res = await axios.post(
        "https://b11a11-server-side-sohanpk24.vercel.app/wishlist",
        {
          blogId: blog._id,
          title: blog.title,
          image: blog.image,
          category: blog.category,
          userEmail: user.email,
        }
      );

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
    <section className="mx-auto py-10">
      <Helmet>
        <title>All Blogs | Idea Canvas</title>
      </Helmet>
      <h1 className="text-4xl font-bold text-orange-500 text-center mb-2">
        Explore Insightful Blog Posts
      </h1>
      <p className="text-base-content max-w-2xl mx-auto text-center mb-8">
        Dive into a curated selection of blogs on tech, lifestyle, education,
        and business. Stay informed and inspired with our growing community.
      </p>

      {/* Filter and Search */}
      <div className="flex flex-col md:flex-row justify-end items-center mb-10 gap-6">
        <div className="w-full md:w-1/3">
          <label className="block mb-1 text-base font-medium text-base-content">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 rounded-sm bg-base-100 border-2 border-gray-300 focus:outline-none focus:border-orange-500"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat === "All" ? "" : cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full md:w-2/3">
          <label className="block mb-1 text-base font-medium text-base-content">
            Search by Title
          </label>
          <input
            type="text"
            placeholder="Search blog by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 rounded-sm bg-base-100 border-2 border-gray-300 focus:outline-none focus:border-orange-500"
          />
        </div>
      </div>

      {/* Blog Cards */}
      {filteredBlogs.length === 0 ? (
        <p className="text-center text-base-content">No blogs found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {filteredBlogs.map((blog, index) => (
            <motion.div
              key={blog._id}
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
                  <p className="text-xs text-orange-500">
                    Category: {blog.category}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-auto pt-4">
                  <button
                    onClick={() => navigate(`/blog/${blog._id}`)}
                    className="bg-orange-500 hover:bg-orange-600 text-white text-sm py-2 rounded-sm cursor-pointer"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => handleWishlist(blog)}
                    className="border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white text-sm py-2 rounded-sm cursor-pointer"
                  >
                    Wishlist
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

export default BlogsPage;
