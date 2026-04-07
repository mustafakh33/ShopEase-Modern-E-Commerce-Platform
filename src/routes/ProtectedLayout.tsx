import { useAppSelector } from "@store/hooks";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedLayout = () => {
  const { token } = useAppSelector((state) => state.auth);
  const location = useLocation();

  const publicRoutes = [
    "/login",
    "/register",
    "/forgot-password",
    "/verify-reset-code",
    "/reset-password",
    "/",
    "/categories",
    "/brands",
  ];

  // Check if the route is public or matches product/category patterns
  const isPublic =
    publicRoutes.includes(location.pathname) ||
    location.pathname.startsWith("/products/") ||
    location.pathname.startsWith("/product-details/");

  if (!token && !isPublic) {
    return <Navigate to="/login" replace />;
  }

  if (
    token &&
    (location.pathname === "/login" || location.pathname === "/register")
  ) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedLayout;
