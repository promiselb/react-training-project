import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import {
  validateUsername,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validatePhoneNumber,
} from "../utils/accountValidationFunctions";

import { useChangeTitle } from "../hooks/useChangeTitle";

// # DONE 50%
// TODO: call your sign-UP API 
const SignUp = () => {
  useChangeTitle("Public - Sign Up");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // $ Password visibility toggle (optional)
  const [showPassword, setShowPassword] = useState(false);

  // ! Error state object
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });

  // ✅ Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {
      username: validateUsername(username),
      email: validateEmail(email),
      password: validatePassword(password),
      confirmPassword: validateConfirmPassword(password, confirmPassword),
      phoneNumber: validatePhoneNumber(phoneNumber),
    };

    setErrors(validationErrors);
    
    // If there are errors, show them as toasts
    // Do not proceed with form submission
    const hasErrors = Object.values(validationErrors).some((err) => err !== "");
    if (hasErrors) {
      toast.error("❌ Validation failed");
      return;
    }

    // Form is valid, proceed with signup logic
    // TODO: call your signup API here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Create an Account
        </h2>

        {/* Username */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            className={`w-full border p-2 rounded-lg focus:ring-2 focus:outline-none ${
              errors.username
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className={`w-full border p-2 rounded-lg focus:ring-2 focus:outline-none ${
              errors.email
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
        </div>

        {/* Password + Confirm Password */}
        <div className="mb-4 relative">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className={`w-full border p-2 rounded-lg focus:ring-2 focus:outline-none ${
              errors.password
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}

          <label className="block text-gray-700 mb-2">Confirm Password</label>
          <input
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            className={`w-full border p-2 rounded-lg focus:ring-2 focus:outline-none ${
              errors.confirmPassword
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
            )}

          {/* Toggle button for both fields */}
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-9 text-gray-600 hover:text-gray-800"
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-.349.018-.695.054-1.037M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-.56 1.856-1.719 3.515-3.308 4.741M3 3l18 18"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Phone Number */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Phone Number</label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter your phone number"
            className={`w-full border p-2 rounded-lg focus:ring-2 focus:outline-none ${
              errors.phoneNumber
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
            )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;

 
 // ! Error state array
  // const [errors, setErrors] = useState([]);
  // setErrors([
  //   validateUsername(username),
  //   validateEmail(email),
  //   validatePassword(password),
  //   validateConfirmPassword(password, confirmPassword),
  //   validatePhoneNumber(phoneNumber),
  // ].filter(err => err !== ""));
  // If there are errors, show them as toasts
  // Do not proceed with form submission
  // if (errors.length !== 0) {
  //   errors.forEach(err => toast.error(err));
  //   return
  // }
 