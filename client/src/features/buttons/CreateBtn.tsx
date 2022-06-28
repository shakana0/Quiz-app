import React from "react";
import styled from "styled-components";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { Link } from "react-router-dom";

interface CreateButtonProps {
  variant?: "primary" | "secondary";
  isFullWidth?: true | false;
}

const CreateBtnStyling = styled.button`
  /* color: white; */
  font-size: 1.2rem;
  background-color: transparent;
  display: flex;
  align-items: center;
  border: none;

  .down-icon {
    color: white;
    font-size: 2.4rem;
  }
`;

//create knappen har två villkor 1. om use.params är create sidan, om inte redirects
// 2. gör en post på formuläret (form validation måste ha 0 error)
export const CreateBtn = () => {
  return (
    <Link to={"/profile"}>
      <CreateBtnStyling type="button">
        Create
        <KeyboardArrowDownRoundedIcon className="down-icon" />
      </CreateBtnStyling>
    </Link>
  );
};
