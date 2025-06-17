import React from "react";

const QuickTips = () => {
  return (
    <div>
      <section className="py-12 shadow-sm rounded-md ">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-3 mt-4 text-orange-600">
            Quick Tips for You
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Write consistently – even 10 mins a day helps!",
              "Use high-quality images in your blog posts.",
              "Add personal stories to connect with your readers.",
              "Optimize your post title for SEO and clarity.",
              "Keep paragraphs short and easy to scan.",
              "Engage with your readers in the comments.",
            ].map((tip, index) => (
              <div
                key={index}
                className="bg-gray-50 border-l-4 border-orange-500 p-4 shadow-sm rounded-md"
              >
                <p className="text-gray-800">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default QuickTips;
