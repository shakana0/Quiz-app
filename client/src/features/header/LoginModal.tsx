import React, { useState } from "react";
import { ModalStyling } from "../../components/styles/Modal.styled";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import { AuthBtn } from "../buttons/AuthBtn";
import { useDispatch, useSelector } from "react-redux";
import { toggleModalState } from "./HeaderSlice";
import { credentialsType } from "../../interface/userType";
//https://hevodata.com/learn/mongodb-join-two-collections/#l2
//https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation
//https://dev.to/andyrewlee/cheat-sheet-for-updating-objects-and-arrays-in-react-state-48np

export const Modal = () => {
  const [credentials, setCredentials] = useState({
    emailAdress: "",
    userName: "",
    password: "",
  });
  const [errors, setErrors] = useState({
      emailAdress: "",
      userName: "",
      password: "",
    });
  const dispatch = useDispatch();
  const { modalType } = useSelector((state: any) => state.modal);

  // let newError = {
  //   emailAdress: "",
  //   userName: "",
  //   password: "",
  // };
  const handleSubmit = (event: any) => {
    // event.preventDefault();
    // let newErr = Object.assign({}, errors)
    let newErr = {
      emailAdress: "",
      userName: "",
      password: "",
    };

    if (credentials.emailAdress === "") {
      // newError.emailAdress = "Email adress is required (You can't leave this field blank)."
      console.log("email är tom");
      // setErrors((prev) => ({...prev.errors, emailAdress: "email är tom"}))
      newErr.emailAdress = "email är tom";
    }
    if (credentials.userName === "") {
      // newError.userName = "Username is required (You can't leave this field blank)."
      console.log("user name är tom");
      // setErrors((prev) => ({...errors, userName: prev + "user name är tom"}))
      newErr.userName = "user name är tom";
    }
    if (credentials.password === "") {
      // newError.password = "Password is required (You can't leave this field blank)."
      console.log("password är tom");
      newErr.password = "password är tom";
    }
    setErrors(newErr);
    console.log(errors);
  };
  // console.log(errors);

  const RenderModalToggleBtns = () => {
    return (
      <div>
        <AuthBtn
          variant="secondary-light"
          isFullWidth={false}
          btnText="Log In"
          onClick={(event: React.MouseEvent<HTMLElement>) => {
            dispatch(
              toggleModalState({ showModal: true, modalType: "Log In" })
            );
          }}
        />
        <AuthBtn
          variant="secondary-light"
          isFullWidth={false}
          btnText="Sign Up"
          onClick={(event: React.MouseEvent<HTMLElement>) => {
            dispatch(
              toggleModalState({ showModal: true, modalType: "Sign Up" })
            );
          }}
        />
      </div>
    );
  };

  const FormHandler = () => {
    if (modalType === "Sign Up") {
      return (
        <form action="">
          <div className="close-icon-container">
            <CloseRoundedIcon
              className="close-icon"
              onClick={() =>
                dispatch(toggleModalState({ showModal: false, modalType: "" }))
              }
            />
          </div>
          <div className="btn-container">
            {RenderModalToggleBtns()}

            <div className="sign-up-btn-container">
              <div>
                <button>
                  <GoogleIcon className="google-icon" />
                  <p>Log In With Google</p>
                </button>
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
          <p className="error">{errors && errors.emailAdress}</p>

          <input
            type="text"
            placeholder="username..."
            onChange={(event) =>
              setCredentials({ ...credentials, userName: event?.target.value })
            }
          />
          <p className="error">{errors.userName}</p>
          <input
            type="password"
            placeholder="password..."
            onChange={(event) =>
              setCredentials({ ...credentials, password: event?.target.value })
            }
          />
          <p className="error">{errors.password}</p>

          <AuthBtn
            variant="secondary"
            isFullWidth={true}
            btnText="Sign Up"
            onClick={handleSubmit}
          />
        </form>
      );
    }
    if (modalType === "Log In") {
      return (
        <form
          action=""
          onClick={(event) => {
            event.preventDefault();
          }}
        >
          <div className="close-icon-container">
            <CloseRoundedIcon
              className="close-icon"
              onClick={() => dispatch(toggleModalState(false))}
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
          <input
            type="text"
            placeholder="Type your username or email address"
          />
          <input type="password" placeholder="Type your password" />
          <AuthBtn variant="secondary" isFullWidth={true} btnText="Log In" />
        </form>
      );
    }
  };

  return (
    <ModalStyling>
      <div className="pic-container">
        <img
          src={require("../../assets/img/astronaut-coming-down.PNG")}
          alt=" picture of stronaut coming down"
          width={450}
          height={450}
        />
      </div>

      {FormHandler()}
    </ModalStyling>
  );
};
