import React, { useState } from "react";
import toast from "react-hot-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter an email address");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email");
      return;
    }

    toast.success("Thank you for subscribing to our newsletter");
    setEmail("");
  };

  return (
    <section className="newsletter-section p-6 mt-6 mb-5 bg-orange-100 rounded-md max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-3 text-center text-orange-700">
        Subscribe to our Newsletter
      </h2>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-grow px-4 py-2 rounded border border-orange-400"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 cursor-pointer"
        >
          Subscribe
        </button>
      </form>
    </section>
  );
};

export default Newsletter;
