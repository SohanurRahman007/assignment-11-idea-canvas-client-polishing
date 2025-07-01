import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const { loginUser, googleLogin } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    // Login User
    loginUser(email, password)
      .then((result) => {
        Swal.fire({
          title: "Login successfully!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        navigate(`${location.state ? location.state : "/"}`);
        console.log(result);
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
      });
  };

  // Login with Google
  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        Swal.fire({
          title: "Login successfully!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        navigate(`${location.state ? location.state : "/"}`);
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="my-7 flex flex-col">
      <div className="card  w-full mx-auto md:w-5/12 shrink-0 shadow-2xl ">
        <div className="w-full mx-auto rounded-b-md  sm:p-8 ">
          <h2 className="mb-3 text-3xl font-semibold text-center text-orange-500">
            Login Now
          </h2>
          <p className="text-sm text-center text-base-content">
            Dont have account?
            <Link
              to="/register"
              href="#"
              rel="noopener noreferrer"
              className="focus:underline hover:underline text-green-500 ml-1"
            >
              Register here
            </Link>
          </p>
          <div className="my-6 space-y-4">
            <button
              onClick={handleGoogleLogin}
              aria-label="Login with Google"
              type="button"
              className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-600 focus:dark:ring-violet-600 hover:bg-orange-500 hover:text-white cursor-pointer transition-colors duration-300"
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
          <div className="flex items-center w-full my-4">
            <hr className="w-full text-base-content border-orange-500" />
            <p className="px-3 text-base-content ">OR</p>
            <hr className="w-full border-orange-500 text-base-content" />
          </div>
          <form
            onSubmit={handleLogin}
            className="space-y-8 p-4 transition-all bg-base-100 rounded-sm shadow"
          >
            <div className="space-y-4 bg-base-100 text-base-content">
              {/* Email Field */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm text-base-content"
                >
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="leroy@jenkins.com"
                  className="w-full px-3 py-2  border-2 border-gray-300 focus:outline-none focus:border-orange-500 rounded-sm bg-base-100"
                  required
                />
              </div>

              {/* Password Field with Toggle */}
              <div className="space-y-2 relative">
                <div className="flex justify-between">
                  <label htmlFor="password" className="text-sm">
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-xs hover:underline text-base-content"
                  >
                    Forgot password?
                  </a>
                </div>

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="*****"
                  className="w-full px-3 py-2 rounded-sm text-base-content pr-10  border-2 border-gray-300 focus:outline-none focus:border-orange-500"
                  required
                />

                {/* Toggle Button */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-[2.4rem] text-base-content focus:outline-none"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <input
              type="submit"
              value="Login Now"
              className="w-full px-8 btn py-3 font-semibold rounded-sm bg-orange-500 text-white "
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
