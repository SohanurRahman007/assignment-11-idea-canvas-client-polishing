import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import Loading from "../../components/Loading/Loading";
import { FaRegStar } from "react-icons/fa";

const TopBlogsPage = () => {
  const { loading } = useContext(AuthContext);
  const [topBlogs, setTopBlogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/blogs/top")
      .then((res) => res.json())
      .then((data) => setTopBlogs(data));
  }, []);

  if (loading) return <Loading />;

  return (
    <div className=" mx-auto  py-10">
      {/* Title Section */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-orange-500 flex justify-center items-center gap-2">
          <FaRegStar className="text-orange-400" />
          Top 10 Blogs by Word Count
        </h2>
        <p className="text-base-content mt-2 max-w-2xl mx-auto">
          Here are the longest and most detailed blog posts in our
          platform—created with passion and depth by our community.
        </p>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto  border border-orange-50 rounded-sm shadow-sm bg-base-100">
        <table className="min-w-full text-sm text-left text-base-content">
          <thead className="bg-base-100 text-orange-500">
            <tr>
              <th className="py-3 px-4 font-semibold">#</th>
              <th className="py-3 px-4 font-semibold">Title</th>
              <th className="py-3 px-4 font-semibold">Category</th>
              <th className="py-3 px-4 font-semibold">Author</th>
              <th className="py-3 px-4 font-semibold">Word Count</th>
            </tr>
          </thead>
          <tbody>
            {topBlogs.map((blog, index) => (
              <tr
                key={blog._id}
                className="border-t border-orange-100 hover:bg-orange-300 transition-colors "
              >
                <td className="py-2 px-4 font-medium text-orange-500 ">
                  {index + 1}
                </td>
                <td className="py-2 px-4 hover:text-base-content">
                  {blog.title}
                </td>
                <td className="py-2 px-4 ">
                  <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs text-base-content">
                    {blog.category}
                  </span>
                </td>
                <td className="py-2 px-4 text-base-content">
                  {blog.userEmail || "N/A"}
                </td>
                <td className="py-2 px-4 font-semibold text-base-content">
                  {blog.wordCount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopBlogsPage;
