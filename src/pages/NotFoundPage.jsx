import React from "react";
import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

// # DONE
const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800 px-6">
      <div className="text-center">
        <AlertTriangle className="mx-auto text-yellow-500 w-20 h-20 mb-6" />

        <h1 className="text-6xl font-extrabold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
        <p className="text-gray-600 max-w-md mx-auto mb-8">
          Oops! The page you're looking for doesn't exist or may have been moved.
          Please check the URL or return to the home page.
        </p>

        <Link
          to="/"
          className="inline-block bg-blue-600 text-white font-medium px-6 py-3 rounded-lg shadow hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
        >
          Back to Home
        </Link>
      </div>

      <footer className="mt-16 text-sm text-gray-500">
        © {new Date().getFullYear()} GearRent. All rights reserved.
      </footer>
    </div>
  );
};

export default NotFound;
