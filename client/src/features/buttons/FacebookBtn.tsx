import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import FacebookLogin from "react-facebook-login";
import {fetchUserGoogleLogin, fetchUserFacebookLogin, setLogInSuccess, setAuthLogin} from "../Modal/AuthSlice"
import { toggleModalState } from "../Modal/ModalSlice"
export const FacebookLoginBtn = () => {
    // const [isSignedIn, setIsSignedIn] = useState(false);
    const dispatch = useDispatch()

  const responseFacebook = async(res: any) => {
    console.log(res);
    const user = await dispatch(fetchUserFacebookLogin({ accessToken: res.accessToken, userId: res.userID }));
    // if (res.accessToken) {
    //     setIsSignedIn(true);
    // } else {
    //     setIsSignedIn(false);
    // }
    if (user) {
      dispatch(setLogInSuccess(true));
      // dispatch(setAuthLogin(true));
      localStorage.setItem(
        "isfacebookLogIn",
        JSON.stringify({ login: true, token: res.accessToken })
      );
      dispatch(toggleModalState({ showModal: false, modalType: "" }));
      // setIsSignedIn(true);
    }
  };

  // const FB.logout = (response) => {
  //   // user is now logged out
  // };

  return <>
    <FacebookLogin
    appId={`${process.env.REACT_APP_FACEBOOK_APP_ID}`}
    // autoLoad={true}
    fields="name,email,picture"
    // onClick={componentClicked}
    callback={responseFacebook} />
{/* 
<FacebookLogin
    appId={`${process.env.REACT_APP_FACEBOOK_APP_ID}`}
    // autoLoad={true}
    fields="name,email,picture"
    // onClick={componentClicked}
    callback={responseFacebook} /> */}

{/* {!isSignedIn &&

}
{isSignedIn &&

} */}

{/* {isSignedIn &&

  {data.name}

    {data.email}
} */}
  </>;
};

//https://www.youtube.com/watch?v=zQNPDRg_1Po  18:16
//Facebook logout
//fixa alla errors i consolen
//