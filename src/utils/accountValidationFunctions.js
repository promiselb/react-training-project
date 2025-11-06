import { useState, useEffect } from "react";

// ✅ Username must be at least 3 characters, letters/numbers/underscores only
export function validateUsername(username) {
  if (!username.trim()) return "Username is required.";
  if (username.length < 3) return "Username must be at least 3 characters.";
  const usernameRegex = /^[a-zA-Z0-9_]+$/;
  if (!usernameRegex.test(username))
    return "Username can only contain letters, numbers, and underscores.";
  return ""; // valid
}

// ✅ Simple but solid email validation
export function validateEmail(email) {
  if (!email.trim()) return "Email is required.";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return "Please enter a valid email address.";
  return ""; // valid
}

// ✅ Password must be at least 6 chars, include letters & numbers
export function validatePassword(password) {
  if (!password) return "Password is required.";
  if (password.length < 6)
    return "Password must be at least 6 characters long.";
  const strongPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]+$/;
  if (!strongPassword.test(password))
    return "Password must contain at least one letter and one number.";
  return ""; // valid
}

// ✅ Confirm Password: must match the password
export function validateConfirmPassword(password, confirmPassword) {
  if (!confirmPassword) return "Please confirm your password.";
  if (confirmPassword !== password) return "Passwords do not match.";
  return "";
}

// ✅ Phone number: digits only, 8–15 digits typical range
export function validatePhoneNumber(phoneNumber) {
  if (!phoneNumber.trim()) return "Phone number is required.";
  const regex = /^[0-9]{8,15}$/;
  if (!regex.test(phoneNumber))
    return "Phone number must contain only digits (8-15 numbers).";
  return "";
}

