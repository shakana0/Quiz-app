import { useLocation, Navigate, Outlet } from "react-router";
import useAuth from "./userAuth";

const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();
  console.log(auth?.emailAdress, "auth :)");

  return auth ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  ); //where not asking to user to navigate
};

export default RequireAuth;
