import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

import { AuthContext } from "../../provider/AuthProvider";
import SkeletonCard from "../../components/SkeletonCard/SkeletonCard";
import BlogsFilter from "../../components/BlogsFilter/BlogsFilter";
import BlogCard from "../../components/BlogCard/BlogCard";
// import BlogsFilter from "./BlogsFilter";
// import BlogCard from "./BlogCard";

const blogsPerPage = 12;
const categories = ["All", "Tech", "Life", "Education", "Business"];

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Effect to fetch blogs whenever category, search, or page changes
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const params = {
          page: currentPage,
          limit: blogsPerPage,
        };
        if (category !== "All") params.category = category;
        if (search.trim() !== "") params.search = search.trim();

        const res = await axios.get(
          "https://b11a11-server-side-sohanpk24.vercel.app/blogs",
          { params }
        );
        setBlogs(res.data.blogs);
        setTotalPages(Math.ceil(res.data.totalBlogs / blogsPerPage));
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [category, search, currentPage]);

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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-4 py-2 rounded-md ${
            currentPage === i
              ? "bg-orange-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

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

      {/* Filter and Search controls */}
      <BlogsFilter
        categories={categories}
        category={category}
        setCategory={setCategory}
        search={search}
        setSearch={setSearch}
        setCurrentPage={setCurrentPage}
      />

      {/* Blog Cards or Skeletons */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(blogsPerPage)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : blogs.length === 0 ? (
        <p className="text-center text-base-content">No blogs found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {blogs.map((blog, index) => (
              <BlogCard
                key={blog._id}
                blog={blog}
                index={index}
                onWishlistClick={handleWishlist}
                onDetailsClick={() => navigate(`/blog/${blog._id}`)}
              />
            ))}
          </div>
          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-10 space-x-2">
              {renderPaginationButtons()}
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default BlogsPage;
