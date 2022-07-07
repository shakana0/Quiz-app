import React, { useState } from "react";
import { ModalStyling } from "../../components/styles/Modal.styled";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import { AuthBtn } from "../buttons/AuthBtn";

import { LogInBtn } from "../buttons/LogInBtn";
// import { SignUpBtn } from "../buttons/SignUpBtn";
import { NavLink } from "react-router-dom";

interface ModalProps {
  closeModal?: any;
  modalType?: string;
}

export const Modal = ({ closeModal, modalType }: ModalProps) => {
  const [newModalType, setNewModalType] = useState("");
  // const [toggleIsActive, setToffleIsActive] = useState(false);

  const RenderModalToggleBtns = () => {
    //react toggle active class width multiple elements
    return (
      <div>

        <AuthBtn
         variant="secondary-light"
         isFullWidth={false}
         btnText="Log In"
         onClick={(event: React.MouseEvent<HTMLElement>) => {
           setNewModalType("Log In");
           FormHandler();
         }}
        />
           <AuthBtn
         variant="secondary-light"
         isFullWidth={false}
         btnText="Sign Up"
         onClick={(event: React.MouseEvent<HTMLElement>) => {
           setNewModalType("Sign Up");
           FormHandler();
         }}
        />
            {/* <LogInBtn
            variant="primary"
            isFullWidth={true}
            btnText="Log In"
            onClick={(event: React.MouseEvent<HTMLElement>) => {
              setNewModalType("Log In");
              FormHandler();
            }}
          />

        <LogInBtn
          variant="primary"
          isFullWidth={true}
          btnText="Sign Up"
          onClick={(event: React.MouseEvent<HTMLElement>) => {
            setNewModalType("Sign Up");
            FormHandler();
          }}
        /> */}
      </div>
    );
  };

  const FormHandler = () => {
    if (newModalType != "") {
      modalType = newModalType;
    }

    if (modalType === "Sign Up") {
      return (
        <form
          action=""
          onClick={(event) => {
            event.preventDefault();
          }}
        >
          <div className="close-icon-container">
            <CloseRoundedIcon className="close-icon" onClick={closeModal} />
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
          <input type="text" placeholder="email address..." />
          <input type="text" placeholder="username..." />
          <input type="password" placeholder="password..." />
          <AuthBtn variant="secondary" isFullWidth={true} btnText="Sign Up" />
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
            <CloseRoundedIcon className="close-icon" onClick={closeModal} />
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
      {/* <LogInBtn variant="knappJävel" isFullWidth={true} btnText="Log In" />
      <LogInBtn variant="bajsKnapp" isFullWidth={true} btnText="Log In" /> */}

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
