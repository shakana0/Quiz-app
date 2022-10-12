import React, { useEffect, useState } from "react";
import FacebookLogin from "react-facebook-login";

export const FacebookLoginBtn = () => {
    const [isSignedIn, setIsSignedIn] = useState(false);

  const responseFacebook = (response: any) => {
    console.log(response);
    // setData(response);
    // setPicture(response.picture.data.url);
    if (response.accessToken) {
        setIsSignedIn(true);
    } else {
        setIsSignedIn(false);
    }
  };

  return <>
    <FacebookLogin
    appId={`${process.env.REACT_APP_FACEBOOK_APP_ID}`}
    // autoLoad={true}
    fields="name,email,picture"
    // onClick={componentClicked}
    callback={responseFacebook} />

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
//https://jasonwatmore.com/post/2020/10/25/react-facebook-login-tutorial-example
//https://dev.to/quod_ai/how-to-integrate-facebook-login-api-into-your-react-app-33de