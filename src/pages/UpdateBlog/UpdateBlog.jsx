import React, { useContext, useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../provider/AuthProvider";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import { ArrowUpCircle, BookOpen, Image, Tag, Upload } from "lucide-react";
import Loading from "../../components/Loading/Loading";

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
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  // Ref to the hidden file input element
  const fileInputRef = useRef(null);

  useEffect(() => {
    // Fetch the blog data from the server
    axios
      .get(`https://b11a11-server-side-sohanpk24.vercel.app/blog/${id}`)
      .then((res) => {
        const blog = res.data;

        // Check if the current user is the owner of the blog
        if (user?.email !== blog.email) {
          toast.error("You are not authorized to edit this blog");
          navigate("/");
          return;
        }

        // Set the form data and authentication status
        setIsOwner(true);
        setFormData({
          title: blog.title,
          image: blog.image,
          category: blog.category,
          shortDescription: blog.shortDescription,
          longDescription: blog.longDescription,
        });
        // Set the initial image preview to the existing blog image
        setImagePreview(blog.image);
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Create a local URL for the file to display a preview
      setImagePreview(URL.createObjectURL(file));
    } else {
      setSelectedFile(null);
      // Revert to the original image if no new file is selected
      setImagePreview(formData.image);
    }
  };

  const handleFileUpload = async (file) => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMGBB_API_KEY
        }`,
        formData
      );
      setIsUploading(false);
      return response.data.data.url;
    } catch (err) {
      setIsUploading(false);
      toast.error("Image upload failed");
      console.error("ImgBB upload error:", err);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let updatedImageUrl = formData.image;

    // If a new file is selected, upload it to ImgBB first
    if (selectedFile) {
      updatedImageUrl = await handleFileUpload(selectedFile);
      if (!updatedImageUrl) {
        return; // Stop the process if image upload fails
      }
    }

    // Update the form data with the new image URL (or the old one if no new file was uploaded)
    const updatedData = { ...formData, image: updatedImageUrl };

    try {
      await axios.put(
        `https://b11a11-server-side-sohanpk24.vercel.app/blog/${id}`,
        updatedData
      );
      toast.success("Blog updated successfully!");
      navigate(`/blog/${id}`);
    } catch (err) {
      toast.error("Failed to update blog");
    }
  };

  if (loading) return <Loading />;
  if (!isOwner) return null;

  return (
    <section className="mx-auto mt-8 mb-8 shadow-md shadow-orange-300">
      <Helmet>
        <title>Update | Idea Canvas</title>
      </Helmet>

      {/* Header Section */}
      <div className="p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-orange-500">
          Update Post
        </h2>
        <p className="mt-2 text-base-content max-w-2xl ">
          Refine your blog's key details and image to keep your audience
          captivated.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {/* Left Side: Category, Title, and Descriptions */}
        <div className="md:col-span-2 space-y-6 bg-base-100 rounded-sm p-6 md:p-8 shadow-sm shadow-orange-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-base-content flex items-center gap-2">
                  <Tag size={20} className="text-orange-500 " /> Category
                </span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-sm bg-base-100 border-2 border-gray-300 focus:outline-none focus:border-orange-500 transition-all duration-300 "
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

            {/* Blog Title */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-base-content flex items-center gap-2">
                  <BookOpen size={20} className="text-orange-500" /> Blog Title
                </span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-sm bg-base-100 border-2 border-gray-300 focus:outline-none focus:border-orange-500 transition-all duration-300"
                placeholder="Enter blog title"
                required
              />
            </div>
          </div>

          {/* Short Description */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-base-content flex items-center gap-2">
                <BookOpen size={20} className=" text-orange-500" /> Short
                Description
              </span>
            </label>
            <textarea
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-sm bg-base-100 border-2 border-gray-300 focus:outline-none focus:border-orange-500 transition-all duration-300"
              placeholder="Write a short summary..."
              rows={2}
              required
            ></textarea>
          </div>

          {/* Long Description */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-base-content flex items-center gap-2">
                <BookOpen size={20} className=" text-orange-500" /> Long
                Description
              </span>
            </label>
            <textarea
              name="longDescription"
              value={formData.longDescription}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-sm bg-base-100 border-2 border-gray-300 focus:outline-none focus:border-orange-500 transition-all duration-300"
              placeholder="Write the full content..."
              rows={4}
              required
            ></textarea>
          </div>
        </div>

        {/* Right Side: Image Upload and Update Button */}
        <div className="md:col-span-1 bg-base-100 rounded-sm shadow-md shadow-orange-200 p-6 space-y-6">
          {/* Image Upload */}
          <div className="form-control flex-grow flex flex-col items-center justify-center space-y-2">
            <label className="label w-full">
              <span className="label-text font-semibold text-base-content flex items-center gap-2">
                <Image size={20} className="text-orange-500" /> Update Photo
              </span>
            </label>
            <div
              className="relative w-full h-48 bg-gray-100 rounded-sm border-2 border-gray-300 cursor-pointer flex items-center justify-center overflow-hidden transition-all duration-300 hover:border-orange-500"
              onClick={() => fileInputRef.current.click()}
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Blog Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-gray-500 text-center">
                  <Upload size={40} className="mx-auto" />
                  <p>Click to upload a new photo</p>
                </div>
              )}
            </div>
            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              name="imageFile"
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-orange-500 text-white font-semibold py-3 px-8 rounded-sm shadow-lg transform transition-transform duration-300 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
              disabled={isUploading}
            >
              <ArrowUpCircle size={20} />
              {isUploading ? "Uploading..." : "Update Blog"}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default UpdateBlog;
