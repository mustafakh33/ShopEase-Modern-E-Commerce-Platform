import { useAppSelector } from "@store/hooks";
import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const { token } = useAppSelector((state) => state.auth);

  if (token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AuthLayout; 