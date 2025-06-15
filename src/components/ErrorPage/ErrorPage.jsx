import React from "react";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className=" mx-auto md:w-7xl mt-2 shadow-2xl shadow-green-600 dark:bg-gray-50">
      <div>
        <img
          src="https://i.ibb.co/Gfmhqm2w/error-Photo.png"
          alt=""
          className="w-full object-cover h-72"
        />
      </div>
      <section className="flex items-center h-full  dark:bg-gray-50 dark:text-gray-800">
        <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
          <div className="max-w-md text-center">
            <h2 className="mb-8 font-extrabold text-9xl dark:text-amber-800">
              <span className="sr-only">Error</span>404
            </h2>
            <p className="text-2xl font-semibold md:text-3xl">
              Sorry, we couldn't find this page.
            </p>
            <p className="mt-2 mb-4 dark:text-gray-600">
              But dont worry, you can find plenty of other things on our
              homepage.
            </p>
            <Link
              rel="noopener noreferrer"
              href="#"
              to="/"
              className="w-full px-8 btn py-3 font-semibold rounded-md dark:bg-orange-500 dark:text-gray-50 border-none"
            >
              Back to homepage
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ErrorPage;
