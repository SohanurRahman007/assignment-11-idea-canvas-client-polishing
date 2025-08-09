import React, { useState } from "react";
import ArticleModal from "../ArticleModal/ArticleModal";

const FeaturedPost = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <section className="py-6 mt-6 mb-10 shadow-sm shadow-orange-300">
      <div className="mx-auto  lg:px-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-orange-500">
            Editor's Pick
          </h2>
          <p className="mt-2 text-base-content max-w-2xl mx-auto">
            A must-read article for this week.
          </p>
        </div>

        <div className="shadow-lg rounded-md overflow-hidden md:flex  mx-auto">
          {/* Featured Image */}
          <div className="md:flex-shrink-0">
            <img
              className="h-64 w-full object-cover md:w-90"
              src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              alt="Laptop with code on a desk"
            />
          </div>

          {/* Post Content */}
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-orange-500 font-semibold">
              Tech & AI
            </div>
            <p className="block mt-1 text-2xl leading-tight font-medium text-base-content hover:underline ">
              The Future of Web Development is Here
            </p>
            <p className="mt-2 text-base-content max-w-2xl mx-auto">
              Explore the latest trends in front-end frameworks, serverless
              architecture, and the growing role of AI in creating more dynamic
              and personalized user experiences.
            </p>
            <div className="mt-4">
              <button
                onClick={openModal}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-full transition-all"
              >
                Read Article
              </button>
            </div>
          </div>
        </div>
      </div>
      <ArticleModal isOpen={isModalOpen} onClose={closeModal} />
    </section>
  );
};

export default FeaturedPost;
