import React, { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../../provider/AuthProvider";
import { Helmet } from "react-helmet-async";
import { FaUserCircle } from "react-icons/fa"; // Import the user icon

const AddBlog = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    title: "",
    image: "", // This will store the ImgBB URL after upload
    category: "",
    shortDescription: "",
    longDescription: "",
  });
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(""); // State for local image preview

  // Access the API key using import.meta.env for browser compatibility
  const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Create a local URL for instant preview
    setPreviewUrl(URL.createObjectURL(file));

    if (!imgbbApiKey) {
      toast.error(
        "ImgBB API key is missing. Please check your .env.local file."
      );
      return;
    }

    setIsUploading(true);
    const toastId = toast.loading("Uploading image...");

    try {
      // Create FormData to send the image file
      const uploadFormData = new FormData();
      uploadFormData.append("image", file);

      // Make the API request to ImgBB using the environment variable
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
        uploadFormData
      );

      // Get the image URL from the response and update the form state
      const imageUrl = response.data.data.url;
      setFormData((prev) => ({
        ...prev,
        image: imageUrl,
      }));

      toast.success("Image uploaded successfully!", { id: toastId });
    } catch (error) {
      console.error("Image upload failed:", error);
      toast.error("❌ Failed to upload image.", { id: toastId });
      // Clear preview and form image if upload fails
      setPreviewUrl("");
      setFormData((prev) => ({ ...prev, image: "" }));
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if an image has been uploaded
    if (!formData.image) {
      return toast.error("Please upload an image first.");
    }

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
      // Reset form fields and preview after successful submission
      setFormData({
        title: "",
        image: "",
        category: "",
        shortDescription: "",
        longDescription: "",
      });
      setPreviewUrl("");
    } catch (err) {
      toast.error("❌ Failed to add blog");
      console.error(err);
    }
  };

  return (
    <section className="mt-8 mb-8">
      <Helmet>
        <title>Add Blog | Idea Canvas</title>
      </Helmet>
      <form
        onSubmit={handleSubmit}
        className="container flex flex-col mx-auto space-y-12"
      >
        <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-orange-300 shadow-md transition-colors">
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

            {/* Image Upload with Preview */}
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="image-upload" className="text-sm font-medium">
                Upload Image
              </label>
              <div className="flex items-center gap-4">
                <input
                  id="image-upload"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="flex-1 px-4 py-2 rounded-sm bg-base-100 border-2 border-gray-300 focus:outline-none focus:border-orange-500"
                />
                {/* Image Preview or Placeholder Icon */}
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="h-12 w-12 rounded-md object-cover"
                  />
                ) : (
                  <FaUserCircle className="h-12 w-12 text-gray-400" />
                )}
              </div>
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
                disabled={isUploading}
                className={`text-white px-6 py-2 rounded transition cursor-pointer ${
                  isUploading
                    ? "bg-gray-400"
                    : "bg-orange-500 hover:bg-orange-700"
                }`}
              >
                {isUploading ? "Uploading..." : "Submit Blog"}
              </button>
            </div>
          </div>
        </fieldset>
      </form>
    </section>
  );
};

export default AddBlog;
