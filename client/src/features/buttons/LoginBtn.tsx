import React from "react";
import GoogleIcon from "@mui/icons-material/Google";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";

export const GoogleLoginBtn = () => {
  const handleLogin = async (
    res: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    if ("accessToken" in res) {
      console.log(res.accessToken);
    } else {
      console.log("offline");
    }
  };
  const handleFailure = (result: string) => {
    console.log(result);
  };
  return (
    <>
      <GoogleLogin
        clientId="hej"
        onSuccess={handleLogin}
        onFailure={handleFailure}
        cookiePolicy="single_host_origin"
      >
        <button>
          <GoogleIcon className="google-icon" />
          <p>Log In With Google</p>
        </button>
      </GoogleLogin>
    </>
  );
};
