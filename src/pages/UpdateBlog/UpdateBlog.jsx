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
    axios
      .get(`http://localhost:3000/blog/${id}`)
      .then((res) => {
        const blog = res.data;
        if (user?.email !== blog.email) {
          toast.error("You are not authorized to edit this blog");
          navigate("/");
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
      await axios.put(`http://localhost:3000/blog/${id}`, formData);
      toast.success("Blog updated successfully!");
      navigate(`/blog/${id}`);
    } catch (err) {
      toast.error("Failed to update blog");
    }
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (!isOwner) return null;

  return (
    <section className="max-w-5xl mx-auto p-6 bg-base-100 rounded-lg shadow-md mt-10">
      <h2 className="text-3xl font-bold text-orange-500 mb-6">Update Blog</h2>
      <p className="text-base-content mt-1.5 max-w-2xl mb-6">
        Use this form to update your blog post with the latest content, image,
        and category. Make sure your updates are accurate and well-written to
        engage your readers.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Category */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Category</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="select select-bordered w-full"
              required
            >
              <option disabled value="">
                Select Category
              </option>
              <option value="Tech">Tech</option>
              <option value="Life">Life</option>
              <option value="Education">Education</option>
              <option value="Business">Business</option>
            </select>
          </div>

          {/* Title */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Blog Title</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="Enter blog title"
              required
            />
          </div>

          {/* Image */}
          <div className="form-control col-span-full">
            <label className="label">
              <span className="label-text font-medium">Image URL</span>
            </label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="Enter image URL"
              required
            />
          </div>

          {/* Short Description */}
          <div className="form-control col-span-full">
            <label className="label">
              <span className="label-text font-medium">Short Description</span>
            </label>
            <textarea
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              className="textarea textarea-bordered w-full"
              placeholder="Write a short summary..."
              required
            ></textarea>
          </div>

          {/* Long Description */}
          <div className="form-control col-span-full">
            <label className="label">
              <span className="label-text font-medium">Long Description</span>
            </label>
            <textarea
              name="longDescription"
              value={formData.longDescription}
              onChange={handleChange}
              className="textarea textarea-bordered w-full"
              placeholder="Write the full content..."
              rows={6}
              required
            ></textarea>
          </div>
        </div>

        {/* Submit */}
        <div className="mt-6">
          <button
            type="submit"
            className="btn bg-orange-500 hover:bg-orange-600 text-white px-6"
          >
            Update Blog
          </button>
        </div>
      </form>
    </section>
  );
};

export default UpdateBlog;
