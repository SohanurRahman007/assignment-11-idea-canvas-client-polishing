import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../../provider/AuthProvider";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const { loginUser, googleLogin } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
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

  // Login with email and password
  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    const toastId = toast.loading("Logging in...");

    try {
      await loginUser(email, password);
      toast.success("Login successful!", { id: toastId });
      navigate(location.state || "/");
    } catch (error) {
      toast.error("Invalid email or password.", { id: toastId });
      console.error("Login error:", error);
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
      console.error("Google login error:", error);
    }
  };

  // Fills the form with demo data for quick testing
  const handleFillForm = () => {
    setFormData({
      email: "sohanur007@gmail.com",
      password: "Sohanur@007",
    });
    toast("Demo credentials filled!", {
      icon: "👏",
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Helmet>
        <title>Login | Idea Canvas</title>
      </Helmet>
      <div className="w-full max-w-lg p-8 space-y-6 rounded-xl shadow-md shadow-orange-300 transition-all duration-300 transform scale-100">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-orange-500">Welcome Back!</h2>
          <p className="text-base text-base-content mt-2">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-orange-500 hover:underline font-semibold"
            >
              Register here
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
            <p>Login with Google</p>
          </button>
        </div>

        {/* Separator */}
        <div className="flex items-center w-full my-4">
          <hr className="w-full border-gray-300" />
          <p className="px-3 text-base-content text-sm">OR</p>
          <hr className="w-full border-gray-300" />
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
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
              className="w-full py-3 font-semibold rounded-md text-white bg-orange-500 hover:bg-orange-600 transition duration-300"
            >
              Login Now
            </button>
          </div>
        </form>

        {/* Demo Credentials Button */}
        <div className="pt-2">
          <button
            onClick={handleFillForm}
            className="w-full py-2 text-sm font-semibold rounded-md text-orange-500 border border-orange-500 hover:bg-orange-500 hover:text-white transition duration-300"
          >
            Fill with Demo Credentials
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
