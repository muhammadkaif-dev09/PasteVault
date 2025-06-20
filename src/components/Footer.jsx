import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 mt-10 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center">
        {/* Left Side */}
        <p className="text-sm text-center sm:text-left">
          © {new Date().getFullYear()} SimplePaste. All rights reserved.
        </p>

        {/* Right Side */}
        <div className="flex gap-4 mt-3 sm:mt-0">
          <a
            href="https://github.com/muhammadkaif-dev09"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-600 transition"
          >
            GitHub
          </a>
          <a href="/privacy" className="hover:text-purple-600 transition">
            Privacy
          </a>
          <a href="/contact" className="hover:text-purple-600 transition">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
