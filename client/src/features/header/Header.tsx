//mountar login knapparna, när knapparna rendreras bestämms m hjälp av en funktion

import React from "react";
import { HeaderStyling } from "../../components/styles/Header.styled"
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import { Link } from "react-router-dom";
import { LogInBtn } from "../buttons/LogInBtn";
import { SignUpBtn } from "../buttons/SignUpBtn";
import { CreateBtn } from "../buttons/CreateBtn";

export const Header = () => {
  return (
    <HeaderStyling>
      <div className="icons-container">
        <Link to={'/'}>
        <HomeOutlinedIcon className="home-icon" />
        </Link>
        <Link to={'/profile'}>
        <AccountCircleOutlinedIcon className="profile-icon" />
        </Link>
        <TextsmsOutlinedIcon className="chat-icon" />
        <CreateBtn />
      </div>

      <div className="btn-container">
        <LogInBtn variant="primary" isFullWidth={false} btnText="Log In"/>
        <SignUpBtn variant="primary" isFullWidth={false} btnText="Sign Up"/>
      </div>
    </HeaderStyling>
  );
};
