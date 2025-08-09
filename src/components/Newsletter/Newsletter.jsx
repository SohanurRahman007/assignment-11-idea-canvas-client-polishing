import React, { useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const Newsletter = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    country: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const saveToDatabase = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(
        "https://b11a11-server-side-sohanpk24.vercel.app/api/subscribe",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      if (!response.ok)
        throw new Error(result.message || "Failed to subscribe.");

      toast.success("🎉 Successfully subscribed!");
    } catch (e) {
      toast.error(e.message || "Failed to save data.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, age, country } = formData;

    if (!name.trim()) return toast.error("Please enter your name");
    if (!/\S+@\S+\.\S+/.test(email)) return toast.error("Enter a valid email");
    if (!age || age < 18) return toast.error("You must be 18+ to subscribe");
    if (!country.trim()) return toast.error("Please enter your country");

    await saveToDatabase({ name, email, age: parseInt(age, 10), country });
    setFormData({ name: "", email: "", age: "", country: "" });
  };

  return (
    <div className="relative bg-gray-100  rounded-md">
      {/* Parallax Background */}
      <section
        className="relative h-screen flex items-center justify-center bg-fixed bg-cover bg-center rounded-md "
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/1038179/pexels-photo-1038179.jpeg')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0  bg-opacity-40" />

        {/* Content */}
        <motion.div
          className="relative z-10 max-w-4xl w-full px-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="bg-white/20 shadow-xl rounded-xl p-4 md:p-10 border-t-4 border-orange-500 backdrop-blur-md">
            {/* Title */}
            <motion.div
              className="text-center mb-6"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-orange-500">
                Join Our Newsletter
              </h2>
              <p className="mt-2 text-base-content max-w-2xl mx-auto">
                Get tips, tutorials, and insights straight to your inbox.
              </p>
            </motion.div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="grid gap-2 md:gap-4 md:grid-cols-2 lg:grid-cols-4"
            >
              {["name", "email", "age", "country"].map((field, idx) => (
                <motion.input
                  key={idx}
                  type={
                    field === "age"
                      ? "number"
                      : field === "email"
                      ? "email"
                      : "text"
                  }
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={
                    field === "name"
                      ? "Your Full Name"
                      : field === "email"
                      ? "you@example.com"
                      : field === "age"
                      ? "Your Age"
                      : "Your Country"
                  }
                  className="px-4 py-3 rounded-md border border-gray-300 placeholder:text-base-content  focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                  min={field === "age" ? "1" : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                />
              ))}

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="md:col-span-2 lg:col-span-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-md px-6 py-3 shadow-lg transform hover:scale-105 transition-all"
                whileTap={{ scale: 0.95 }}
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Newsletter;
