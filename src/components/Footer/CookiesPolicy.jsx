import React from "react";

const CookiesPolicy = () => {
  return (
    <section className="mt-6 text-base-content mb-6 md:rounded-sm bg-base-100 py-16">
      <div className=" text-base-content mb-10">
        <h2 className="text-3xl font-bold text-orange-500 mb-3">
          Cookies Policy
        </h2>
        <p className="max-w-2xl  text-base-content">
          This Cookies Policy explains how IdeaCanvas uses cookies and similar
          technologies when you use our website.
        </p>
      </div>

      <div className="space-y-6 text-sm leading-relaxed">
        <div>
          <h3 className="text-xl font-semibold text-base-content mb-2">
            1. What Are Cookies?
          </h3>
          <p>
            Cookies are small data files stored on your device when you visit a
            website. They help us improve your browsing experience and deliver
            personalized content.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-base-content mb-2">
            2. Types of Cookies We Use
          </h3>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <strong>Essential Cookies:</strong> Necessary for basic site
              functionality (e.g., login, navigation).
            </li>
            <li>
              <strong>Performance Cookies:</strong> Collect anonymous usage data
              for analytics and performance optimization.
            </li>
            <li>
              <strong>Functional Cookies:</strong> Remember your preferences
              like theme, language, etc.
            </li>
            <li>
              <strong>Marketing Cookies:</strong> Used to track your activity
              and deliver personalized advertising (only if applicable).
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-base-content mb-2">
            3. How to Control Cookies
          </h3>
          <p>
            You can control and manage cookies through your browser settings.
            Disabling cookies may affect some parts of our website.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-base-content mb-2">
            4. Third-Party Cookies
          </h3>
          <p>
            We may use third-party services like Google Analytics, which may
            place their own cookies to analyze website traffic.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-base-content mb-2">
            5. Updates to This Policy
          </h3>
          <p>
            We may update this Cookies Policy from time to time. Check this page
            periodically to stay informed.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-base-content mb-2">
            6. Contact Us
          </h3>
          <p>
            If you have questions about our cookies or privacy practices, please
            contact us at{" "}
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

export default CookiesPolicy;
