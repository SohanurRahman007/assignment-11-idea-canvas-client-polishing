import React from "react";

const ArticleModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    // Check if the click target is the outer div itself, and not a child element
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto backdrop-blur-md flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className=" rounded-lg shadow-md shadow-orange-300 max-w-4xl w-full max-h-[90vh] overflow-y-auto transform transition-all">
        <div className="p-6">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="text-base-content hover:text-gray-800 transition-colors"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <header className="mb-4 lg:mb-6 not-format">
            <h1 className="mb-4 text-3xl font-extrabold leading-tight text-base-content lg:mb-6 lg:text-4xl">
              The Future of Web Development is Here
            </h1>
            <div className="flex items-center space-x-4">
              <img
                className="w-10 h-10 rounded-full"
                src="https://placehold.co/40x40/cccccc/333333?text=A"
                alt="Author Avatar"
              />
              <div className="font-medium text-base-content">
                <p>Sohanur Rahman</p>
                <p className="block text-sm font-normal text-base-content">
                  Published on{" "}
                  <time dateTime="2023-01-01">January 1, 2023</time>
                </p>
              </div>
            </div>
          </header>

          <figure className="mb-8">
            <img
              src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              alt="Article hero image"
              className="w-full h-auto rounded-lg shadow-lg"
            />
            <figcaption className="mt-2 text-center text-sm text-base-content">
              A modern developer's setup.
            </figcaption>
          </figure>

          <p className="lead text-lg mb-6 text-base-content">
            Welcome to a new era of web development, where the lines between
            front-end and back-end are blurring and new tools are emerging at a
            rapid pace. This article will explore the key technologies and
            methodologies shaping the future of how we build for the web.
          </p>

          <h2 className="text-2xl font-bold mb-4 text-base-content">
            The Rise of Serverless Architecture
          </h2>
          <p className="mb-4 text-base-content">
            Serverless computing allows developers to build and run applications
            without managing servers. This approach significantly reduces
            operational costs and complexity, enabling faster deployment and
            scaling. We'll dive into how platforms like AWS Lambda and Google
            Cloud Functions are making this a reality for modern web
            applications.
          </p>

          <h2 className="text-2xl font-bold mb-4 text-base-content">
            AI in Development Workflows
          </h2>
          <p className="mb-4 text-base-content">
            Artificial intelligence is no longer just for data scientists.
            AI-powered tools are now assisting developers in writing code,
            debugging, and optimizing performance. We'll look at how tools like
            GitHub Copilot and other AI assistants are becoming invaluable
            partners in the development process.
          </p>

          <blockquote className="p-4 my-4 border-l-4 border-orange-500  italic rounded-r-lg text-base-content">
            <p>“The best way to predict the future is to create it.”</p>
          </blockquote>

          <p className="mb-4 text-base-content">
            Ultimately, the future of web development is about speed,
            efficiency, and intelligence. By embracing these new technologies
            and methodologies, we can build more robust, scalable, and
            user-friendly applications than ever before.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ArticleModal;
