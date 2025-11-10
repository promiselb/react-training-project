import { useState } from "react";
import { toast } from "react-toastify";
import {
  validateUsername,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validatePhoneNumber,
} from "../utils/accountValidationFunctions";
import { useChangeTitle } from "../hooks/useChangeTitle";
import { useDispatch } from "react-redux";
import { addAccount } from "../features/accounts/accountsThunks";

const SignUp = () => {
  useChangeTitle("Public - Sign Up");
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Unified handleChange for all inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validation before submit
  const validateForm = () => {
    const { username, email, password, confirmPassword, phoneNumber } = formData;
    const validationErrors = {
      username: validateUsername(username),
      email: validateEmail(email),
      password: validatePassword(password),
      confirmPassword: validateConfirmPassword(password, confirmPassword),
      phoneNumber: validatePhoneNumber(phoneNumber),
    };

    const hasErrors = Object.values(validationErrors).some((err) => err !== "");
    if (hasErrors) {
      Object.values(validationErrors)
        .filter((err) => err)
        .forEach((err) => toast.error(err));
      return false;
    }
    return true;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("❌ Validation failed");
      return;
    }

    const newAccount = { ...formData, id: Date.now().toString() };

    setIsSubmitting(true);
    try {
      const res = await dispatch(addAccount(formData)).unwrap();
      console.log("Signing up with:", formData);
      toast.success("✅ Account created successfully!");
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        phoneNumber: "",
      });
    } catch (error) {
      console.error("Sign-up failed:", error);
      toast.error("Failed to sign up.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSave}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Create an Account
        </h2>

        {/* Username */}
        <div className="flex flex-col mb-4">
          <label className="text-sm font-medium text-gray-600 mb-1">Username</label>
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            className="p-2 border rounded focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Email */}
        <div className="flex flex-col mb-4">
          <label className="text-sm font-medium text-gray-600 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="p-2 border rounded focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Password */}
        <div className="flex flex-col mb-4 relative">
          <label className="text-sm font-medium text-gray-600 mb-1">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="p-2 border rounded focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* Confirm Password */}
          <label className="text-sm font-medium text-gray-600 mb-1 mt-3">
            Confirm Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            className="p-2 border rounded focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-8 text-gray-500 hover:text-gray-800"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        {/* Phone Number */}
        <div className="flex flex-col mb-6">
          <label className="text-sm font-medium text-gray-600 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Enter your phone number"
            className="p-2 border rounded focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Buttons */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 rounded-lg text-white transition duration-200 ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isSubmitting ? "Creating Account..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default SignUp;
