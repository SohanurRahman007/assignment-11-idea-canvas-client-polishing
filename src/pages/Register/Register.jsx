import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../provider/AuthProvider";

const Register = () => {
  const { createUser, googleLogin } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;

    const formData = new FormData(form);
    const { email, password, ...userProfile } = Object.fromEntries(
      formData.entries()
    );

    // ✅ Password validations
    if (password.length < 6) {
      return setError("Password must be at least 6 characters long.");
    }
    if (!/[A-Z]/.test(password)) {
      return setError("Password must include at least one uppercase letter.");
    }
    if (!/[!@#$%^&*]/.test(password)) {
      return setError(
        "Password must include at least one special character (!@#$%^&*)."
      );
    }
    if (!/[0-9]/.test(password)) {
      return setError("Password must include at least one number (0-9).");
    }

    // create User
    createUser(email, password)
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
      <div className="card text-black w-full mx-auto md:w-5/12 shrink-0 shadow-2xl ">
        <div className="w-full mx-auto rounded-b-md sm:p-8 text-black dark:text-white">
          <h2 className="mb-3 text-3xl font-semibold text-center text-orange-500">
            Register now
          </h2>
          <p className="text-sm text-center dark:text-gray-600">
            Already have an account?
            <Link
              to="/login"
              href="#"
              rel="noopener noreferrer"
              className="focus:underline hover:underline text-green-600"
            >
              Login here
            </Link>
          </p>
          <div className="my-6 space-y-4">
            <button
              onClick={handleGoogleLogin}
              aria-label="Login with Google"
              type="button"
              className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-600 focus:dark:ring-violet-600 hover:bg-orange-500 hover:text-white cursor-pointer transition-colors duration-300 text-gray-700"
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
          <div className="flex items-center w-full my-4">
            <hr className="w-full dark:text-gray-600" />
            <p className="px-3 dark:text-gray-600">OR</p>
            <hr className="w-full dark:text-gray-600" />
          </div>
          <form
            onSubmit={handleRegister}
            className="space-y-8 p-4 transition-all text-gray-800 rounded-lg bg-white shadow"
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm">
                  Your Name
                </label>
                {/* name */}
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Your Name"
                  required
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm">
                  Photo URL
                  {/* photo */}
                </label>
                <input
                  type="text"
                  name="photo"
                  id="photo"
                  placeholder="Photo URL"
                  required
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm">
                  Email address
                </label>
                {/* email */}
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="leroy@jenkins.com"
                  required
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label htmlFor="password" className="text-sm">
                    Password
                  </label>
                </div>
                {/* password */}
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="*****"
                  required
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
                />
              </div>
            </div>
            <input
              type="submit"
              value="Register Now"
              className="w-full px-8 btn py-3 font-semibold rounded-md dark:bg-orange-500 dark:text-gray-50 border-none"
            />
          </form>
          {/* Password error message */}
          {error && (
            <p className="text-red-500 text-sm font-medium text-center">
              {error}
            </p>
          )}
          {success && (
            <p className="text-green-600 text-sm text-center">{success}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
