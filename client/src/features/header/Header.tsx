import React from "react";
import { HeaderStyling } from "../../components/styles/Header.styled";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import { Link } from "react-router-dom";
import { LogInBtn } from "../buttons/LogInBtn";
import { SignUpBtn } from "../buttons/SignUpBtn";
// import { CreateBtn } from "../buttons/CreateBtn";

import { AuthBtn } from "../buttons/AuthBtn";
import { Modal } from "./LoginModal";
import { useState } from "react";

export const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");

  const closeModal = () => {
    setShowModal(!showModal);
  };

  const RenderModal = () => {
    if (showModal) {
      return <Modal closeModal={closeModal} modalType={modalType} />;
    } else {
      return;
    }
  };

  return (
    <>
      {RenderModal()}
      <HeaderStyling>
        <div className="icons-container">
          <Link to={"/"}>
            <HomeOutlinedIcon className="home-icon" />
          </Link>
          <Link to={"/profile"}>
            <AccountCircleOutlinedIcon className="profile-icon" />
          </Link>
          <TextsmsOutlinedIcon className="chat-icon" />
          {/* <CreateBtn /> */}
          <Link to={"/profile"}>
          <AuthBtn
             variant="secondary-icon"
             isFullWidth={false}
             btnText="Create"
          />

            </Link>
        
        </div>
        <div className="btn-container">
          {/* <LogInBtn
            variant="primary"
            isFullWidth={false}
            btnText="Log In"
            onClick={(event: React.MouseEvent<HTMLElement>) => {
              setModalType("Log In")
              setShowModal(!showModal);
            }}
          />
          <SignUpBtn
            variant="primary"
            isFullWidth={false}
            btnText="Sign Up"
            onClick={(event: React.MouseEvent<HTMLElement>) => {
              setModalType("Sign Up")
              setShowModal(!showModal);
            }}
          /> */}
          <AuthBtn
             variant="secondary-light"
             isFullWidth={false}
             btnText="Log In"
             onClick={(event: React.MouseEvent<HTMLElement>) => {
               setModalType("Log In")
               setShowModal(!showModal);
             }}
          />

          <AuthBtn
            variant="primary"
            isFullWidth={false}
            btnText="Sign Up"
            onClick={(event: React.MouseEvent<HTMLElement>) => {
              setModalType("Sign Up");
              setShowModal(!showModal);
            }}
          />
        </div>
      </HeaderStyling>
    </>
  );
};
