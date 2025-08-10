import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import Loading from "../components/Loading/Loading";
import { Helmet } from "react-helmet-async";

const ProfilePage = () => {
  // Get the user from your authentication context
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      setIsLoading(true);
      try {
        const fetchedProfile = {
          name: user?.displayName || "Guest User",
          email: user?.email || "guest@example.com",
          bio: "Passionate developer and technology enthusiast. I enjoy building applications and sharing knowledge with the community. Always learning and exploring new technologies.",
          joinedDate: "October 2023",
          location: "Dhaka, Bangladesh",
          profileImage:
            user?.photoURL ||
            `https://placehold.co/120x120/A0B9D6/ffffff?text=${
              user?.displayName?.charAt(0) || "U"
            }`,
        };
        setUserProfile(fetchedProfile);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchUserProfile();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  if (isLoading) return <Loading />;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Helmet>
        <title>User Profile | Idea Canvas</title>
      </Helmet>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-md shadow-orange-300 shadow-sm p-8">
          {/* Header Section */}
          <div className="flex items-center space-x-6 mb-8">
            <img
              src={userProfile?.profileImage}
              alt="Profile Avatar"
              className="w-24 h-24 rounded-full border-4 border-orange-500 shadow-lg"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                {userProfile?.name}
              </h1>
              <p className="text-gray-500">{userProfile?.email}</p>
            </div>
          </div>

          {/* Profile Details Section */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                About Me
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {userProfile?.bio}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-medium text-gray-700">Location</h3>
                <p className="text-gray-600">{userProfile?.location}</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-700">
                  Member Since
                </h3>
                <p className="text-gray-600">{userProfile?.joinedDate}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
