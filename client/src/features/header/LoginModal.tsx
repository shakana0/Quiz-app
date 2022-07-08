import React, { useState } from "react";
import { ModalStyling } from "../../components/styles/Modal.styled";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import { AuthBtn } from "../buttons/AuthBtn";
import { useDispatch, useSelector } from "react-redux";
import { toggleModalState } from "./HeaderSlice";

export const Modal = () => {
  const dispatch = useDispatch();
  const { modalType } = useSelector((state: any) => state.modal);

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
        <form
          action=""
          onClick={(event) => {
            event.preventDefault();
          }}
        >
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
