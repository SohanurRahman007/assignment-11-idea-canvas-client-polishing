import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../../provider/AuthProvider";
import Loading from "../Loading/Loading";
import { motion } from "framer-motion";

const RecentBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    axios.get("http://localhost:3000/recent").then((res) => setBlogs(res.data));
  }, []);

  const handleWishlist = async (blog) => {
    if (!user?.email) {
      return toast.error("Please login to add to wishlist");
    }

    const wishlistItem = {
      blogId: blog._id,
      title: blog.title,
      image: blog.image,
      category: blog.category,
      userEmail: user.email,
    };

    try {
      const res = await axios.post(
        "http://localhost:3000/wishlist",
        wishlistItem
      );
      if (res.data.success) {
        toast.success("Added to wishlist!");
      } else {
        toast(res.data.message || "Already in wishlist");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add");
    }
  };

  if (loading) return <Loading />;

  return (
    <section className="my-12">
      <div className="text-center mb-10">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-orange-500">
          Recent Blog Posts
        </h1>
        <p className="text-base-content mt-1.5 max-w-2xl mx-auto">
          Stay up to date with the latest articles, tutorials, and stories from
          our amazing community.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {blogs.map((blog, index) => (
          <motion.div
            key={blog._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
            className="card bg-base-100 shadow-sm border border-orange-200 transition-all duration-300 hover:shadow-sm group"
          >
            <figure className="overflow-hidden rounded-t-md">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover transform transition-transform duration-500 group-hover:scale-105"
              />
            </figure>

            <div className="card-body flex flex-col justify-between">
              <div>
                {/* <div className="badge bg-orange-500 mb-2">{blog.category}</div> */}
                <h2 className="card-title text-orange-500">
                  {blog.title.length > 45
                    ? blog.title.slice(0, 45) + "..."
                    : blog.title}
                </h2>
                <p className="text-sm text-base-content mt-1">
                  {blog.shortDescription?.slice(0, 80)}...
                </p>
              </div>

              <div className="card-actions mt-4 grid grid-cols-2 gap-2">
                <Link
                  to={`/blog/${blog._id}`}
                  className="btn btn-sm bg-orange-500 hover:bg-orange-600 text-white font-semibold"
                >
                  Details
                </Link>
                <button
                  onClick={() => handleWishlist(blog)}
                  className="btn btn-sm border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white font-semibold"
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

export default RecentBlogs;
