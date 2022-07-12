import React from "react";
import { HeaderStyling } from "../../components/styles/Header.styled";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import { Link } from "react-router-dom";
import { AuthBtn } from "../buttons/AuthBtn";
import { Modal } from "../Modal/AuthModal"

import { useDispatch, useSelector } from "react-redux";
import { toggleModalState } from "../Modal/ModalSlice";

export const Header = () => {
  const dispatch = useDispatch();
  const { showModal } = useSelector((state: any) => state.modal);

  const RenderModal = () => {
    if (showModal) {
      return <Modal/>
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
          <Link to={"/profile"}>
            <AuthBtn
              variant="secondary-icon"
              isFullWidth={false}
              btnText="Create"
            />
          </Link>
        </div>
        <div className="btn-container">
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
            variant="primary"
            isFullWidth={false}
            btnText="Sign Up"
            onClick={(event: React.MouseEvent<HTMLElement>) => {
              dispatch(
                toggleModalState({ showModal: true, modalType: "Sign Up" })
              );
            }}
          />
        </div>
      </HeaderStyling>
    </>
  );
};
