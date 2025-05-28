import { useAppSelector } from "@store/hooks";
import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const { token } = useAppSelector((state) => state.auth);

  // If user is authenticated, redirect to home page
  if (token) {
    return <Navigate to="/" replace />;
  }

  // If not authenticated, render the auth pages (login/register)
  return <Outlet />;
};

export default AuthLayout; 