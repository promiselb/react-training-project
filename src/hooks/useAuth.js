import { useSelector } from "react-redux";
import { selectAuth } from "../features/auth/authSlice";

/**
 * useAuth Hook
 * - Returns auth state (user, role, token, isAuthenticated)
 * - Purely reads from Redux (no useEffect)
 */
export const useAuth = () => {
  const { user, loading, error, isAuthenticated } = useSelector(selectAuth) || {};
//   console.log("useAuth - user:", user);
  
  return {
    user,
    loading, error,
    isAuthenticated,
  };
};