import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const RecentBlogs = ({ user }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/recent").then((res) => setBlogs(res.data));
  }, []);

  const handleWishlist = async (blogId) => {
    if (!user?.email) {
      return toast.error("Please login to add to wishlist");
    }

    try {
      await axios.post("http://localhost:3000/recent", {
        blogId,
        userEmail: user.email,
      });
      toast.success("Added to wishlist!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error");
    }
  };

  return (
    <>
      <h1 className="text-3xl md:text-4xl font-bold text-center text-orange-500 mb-2">
        Recent Blog Posts
      </h1>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
        Stay up to date with the latest articles, tutorials, and insights shared
        by our amazing community. Explore what’s trending now!
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 my-10">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="max-w-full rounded-md shadow-md bg-white dark:bg-gray-800 dark:text-white"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="object-cover object-center w-full rounded-t-md h-60"
            />
            <div className="flex flex-col justify-between p-6 space-y-4">
              <div className="space-y-2">
                <h3 className="text-2xl font-semibold">{blog.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {blog.shortDescription?.slice(0, 100)}...
                </p>
              </div>
              <div className="flex gap-3">
                <Link
                  to={`/blog/${blog._id}`}
                  className="w-full text-center px-4 py-2 font-semibold bg-orange-500 text-white rounded hover:bg-orange-600 transition cursor-pointer"
                >
                  Details
                </Link>
                <button
                  onClick={() => handleWishlist(blog._id)}
                  className="w-full text-center px-4 py-2 font-semibold border border-orange-500 text-orange-500 cursor-pointer rounded hover:bg-orange-100 dark:hover:bg-gray-700 transition"
                >
                  Wishlist
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default RecentBlogs;
