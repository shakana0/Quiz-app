import React, { useState, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { useDispatch, useSelector } from "react-redux";
import { ModalStyling } from "../../components/styles/Modal.styled";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { AuthBtn } from "../buttons/AuthBtn";
import { toggleModalState, setActiveForm } from "./ModalSlice";
import {
  setLogInSuccess,
  fetchLoggedInUser,
  fetchNewUser,
  resetErrorMsgs,
  setIsCorrect,
} from "./AuthSlice";
import { credentialsType } from "../../interface/userType";
import { useNavigate } from "react-router-dom";
// import * as api from "../../api/userApi";
import useAuth from "../../hooks/userAuth";
import { GoogleLoginBtn } from "../buttons/LoginBtn"

export const Modal = () => {
  const appContext = useAuth();

  const initialCredentialsState = {
    emailAdress: "",
    userName: "",
    password: "",
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ref = useRef<HTMLFormElement>(null);
  const { modalType } = useSelector((state: any) => state.modal);
  const { activeForm } = useSelector((state: any) => state.modal);
  const { activeUser } = useSelector((state: any) => state.auth);
  const { errorMsgs } = useSelector((state: any) => state.auth);
  const { isCorrect } = useSelector((state: any) => state.auth);

  //decreing state varibles
  const [credentials, setCredentials] = useState<credentialsType>(
    initialCredentialsState
  );
  // const [errors, setErrors] = useState<credentialsType>(
  //   initialCredentialsState
  // );
  const [logInCredentials, setLogInCredentials] = useState<credentialsType>(
    initialCredentialsState
  );
  // const [isCorrect, setIsCorrect] = useState({
  //   email: false,
  //   userName: false,
  //   password: false,
  // });

  const resetForm = () => {
    //clears all input fields in form
    if (ref.current != null) {
      ref.current.reset();
    }
    //clears all errors
    // setErrors((current) => {
    //   return {
    //     ...current,
    //     emailAdress: "",
    //     userName: "",
    //     password: "",
    //   };
    // });
    //clear errorMsgs
    dispatch(resetErrorMsgs());
    //clear check marks
    // setIsCorrect((current) => {
    //   return {
    //     ...current,
    //     email: false,
    //     userName: false,
    //     password: false,
    //   };
    // });
  };

  // const validateForm = (event: any) => {
  //   event.preventDefault();
  //   let newErr = {
  //     emailAdress: "",
  //     userName: "",
  //     password: "",
  //   };
  //   const validChar = /^[0-9a-zA-Z@.-_åäöÅÄÖ]+$/;
  //   const emailValidFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  //   //validation for email
  //   if (credentials.emailAdress === "") {
  //     newErr.emailAdress = "Email adress is required";
  //   } else if (!validChar.test(credentials.emailAdress)) {
  //     newErr.emailAdress = "Invalid characters detected :(";
  //   } else if (!emailValidFormat.test(credentials.emailAdress)) {
  //     newErr.emailAdress =
  //       "Email adress must be in correct format for e.g. name@gmail.com :( ";
  //   } else if (
  //     credentials.emailAdress.length! < 10 ||
  //     credentials.emailAdress.length! > 20
  //   ) {
  //     newErr.emailAdress =
  //       "Your email adress needs to be between 13 and 20 characters long";
  //   } else {
  //     setIsCorrect((current) => {
  //       return {
  //         ...current,
  //         email: true,
  //       };
  //     });
  //   }

  //   //validation for user name
  //   if (credentials.userName === "") {
  //     newErr.userName = "User name is required";
  //   } else if (!validChar.test(credentials.userName)) {
  //     newErr.userName = "Invalid characters detected :(";
  //   } else if (
  //     credentials.userName.length! < 8 ||
  //     credentials.userName.length! > 15
  //   ) {
  //     newErr.userName =
  //       "Your user name needs to be between 8 and 15 characters long";
  //   } else {
  //     setIsCorrect((current) => {
  //       return {
  //         ...current,
  //         userName: true,
  //       };
  //     });
  //   }

  //   //validation for password
  //   if (credentials.password === "") {
  //     newErr.password = "Password is required";
  //   } else if (
  //     credentials.password.length! < 8 ||
  //     credentials.password.length! > 15
  //   ) {
  //     newErr.password =
  //       "Your password needs to be between 8 and 15 characters long";
  //   } else {
  //     setIsCorrect((current) => {
  //       return {
  //         ...current,
  //         password: true,
  //       };
  //     });
  //   }
  //   setErrors(newErr);
  //   //checking if there is any errors
  //   let noErr = [];
  //   for (let value of Object.values(newErr)) {
  //     if (value !== "") {
  //       noErr.push("error");
  //     }
  //   }
  //   if (!noErr.length) {
  //     sendCredentials();
  //   }
  // };
  const sendCredentials = async () => {
    dispatch(resetErrorMsgs());
    const res = await dispatch(fetchNewUser(credentials));
    dispatch(setIsCorrect());

    if (res.payload.data) {
      dispatch(setLogInSuccess(true));
      dispatch(toggleModalState({ showModal: false, modalType: "" }));
      navigate("/");
    }
  };

  const handleLogIn = async () => {
    const res = await dispatch(fetchLoggedInUser(logInCredentials));

    // appContext.setAuth({
    //   emailAdress: "riri@gmail.com",
    //   userName: "riri1234",
    //   password: "riri1234",
    // });

    console.log(res.payload.data.user);
    const user =  JSON.parse(localStorage.getItem("isLoggedIn") || 'false')
    appContext.setAuth(user);

    // if (Object.keys(activeUser).length !== 0) {
    //   dispatch(setLogInSuccess(true));
    //   window.localStorage.setItem("isLoggedIn", "true");
    //   dispatch(toggleModalState({ showModal: false, modalType: "" }));
    //   navigate("/");
    // }
    if (res.payload.data) {
      dispatch(setLogInSuccess(true));
      dispatch(toggleModalState({ showModal: false, modalType: "" }));
      navigate("/");
    } else {
      // setErrors((current) => {
      //   return {
      //     ...current,
      //     emailAdress: "Email adress or user name does not exist",
      //     userName: "",
      //     password: "Wrong password",
      //   };
      // });
    }
  };

  //Renders authentication buttons
  const RenderModalToggleBtns = () => {
    return (
      <div>
        <AuthBtn
          variant="secondary-light"
          isFullWidth={false}
          btnText="Log In"
          className={activeForm.logIn ? "isActive" : ""}
          onClick={(event: React.MouseEvent<HTMLElement>) => {
            dispatch(
              toggleModalState({ showModal: true, modalType: "Log In" })
            );
            resetForm();
            dispatch(setActiveForm({ logIn: true, signUp: false }));
          }}
        />
        <AuthBtn
          variant="secondary-light"
          isFullWidth={false}
          btnText="Sign Up"
          className={activeForm.signUp ? "isActive" : ""}
          onClick={(event: React.MouseEvent<HTMLElement>) => {
            dispatch(
              toggleModalState({ showModal: true, modalType: "Sign Up" })
            );
            resetForm();
            dispatch(setActiveForm({ logIn: false, signUp: true }));
          }}
        />
      </div>
    );
  };

  /*****/
  const FormHandler = () => {
    if (modalType === "Sign Up") {
      return (
        <form action="" ref={ref}>
          <div className="close-icon-container">
            <CloseRoundedIcon
              className="close-icon"
              onClick={() => {
                dispatch(toggleModalState({ showModal: false, modalType: "" }));
                dispatch(resetErrorMsgs());
              }}
            />
          </div>
          <div className="btn-container">
            {RenderModalToggleBtns()}

            <div className="sign-up-btn-container">
              <div>
                <GoogleLoginBtn/>
                {/* <button>
                  <GoogleIcon className="google-icon" />
                  <p>Log In With Google</p>
                </button> */}
                <button>
                  <FacebookIcon className="facebook-icon" />
                  <p>Log In With Facebook</p>
                </button>
              </div>
              <div className="or-email">
                <span></span>
                <p>Or Email</p>
                <span></span>
              </div>
            </div>
          </div>
          <div className="input-box">
            <input
              type="email"
              placeholder="email address..."
              onChange={(event) =>
                setCredentials({
                  ...credentials,
                  emailAdress: event?.target.value,
                })
              }
            />
            <CheckRoundedIcon
              className={isCorrect.email ? "check-icon" : "hide"}
            />
          </div>
          {/* <p className="error">{errors && errors.emailAdress}</p> */}
          <p className="error">{errorMsgs.emailAdress}</p>

          <div className="input-box">
            <input
              type="text"
              placeholder="username..."
              onChange={(event) =>
                setCredentials({
                  ...credentials,
                  userName: event?.target.value,
                })
              }
            />
            <CheckRoundedIcon
              className={isCorrect.userName ? "check-icon" : "hide"}
            />
          </div>
          <p className="error">{errorMsgs.userName}</p>

          <div className="input-box">
            <input
              type="password"
              placeholder="password..."
              onChange={(event) =>
                setCredentials({
                  ...credentials,
                  password: event?.target.value,
                })
              }
            />
            <CheckRoundedIcon
              className={isCorrect.password ? "check-icon" : "hide"}
            />
          </div>
          <p className="error">{errorMsgs.password}</p>
          <AuthBtn
            variant="secondary"
            isFullWidth={true}
            btnText="Sign Up"
            // onClick={validateForm}
            onClick={sendCredentials}
          />
        </form>
      );
    }
    if (modalType === "Log In") {
      return (
        <form
          action=""
          ref={ref}
          onClick={(event) => {
            event.preventDefault();
          }}
        >
          <div className="close-icon-container">
            <CloseRoundedIcon
              className="close-icon"
              onClick={() => {
                dispatch(toggleModalState(false));
                dispatch(resetErrorMsgs());
              }}
            />
          </div>
          <div className="btn-container">
            {RenderModalToggleBtns()}
            <button>
              <GoogleIcon className="google-icon" />
              <p>Log In With Google</p>
            </button>
            <button>
              <FacebookIcon className="facebook-icon" />
              <p>Log In With Facebook</p>
            </button>
          </div>
          <div className="input-box">
            <input
              type="email"
              placeholder="email address or user name..."
              onChange={(event) =>
                setLogInCredentials({
                  ...logInCredentials,
                  emailAdress: event?.target.value,
                  userName: event?.target.value,
                })
              }
            />
            <CheckRoundedIcon
              className={isCorrect.email ? "check-icon" : "hide"}
            />
          </div>
          {/* <p className="error">{errors && errors.emailAdress}</p> */}
          <p className="error">{errorMsgs.emailAdress}</p>

          <div className="input-box">
            <input
              type="password"
              placeholder="password..."
              onChange={(event) =>
                setLogInCredentials({
                  ...logInCredentials,
                  password: event?.target.value,
                })
              }
            />
            <CheckRoundedIcon
              className={isCorrect.password ? "check-icon" : "hide"}
            />
          </div>
          <p className="error">{errorMsgs.password}</p>
          <AuthBtn
            variant="secondary"
            isFullWidth={true}
            btnText="Log In"
            onClick={handleLogIn}
          />
        </form>
      );
    }
  };

  return (
    <ModalStyling>
      <div className="pic-container">
        <img
          src={require("../../assets/img/astronaut-coming-down.png")}
          alt=" picture of stronaut coming down"
          width={450}
          height={450}
        />
      </div>

      {FormHandler()}
    </ModalStyling>
  );
};
