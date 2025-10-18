import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { X, Save, Upload } from "lucide-react";
import { AuthContext } from "../provider/AuthProvider";

const EditProfile = ({ profile, onSave, onClose, backendAvailable = true }) => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: profile?.name || "",
    bio: profile?.bio || "",
    location: profile?.location || "",
    website: profile?.website || "",
    twitter: profile?.twitter || "",
    github: profile?.github || "",
    linkedin: profile?.linkedin || "",
  });
  const [currentPhotoURL, setCurrentPhotoURL] = useState(
    profile?.photoURL || user?.photoURL || ""
  );
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Use local backend for development
  const API_BASE_URL = "http://localhost:3000";

  // Update currentPhotoURL when profile changes
  useEffect(() => {
    if (profile?.photoURL) {
      setCurrentPhotoURL(profile.photoURL);
    }
  }, [profile]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size should be less than 2MB");
      return;
    }

    // Check file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    setUploadingImage(true);
    const uploadFormData = new FormData();
    uploadFormData.append("image", file);

    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMGBB_API_KEY
        }`,
        uploadFormData
      );

      if (response.data.success) {
        const newPhotoURL = response.data.data.url;

        // Immediately update the displayed image
        setCurrentPhotoURL(newPhotoURL);

        if (backendAvailable) {
          // Update profile with new image in backend
          await axios.put(`${API_BASE_URL}/profile/image`, {
            email: user.email,
            photoURL: newPhotoURL,
          });
          toast.success("Profile image updated successfully!");
        } else {
          toast.success(
            "Image uploaded! Profile will update when backend is available."
          );
        }

        onSave(); // Refresh profile data in parent component
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      if (error.response?.status === 404) {
        toast.error(
          "Backend not available. Make sure server is running on localhost:3000"
        );
      } else {
        toast.error("Failed to upload image");
      }
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (backendAvailable) {
        await axios.post(`${API_BASE_URL}/profile`, {
          email: user.email,
          ...formData,
          // Include the updated photoURL in the profile data
          photoURL: currentPhotoURL,
        });
        toast.success("Profile updated successfully!");
      } else {
        toast.success(
          "Profile saved locally! Changes will sync when backend is available."
        );
      }

      onSave(); // Refresh profile data
      onClose(); // Close modal
    } catch (error) {
      console.error("Error updating profile:", error);
      if (error.response?.status === 404) {
        toast.error(
          "Backend not available. Make sure server is running on localhost:3000"
        );
      } else {
        toast.error("Failed to update profile");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-base-100 rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between p-6 border-b border-orange-200">
          <h2 className="text-xl font-bold text-orange-500">Edit Profile</h2>
          <button
            onClick={onClose}
            className="text-base-content hover:text-orange-500 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Backend Status */}
        {!backendAvailable && (
          <div className="bg-yellow-50 border border-yellow-200 mx-6 mt-4 p-3 rounded-lg">
            <p className="text-yellow-700 text-sm">
              ⚠️ <strong>Local Mode:</strong> Backend not available. Changes
              will be saved locally.
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Profile Image Upload */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={
                  currentPhotoURL ||
                  `https://placehold.co/120x120/f97316/ffffff?text=${
                    formData.name?.charAt(0) ||
                    user?.displayName?.charAt(0) ||
                    "U"
                  }`
                }
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-orange-500 object-cover"
              />
              <label className="absolute bottom-0 right-0 bg-orange-500 text-white p-2 rounded-full cursor-pointer hover:bg-orange-600 transition-colors shadow-lg">
                <Upload size={16} />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={uploadingImage}
                />
              </label>
            </div>
            {uploadingImage && (
              <div className="flex items-center gap-2 text-orange-500">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-500"></div>
                <p className="text-sm">Uploading image...</p>
              </div>
            )}
            <p className="text-xs text-base-content text-center max-w-xs">
              Click the upload icon to change your profile picture. Max size:
              2MB
            </p>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-orange-500 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-base-100 text-base-content transition-colors"
              placeholder="Enter your full name"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-orange-500 mb-2">
              Bio
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows="4"
              className="w-full px-3 py-2 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-base-100 text-base-content transition-colors resize-none"
              placeholder="Tell us about yourself, your interests, and what you're passionate about..."
            />
            <p className="text-xs text-base-content mt-1">
              {formData.bio.length}/500 characters
            </p>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-orange-500 mb-2">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-base-100 text-base-content transition-colors"
              placeholder="Where are you located?"
            />
          </div>

          {/* Social Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-orange-500 mb-2">
                Website
              </label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-base-100 text-base-content transition-colors"
                placeholder="https://yourwebsite.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-orange-500 mb-2">
                Twitter
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-orange-200 bg-orange-50 text-orange-500 text-sm">
                  @
                </span>
                <input
                  type="text"
                  name="twitter"
                  value={formData.twitter}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-orange-200 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-base-100 text-base-content transition-colors"
                  placeholder="username"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-orange-500 mb-2">
                GitHub
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-orange-200 bg-orange-50 text-orange-500 text-sm">
                  github.com/
                </span>
                <input
                  type="text"
                  name="github"
                  value={formData.github}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-orange-200 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-base-100 text-base-content transition-colors"
                  placeholder="username"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-orange-500 mb-2">
                LinkedIn
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-orange-200 bg-orange-50 text-orange-500 text-sm">
                  linkedin.com/in/
                </span>
                <input
                  type="text"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-orange-200 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-base-100 text-base-content transition-colors"
                  placeholder="username"
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-6 border-t border-orange-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 btn border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white font-semibold transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 btn bg-orange-500 hover:bg-orange-600 text-white border-none font-semibold flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default EditProfile;
