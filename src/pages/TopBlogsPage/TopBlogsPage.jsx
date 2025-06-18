import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import Loading from "../../components/Loading/Loading";

const TopBlogsPage = () => {
  const { loading } = useContext(AuthContext);
  const [topBlogs, setTopBlogs] = useState([]);

  useEffect(() => {
    fetch("https://idea-canvas-server.vercel.app/blogs/top")
      .then((res) => res.json())
      .then((data) => setTopBlogs(data));
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-orange-500 text-center mb-6">
        Top 10 Blog Posts by Content
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 shadow-sm rounded-md">
          <thead className="bg-orange-100 text-gray-700">
            <tr>
              <th className="py-2 px-4 text-left">#</th>
              <th className="py-2 px-4 text-left">Title</th>
              <th className="py-2 px-4 text-left">Category</th>
              <th className="py-2 px-4 text-left">Author Email</th>
              <th className="py-2 px-4 text-left">Word Count</th>
            </tr>
          </thead>
          <tbody>
            {topBlogs.map((blog, index) => (
              <tr
                key={blog._id}
                className="border-t border-gray-300 hover:bg-gray-50"
              >
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{blog.title}</td>
                <td className="py-2 px-4">{blog.category}</td>
                <td className="py-2 px-4">{blog.userEmail || "N/A"}</td>
                <td className="py-2 px-4">{blog.wordCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopBlogsPage;
