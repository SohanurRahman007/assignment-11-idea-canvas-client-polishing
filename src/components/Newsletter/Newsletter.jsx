import React, { useState } from "react";
import toast from "react-hot-toast";

const Newsletter = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email } = formData;

    if (!name.trim()) return toast.error("Please enter your name");
    if (!/\S+@\S+\.\S+/.test(email)) return toast.error("Enter a valid email");

    toast.success(`Thanks, ${name}! You’re now subscribed 🎉`);
    setFormData({ name: "", email: "" });
  };

  return (
    <section className=" shadow-sm shadow-orange-300 py-10 mb-6 rounded-sm">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-orange-500">
            Join Our Newsletter
          </h2>
          <p className="text-base-content mt-1.5 max-w-2xl mx-auto">
            Be the first to hear about our latest blog posts, tips, and
            tutorials. No spam — just useful stuff.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto mt-6"
        >
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Full Name"
            className="w-full px-4 py-3 border border-orange-300 rounded-md bg-white dark:bg-transparent dark:border-orange-500 text-gray-800 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full px-4 py-3 border border-orange-300 rounded-md bg-white dark:bg-transparent dark:border-orange-500 text-gray-800 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md px-6 py-3 transition w-full"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
