import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../../provider/AuthProvider";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
// Import the updateProfile function directly from firebase/auth
import { updateProfile } from "firebase/auth";

const Register = () => {
  // We no longer destructure updateUserProfile from AuthContext
  const { createUser, googleLogin } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const location = useLocation();
  const navigate = useNavigate();

  // Handle input changes for the controlled component
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handles the image file upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setImageFile(null);
      setPreviewUrl("");
    }
  };

  // Handles the main registration process
  const handleRegister = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;

    // Password validations
    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters long.");
    }
    if (!/[A-Z]/.test(password)) {
      return toast.error(
        "Password must include at least one uppercase letter."
      );
    }
    if (!/[!@#$%^&*]/.test(password)) {
      return toast.error(
        "Password must include at least one special character (!@#$%^&*)."
      );
    }
    if (!/[0-9]/.test(password)) {
      return toast.error("Password must include at least one number (0-9).");
    }

    const toastId = toast.loading("Creating user account...");
    let photoURL = "";

    // Upload photo to ImgBB if a file is selected
    if (imageFile) {
      setIsUploading(true);
      const imgbbToastId = toast.loading("Uploading image...", {
        id: "imgbb-toast",
      });

      try {
        const uploadFormData = new FormData();
        uploadFormData.append("image", imageFile);

        const response = await axios.post(
          `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
          uploadFormData
        );

        photoURL = response.data.data.url;
        toast.success("Image uploaded successfully!", { id: imgbbToastId });
      } catch (error) {
        toast.error("Failed to upload image. Using a default photo.", {
          id: imgbbToastId,
        });
        console.error("Image upload failed:", error);
        photoURL = "https://source.unsplash.com/100x100/?portrait"; // Default photo
      } finally {
        setIsUploading(false);
      }
    } else {
      photoURL = "https://source.unsplash.com/100x100/?portrait";
    }

    // Create user and update profile
    try {
      const userCredential = await createUser(email, password);

      // We are now using the imported updateProfile function directly.
      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: photoURL,
      });

      toast.success("Registration successful!", { id: toastId });
      navigate(location.state || "/");
    } catch (error) {
      toast.error(error.message, { id: toastId });
      console.error(error);
    }
  };

  // Login with Google
  const handleGoogleLogin = async () => {
    const toastId = toast.loading("Logging in with Google...");
    try {
      await googleLogin();
      toast.success("Login successful!", { id: toastId });
      navigate(location.state || "/");
    } catch (error) {
      toast.error("Failed to login with Google.", { id: toastId });
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Helmet>
        <title>Register | Idea Canvas</title>
      </Helmet>
      <div className="w-full max-w-lg p-8 space-y-6  rounded-xl shadow-md shadow-orange-300 transition-all duration-300 transform scale-100">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-orange-500">
            Create an Account
          </h2>
          <p className="text-base text-base-content mt-2">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-orange-500 hover:underline font-semibold"
            >
              Login here
            </Link>
          </p>
        </div>

        {/* Google Login Button */}
        <div className="my-6">
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center w-full py-3 space-x-4 border border-gray-300 rounded-md shadow-sm transition duration-300 ease-in-out hover:bg-orange-500 hover:text-white text-base-content"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              className="w-5 h-5 fill-current"
            >
              <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
            </svg>
            <p>Register with Google</p>
          </button>
        </div>

        {/* Separator */}
        <div className="flex items-center w-full my-4">
          <hr className="w-full border-gray-300" />
          <p className="px-3 text-base-content text-sm">OR</p>
          <hr className="w-full border-gray-300" />
        </div>

        {/* Register Form */}
        <form onSubmit={handleRegister} className="space-y-6">
          {/* Name and Photo Fields in a single row */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Name Field */}
            <div className="flex-1">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-base-content"
              >
                Your Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm  focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-300"
                required
              />
            </div>

            {/* Photo Upload with Preview */}
            <div className="flex-1">
              <label
                htmlFor="photo"
                className="block text-sm font-medium text-base-content"
              >
                Upload Photo
              </label>
              <div className="flex items-center mt-1">
                <input
                  type="file"
                  name="photo"
                  id="photo"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="flex-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm  focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-300"
                />
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="h-12 w-12 ml-4 rounded-md object-cover"
                  />
                ) : (
                  <FaUserCircle className="h-12 w-12 ml-4 text-gray-400" />
                )}
              </div>
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-base-content"
            >
              Email address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm  focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-300"
              required
            />
          </div>

          {/* Password Field with Toggle */}
          <div className="relative">
            <div className="flex justify-between items-center">
              <label
                htmlFor="password"
                className="text-sm font-medium text-base-content"
              >
                Password
              </label>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="********"
              className="w-full px-4 py-2 mt-1 pr-10 border border-gray-300 rounded-md shadow-sm  focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-300"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 top-6 pr-3 flex items-center text-gray-500 focus:outline-none"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isUploading}
              className={`w-full py-3 font-semibold rounded-md text-white transition duration-300 ${
                isUploading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600"
              }`}
            >
              {isUploading ? "Uploading Photo..." : "Register Now"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
