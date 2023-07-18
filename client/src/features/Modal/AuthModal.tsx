import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ModalStyling } from "../../components/styles/Modal.styled";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { AuthBtn } from "../buttons/AuthBtn";
import { toggleModalState, setActiveForm } from "./ModalSlice";
import { setLogInSuccess, resetErrorMsgs, setIsCorrect } from "./AuthSlice";
import { credentialsType } from "../../interface/userType";
import { useNavigate } from "react-router-dom";
// import useAuth from "../../hooks/userAuth";
import { GoogleLoginBtn } from "../buttons/GoogleBtn";
import { FacebookLoginBtn } from "../buttons/FacebookBtn";
import { fetchNewUser, fetchLoggedInUser } from "./AsyncThunkFunctions";
import { Loader } from "../../components/Loader";
import Strings from "../../utils/strings";

export const Modal = () => {
  // const appContext = useAuth();

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
  // const { activeUser } = useSelector((state: any) => state.auth);
  const { errorMsgs } = useSelector((state: any) => state.auth);
  const { isCorrect } = useSelector((state: any) => state.auth);
  const { isLoading } = useSelector((state: any) => state.auth);

  //decreing state varibles
  const [credentials, setCredentials] = useState<credentialsType>(
    initialCredentialsState
  );

  const [logInCredentials, setLogInCredentials] = useState<credentialsType>(
    initialCredentialsState
  );

  const resetForm = () => {
    //clears all input fields in form
    if (ref.current != null) {
      ref.current.reset();
    }
    dispatch(resetErrorMsgs());
  };

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
    console.log("hejsaan");
    const res = await dispatch(fetchLoggedInUser(logInCredentials));

    // appContext.setAuth({
    //   emailAdress: "riri@gmail.com",
    //   userName: "riri1234",
    //   password: "riri1234",
    // });

    // const user =  JSON.parse(localStorage.getItem("isLoggedIn") || 'false')
    // appContext.setAuth(user);

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
    }
  };

  //Renders authentication buttons
  const RenderModalToggleBtns = () => {
    return (
      <div>
        <AuthBtn
          variant="secondary-light"
          isFullWidth={false}
          btnText={Strings.globalButtons.button.authLogIn}
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
          btnText={Strings.globalButtons.button.signUp}
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
                <GoogleLoginBtn />
                <FacebookLoginBtn />
              </div>
              <div className="or-email">
                <span></span>
                <p>{Strings.authModal.text.orEmail}</p>
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
            btnText={Strings.globalButtons.button.signUp}
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
            <GoogleLoginBtn />
            <FacebookLoginBtn />
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
            btnText={Strings.globalButtons.button.authLogIn}
            onClick={handleLogIn}
          />
        </form>
      );
    }
  };

  return (
    <ModalStyling>
      {isLoading && <Loader isFixed hasBackground/>}
      <div className="pic-container">
        <img
          src={require("../../assets/img/astronaut-coming-down.png")}
          alt="picture of stronaut coming down"
          width={450}
          height={450}
        />
      </div>

      {FormHandler()}
    </ModalStyling>
  );
};
