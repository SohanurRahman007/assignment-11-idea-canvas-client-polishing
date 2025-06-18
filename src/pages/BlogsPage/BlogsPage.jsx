import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const categories = ["All", "Tech", "Life", "Education", "Business"];

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    try {
      const params = {};
      if (category !== "All") params.category = category;
      if (search.trim()) params.search = search.trim();

      const res = await axios.get("http://localhost:3000/blogs", { params });
      setBlogs(res.data);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [category, search]);

  const handleWishlist = async (blogId) => {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      alert("Please login to add to wishlist");
      return;
    }

    try {
      await axios.post("http://localhost:3000/wishlist", { blogId, userEmail });
      alert("Added to wishlist");
    } catch (error) {
      alert("Error adding to wishlist");
      console.log(error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded w-full md:w-auto text-gray-500"
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
          className="border p-2 rounded w-full md:w-1/2"
        />
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className=" w-full rounded-md shadow-md dark:bg-gray-50 dark:text-gray-800 mx-auto"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="object-cover object-center w-full rounded-t-md h-72 dark:bg-gray-500"
            />
            <div className="flex flex-col justify-between p-6 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-wide">
                  {blog.title}
                </h2>
                <p className="text-sm text-gray-700">{blog.shortDescription}</p>
                <p className="text-xs text-gray-500">
                  Category: {blog.category}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => navigate(`/blog/${blog._id}`)}
                  type="button"
                  className="p-2 font-semibold rounded-md bg-orange-500 cursor-pointer text-white"
                >
                  Details
                </button>
                <button
                  onClick={() => handleWishlist(blog._id)}
                  type="button"
                  className="p-2 font-semibold rounded-md border border-orange-500 hover:bg-orange-500 hover:text-white"
                >
                  Wishlist
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogsPage;
