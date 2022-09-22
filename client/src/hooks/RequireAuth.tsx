import { useLocation, Navigate, Outlet } from "react-router";
import useAuth from "./userAuth";
import { useSelector } from "react-redux";

const RequireAuth = () => {
  // const { auth } = useAuth();
  const location = useLocation();
  // console.log(auth?.emailAdress, "auth :)");

  const { logInSuccess } = useSelector((state: any) => state.auth);


  return logInSuccess ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  ); //where not asking to user to navigate
};

export default RequireAuth;
