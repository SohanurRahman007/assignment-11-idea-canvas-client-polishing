import React from "react";

const PrivacyPolicy = () => {
  return (
    <section className="bg-white mt-6 mb-6 dark:bg-gray-900 text-gray-700 dark:text-gray-300 px-6 md:px-12 py-12  mx-auto  md:rounded-sm shadow-sm">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-orange-500 mb-3">
          Privacy Policy
        </h2>
        <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
          This Privacy Policy outlines how we collect, use, and protect your
          information when you use our services.
        </p>
      </div>

      <div className="space-y-6 text-sm leading-relaxed">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            1. Information We Collect
          </h3>
          <p>
            We collect personal data such as name, email, and contact
            information when you sign up, subscribe to our newsletter, or use
            our services.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            2. How We Use Your Information
          </h3>
          <ul className="list-disc list-inside space-y-1">
            <li>To provide and maintain our services</li>
            <li>To communicate with you (updates, newsletters, support)</li>
            <li>To improve our website and personalize user experience</li>
            <li>To comply with legal obligations</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            3. Information Sharing
          </h3>
          <p>
            We do not sell or rent your data. We may share your information with
            trusted third parties for hosting, analytics, and service provision
            under strict confidentiality agreements.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            4. Cookies & Tracking
          </h3>
          <p>
            We use cookies to enhance your experience. You can disable cookies
            in your browser, but some features may not function correctly.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            5. Data Security
          </h3>
          <p>
            We use industry-standard security measures to protect your data from
            unauthorized access, disclosure, or destruction.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            6. Your Rights
          </h3>
          <p>
            You have the right to access, update, or delete your personal
            information. Contact us at{" "}
            <span className="text-orange-500 font-medium">
              support@ideacanvas.com
            </span>{" "}
            for requests.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            7. Changes to This Policy
          </h3>
          <p>
            We may update our privacy policy occasionally. We will notify you
            via email or website notice of any significant changes.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            8. Contact Us
          </h3>
          <p>
            For questions or concerns about this privacy policy, contact us at{" "}
            <span className="text-orange-500 font-medium">
              support@ideacanvas.com
            </span>
            .
          </p>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
