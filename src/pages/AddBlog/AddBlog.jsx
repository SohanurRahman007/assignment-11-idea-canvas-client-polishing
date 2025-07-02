// AddBlog.jsx
import React, { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../../provider/AuthProvider";
import { Helmet } from "react-helmet-async";

const AddBlog = () => {
  const { user } = useContext(AuthContext);
  // console.log(user.accessToken);
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    category: "",
    shortDescription: "",
    longDescription: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const blogData = {
        ...formData,
        email: user?.email,
        authorName: user?.displayName || "Anonymous",
        authorPhoto:
          user?.photoURL || "https://source.unsplash.com/100x100/?portrait",
      };

      await axios.post(
        "https://b11a11-server-side-sohanpk24.vercel.app/addBlog",
        blogData
      );
      toast.success("Blog added successfully!");
      setFormData({
        title: "",
        image: "",
        category: "",
        shortDescription: "",
        longDescription: "",
      });
    } catch (err) {
      toast.error("❌ Failed to add blog");
      console.error(err);
    }
  };

  return (
    <section className="mt-5 mb-5">
      <Helmet>
        <title>Add Blog | Idea Canvas</title>
      </Helmet>
      <form
        onSubmit={handleSubmit}
        className="container flex flex-col mx-auto space-y-12"
      >
        <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-lg transition-colors">
          <div className="space-y-2 col-span-full lg:col-span-1">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-orange-500">
              Add a New Blog
            </h2>
            <p className="text-base-content mt-1.5 max-w-2xl mx-auto">
              Fill out the blog information to share your thoughts with the
              world.
            </p>
          </div>

          <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
            {/* Category */}
            <div className="col-span-full">
              <label htmlFor="category" className="text-sm font-medium">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-sm bg-base-100 border-2 border-gray-300 focus:outline-none focus:border-orange-500"
                required
              >
                <option className="text-base-content bg-base-100 " value="">
                  Select Category
                </option>
                <option className="text-base-content bg-base-100" value="Tech">
                  Tech
                </option>
                <option className="text-base-content bg-base-100" value="Life">
                  Life
                </option>
                <option
                  className="text-base-content bg-base-100"
                  value="Education"
                >
                  Education
                </option>
                <option
                  className="text-base-content bg-base-100"
                  value="Business"
                >
                  Business
                </option>
              </select>
            </div>

            {/* Title */}
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="title" className="text-sm font-medium">
                Blog Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                placeholder="Enter blog title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-sm bg-base-100 border-2 border-gray-300 focus:outline-none focus:border-orange-500"
                required
              />
            </div>

            {/* Image */}
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="image" className="text-sm font-medium">
                Image URL
              </label>
              <input
                id="image"
                name="image"
                type="text"
                placeholder="Enter image URL"
                value={formData.image}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-sm bg-base-100 border-2 border-gray-300 focus:outline-none focus:border-orange-500"
                required
              />
            </div>

            {/* Short Description */}
            <div className="col-span-full">
              <label htmlFor="shortDescription" className="text-sm font-medium">
                Short Description
              </label>
              <textarea
                id="shortDescription"
                name="shortDescription"
                placeholder="Write a short summary..."
                value={formData.shortDescription}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-sm bg-base-100 border-2 border-gray-300 focus:outline-none focus:border-orange-500"
                required
              ></textarea>
            </div>

            {/* Long Description */}
            <div className="col-span-full">
              <label htmlFor="longDescription" className="text-sm font-medium">
                Long Description
              </label>
              <textarea
                id="longDescription"
                name="longDescription"
                placeholder="Write your full blog content..."
                value={formData.longDescription}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-sm bg-base-100 border-2 border-gray-300 focus:outline-none focus:border-orange-500"
                rows="6"
                required
              ></textarea>
            </div>

            {/* Submit */}
            <div className="col-span-full">
              <button
                type="submit"
                className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-700 transition cursor-pointer"
              >
                Submit Blog
              </button>
            </div>
          </div>
        </fieldset>
      </form>
    </section>
  );
};

export default AddBlog;
