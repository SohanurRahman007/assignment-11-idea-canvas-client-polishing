import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import Loading from "../components/Loading/Loading";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  MapPin,
  Calendar,
  Mail,
  User,
  Edit,
  Globe,
  Twitter,
  Github,
  Linkedin,
} from "lucide-react";
import axios from "axios";
import EditProfile from "./EditProfile";

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const [userStats, setUserStats] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [backendAvailable, setBackendAvailable] = useState(true);

  // Use local backend for development
  const API_BASE_URL = "http://localhost:3000";

  const fetchUserProfile = async () => {
    if (!user?.email) return;

    setIsLoading(true);

    try {
      // Fetch profile data
      const profileResponse = await axios.get(
        `${API_BASE_URL}/profile/${user.email}`
      );

      if (profileResponse.data.success) {
        setUserProfile(profileResponse.data.profile);
        setBackendAvailable(true);
      } else {
        // This shouldn't happen with proper backend response
        throw new Error("Profile not found");
      }
    } catch (error) {
      console.log(
        "Profile not found or backend unavailable, creating default profile..."
      );
      setBackendAvailable(false);

      // Create default profile if not exists
      const defaultProfile = {
        name: user?.displayName || "Guest User",
        email: user?.email,
        bio: "Passionate developer and technology enthusiast. I enjoy building applications and sharing knowledge with the community. Always learning and exploring new technologies.",
        location: "Not specified",
        website: "",
        twitter: "",
        github: "",
        linkedin: "",
        photoURL: user?.photoURL,
        joinedDate: new Date().toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        }),
      };
      setUserProfile(defaultProfile);

      // Try to create the profile in backend
      try {
        await axios.post(`${API_BASE_URL}/profile`, defaultProfile);
        console.log("Default profile created in backend");
        setBackendAvailable(true);
      } catch (createError) {
        console.log(
          "Could not create profile in backend, using local data only"
        );
        setBackendAvailable(false);
      }
    }

    // Fetch user stats
    try {
      const statsResponse = await axios.get(
        `${API_BASE_URL}/profile/${user.email}/stats`
      );

      if (statsResponse.data.success) {
        setUserStats(statsResponse.data.stats);
      }
    } catch (statsError) {
      console.log("Stats not available, using default stats");
      setUserStats({
        blogs: 0,
        likes: 0,
        comments: 0,
        wishlist: 0,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserProfile();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  const handleProfileUpdate = () => {
    fetchUserProfile(); // Refresh data after update
  };

  if (isLoading) return <Loading />;
  if (!user)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-orange-500 mb-4">
            Please Log In
          </h2>
          <p className="text-base-content">
            You need to be logged in to view your profile.
          </p>
        </div>
      </div>
    );
  if (!userProfile) return <Loading />;

  return (
    <div className="p-6 bg-base-100 min-h-screen">
      <Helmet>
        <title>User Profile | Idea Canvas</title>
      </Helmet>

      {/* Development Notice */}
      {!backendAvailable && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-center text-yellow-700 text-sm">
            <span className="font-semibold">⚠️ Development Mode:</span>
            <span className="ml-2">
              Using local data. Make sure backend is running on localhost:3000
            </span>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        {/* Main Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="card bg-base-100 shadow-sm border border-orange-200 p-8 transition-all duration-300 hover:shadow-sm"
        >
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative"
            >
              <img
                src={
                  userProfile?.photoURL ||
                  user?.photoURL ||
                  `https://placehold.co/120x120/f97316/ffffff?text=${
                    userProfile?.name?.charAt(0) || "U"
                  }`
                }
                alt="Profile Avatar"
                className="w-24 h-24 rounded-full border-4 border-orange-500 shadow-lg object-cover"
              />
            </motion.div>
            <div className="text-center sm:text-left flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
                <h1 className="text-2xl md:text-3xl font-bold text-orange-500">
                  {userProfile?.name}
                </h1>
                <button
                  onClick={() => setShowEditModal(true)}
                  className="btn bg-orange-500 hover:bg-orange-600 text-white border-none font-semibold px-4 py-2 flex items-center gap-2"
                >
                  <Edit size={16} />
                  Edit Profile
                </button>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2 text-base-content mb-2">
                <Mail size={16} className="text-orange-500" />
                <span>{userProfile?.email}</span>
              </div>

              {/* Social Links */}
              {(userProfile.website ||
                userProfile.twitter ||
                userProfile.github ||
                userProfile.linkedin) && (
                <div className="flex flex-wrap gap-3 mt-3 justify-center sm:justify-start">
                  {userProfile.website && (
                    <a
                      href={userProfile.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base-content hover:text-orange-500 transition-colors"
                      title="Website"
                    >
                      <Globe size={18} />
                    </a>
                  )}
                  {userProfile.twitter && (
                    <a
                      href={`https://twitter.com/${userProfile.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base-content hover:text-orange-500 transition-colors"
                      title="Twitter"
                    >
                      <Twitter size={18} />
                    </a>
                  )}
                  {userProfile.github && (
                    <a
                      href={`https://github.com/${userProfile.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base-content hover:text-orange-500 transition-colors"
                      title="GitHub"
                    >
                      <Github size={18} />
                    </a>
                  )}
                  {userProfile.linkedin && (
                    <a
                      href={`https://linkedin.com/in/${userProfile.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base-content hover:text-orange-500 transition-colors"
                      title="LinkedIn"
                    >
                      <Linkedin size={18} />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Profile Details Section */}
          <div className="space-y-8">
            {/* About Me Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <User className="text-orange-500" size={24} />
                <h2 className="text-xl font-bold text-orange-500">About Me</h2>
              </div>
              <div className=" rounded-lg p-6 border border-orange-200">
                <p className="text-base-content leading-relaxed">
                  {userProfile?.bio}
                </p>
              </div>
            </motion.div>

            {/* Details Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {/* Location Card */}
              <div className="card bg-base-100 border border-orange-200 p-6 transition-all duration-300 hover:shadow-sm group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-orange-500 rounded-lg group-hover:scale-110 transition-transform">
                    <MapPin size={20} className="text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-orange-500">
                    Location
                  </h3>
                </div>
                <p className="text-base-content">{userProfile?.location}</p>
              </div>

              {/* Member Since Card */}
              <div className="card bg-base-100 border border-orange-200 p-6 transition-all duration-300 hover:shadow-sm group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-orange-500 rounded-lg group-hover:scale-110 transition-transform">
                    <Calendar size={20} className="text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-orange-500">
                    Member Since
                  </h3>
                </div>
                <p className="text-base-content">{userProfile?.joinedDate}</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <EditProfile
          profile={userProfile}
          onSave={handleProfileUpdate}
          onClose={() => setShowEditModal(false)}
          backendAvailable={backendAvailable}
        />
      )}
    </div>
  );
};

export default ProfilePage;
