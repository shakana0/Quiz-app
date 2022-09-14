import React from "react";
import { HeaderStyling } from "../../components/styles/Header.styled";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import { Link } from "react-router-dom";
import { AuthBtn } from "../buttons/AuthBtn";
import { Modal } from "../Modal/AuthModal";
import { useDispatch, useSelector } from "react-redux";
import { toggleModalState, setActiveForm } from "../Modal/ModalSlice";

export const Header = () => {
  const dispatch = useDispatch();
  const { showModal } = useSelector((state: any) => state.modal);
  const { logInSuccess } = useSelector((state: any) => state.auth);

  const RenderModal = () => {
    if (showModal) {
      return <Modal />;
    } else {
      return;
    }
  };
  const SignUp = () =>{
      dispatch(
       toggleModalState({ showModal: true, modalType: "Sign Up" })
     );
     dispatch(setActiveForm({ logIn: false, signUp: true }));
  }

  const renderAuthBtns = () => {
    if (!logInSuccess) {
      return (
        <div className="btn-container">
          <AuthBtn
            variant="secondary-light"
            isFullWidth={false}
            btnText="Log In"
            onClick={(event: React.MouseEvent<HTMLElement>) => {
              dispatch(
                toggleModalState({ showModal: true, modalType: "Log In" })
              );
              dispatch(setActiveForm({ logIn: true, signUp: false }));
            }}
          />
          <AuthBtn
            variant="primary"
            isFullWidth={false}
            btnText="Sign Up"
            onClick={SignUp}
          />
        </div>
      );
    } else {
      return;
    }
  };

  const RenderIcons = () => {
    if (logInSuccess) {
      return (
        <>
          <Link to={"/profile"}>
            <AccountCircleOutlinedIcon className="profile-icon" />
          </Link>
          <TextsmsOutlinedIcon className="chat-icon" />
          <Link to={"/create-quiz"}>
            <AuthBtn
              variant="secondary-icon"
              isFullWidth={false}
              btnText="Create"
            />
          </Link>
        </>
      );
    } else {
      return (
        <>
          <AccountCircleOutlinedIcon className="profile-icon" onClick={SignUp} />
          <TextsmsOutlinedIcon className="chat-icon" onClick={SignUp}/>
          <AuthBtn
            variant="secondary-icon"
            isFullWidth={false}
            btnText="Create"
            onClick={SignUp}
          />
        </>
      );
    }
  };

  return (
    <>
      {RenderModal()}
      <HeaderStyling>
        <div className="icons-container">
          <Link to={"/home"}>
            <HomeOutlinedIcon className="home-icon" />
          </Link>
          {RenderIcons()}
        </div>
        {renderAuthBtns()}
      </HeaderStyling>
    </>
  );
};
