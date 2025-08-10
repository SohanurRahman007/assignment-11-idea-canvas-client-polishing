import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { MoveLeft, Home } from "lucide-react";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | Idea Canvas</title>
      </Helmet>
      {/* Full-screen container with a subtle gradient background */}
      <div className="min-h-screen text-base-content flex items-center justify-center p-4 font-inter">
        <div className="text-center space-y-6 animate-fadeIn">
          {/* Main Error Code */}
          <h1 className="text-8xl md:text-9xl font-extrabold text-orange-500 tracking-wider transition-all duration-300 transform hover:scale-105">
            404
          </h1>

          {/* Headline */}
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-base-content  mb-2">
            Oops! The page you're looking for is lost.
          </h2>

          {/* Description */}
          <p className="text-base md:text-lg text-gray-600 max-w-xl mx-auto">
            It looks like you've followed a broken link or entered a URL that
            doesn't exist on this site.
          </p>

          {/* Button container to arrange the two buttons side by side */}
          <div className="flex justify-center gap-4 mt-6">
            {/* The primary "Go Back Home" button */}
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-8 py-3 bg-orange-500 text-white font-semibold rounded-md shadow-lg transition-all duration-300 transform hover:scale-105 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              <Home size={20} />
              Go Back Home
            </Link>

            {/* The secondary "Go Back" button */}
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 px-8 py-3 border-2 border-orange-500 text-orange-500 font-semibold rounded-md shadow-lg transition-all duration-300 transform hover:scale-105 hover:bg-orange-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 cursor-pointer"
            >
              <MoveLeft size={20} />
              Go Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
