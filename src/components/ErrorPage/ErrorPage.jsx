import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const ErrorPage = () => {
  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | Idea Canvas</title>
      </Helmet>
      <div className="flex flex-col justify-center items-center min-h-screen bg-base-100 px-4">
        {/* Text */}
        <div className="text-center">
          <h1 className="text-7xl font-extrabold text-orange-500 mb-4">404</h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-base-content mb-2">
            Oops! Page not found.
          </h2>
          <p className="text-base text-base-content max-w-md mx-auto mb-6">
            The page you're looking for doesn't exist or has been moved. Don't
            worry, let’s get you back to safety!
          </p>

          {/* Back Home Button */}
          <Link
            to="/"
            className="inline-block px-6 py-3 text-white bg-orange-500 hover:bg-orange-600 rounded-md font-semibold shadow transition-all"
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
