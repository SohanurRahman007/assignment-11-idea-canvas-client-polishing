// UpdateBlog.jsx
import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../provider/AuthProvider";
import toast from "react-hot-toast";

const UpdateBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    title: "",
    image: "",
    category: "",
    shortDescription: "",
    longDescription: "",
  });
  const [loading, setLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    // Fetch blog data by id to prefill form
    axios
      .get(`https://idea-canvas-server.vercel.app/blog/${id}`)
      .then((res) => {
        const blog = res.data;
        // Check if logged in user is the owner
        if (user?.email !== blog.email) {
          toast.error("You are not authorized to edit this blog");
          navigate("/"); // Redirect away
          return;
        }
        setIsOwner(true);
        setFormData({
          title: blog.title,
          image: blog.image,
          category: blog.category,
          shortDescription: blog.shortDescription,
          longDescription: blog.longDescription,
        });
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Failed to load blog");
        console.log(err);
        navigate("/");
      });
  }, [id, user, navigate]);

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
      // Send update request to server
      const updatedBlog = {
        ...formData,
      };

      await axios.put(
        `https://idea-canvas-server.vercel.app/blog/${id}`,
        updatedBlog
      );

      toast.success("Blog updated successfully!");
      navigate(`/blog/${id}`); // Redirect to blog detail page
    } catch (err) {
      toast.error("Failed to update blog");
      console.error(err);
    }
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;

  if (!isOwner) return null; // Render nothing if not owner

  return (
    <section className="mt-5 mb-5">
      <form
        onSubmit={handleSubmit}
        className="container flex flex-col mx-auto space-y-12"
      >
        <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-lg transition-colors">
          <div className="space-y-2 col-span-full lg:col-span-1">
            <h2 className="font-medium text-3xl text-orange-600">
              Update Blog
            </h2>
            <p className="text-md text-gray-600">
              Edit the blog details and submit to update.
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
                className="w-full rounded-md p-2 border border-gray-400"
                required
              >
                <option value="">Select Category</option>
                <option value="Tech">Tech</option>
                <option value="Life">Life</option>
                <option value="Education">Education</option>
                <option value="Business">Business</option>
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
                className="w-full rounded-md p-2 border border-gray-400"
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
                className="w-full rounded-md p-2 border border-gray-400"
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
                className="w-full rounded-md p-2 border border-gray-400"
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
                className="w-full rounded-md p-2 border border-gray-400"
                rows="6"
                required
              ></textarea>
            </div>

            {/* Submit */}
            <div className="col-span-full">
              <button
                type="submit"
                className="bg-orange-500 text-white px-6 py-2 rounded  transition cursor-pointer"
              >
                Update Blog
              </button>
            </div>
          </div>
        </fieldset>
      </form>
    </section>
  );
};

export default UpdateBlog;
