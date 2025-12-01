// src/features/auth/PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";

export const PrivateRoute = ({ children, requiredRole }) => {
  try {
    const { user, isAuthenticated } = useAuth();
    // console.log(user,isAuthenticated)
    if (!isAuthenticated) return <Navigate to="/signin" replace />;
    if (requiredRole && user.role !== requiredRole)
    return <Navigate to="/unauthorized" replace />;
    return children;
  } catch (error) {
    console.error("Error in PrivateRoute:", error);
    toast.error("An error occurred while loading the page.");
    return (
        <>
        <p>Error loading this page. Please try again later. </p>
        </>
    )
  }
  
};
