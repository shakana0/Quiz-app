import React from "react";
import styled from "styled-components";
import { LogiInButtonProps } from "./SignUpBtn.styled";

export const LogInBtnStyling = styled.button<LogiInButtonProps>`
  padding: ${(props) =>
    props.isFullWidth === true ? ".8rem 5rem" : ".8rem 1.5rem"};
  border-radius: 10px;
  font-size: 1.2rem;
  background: ${(props) =>
    props.variant === "primary"
      ? "transparent"
      : "linear-gradient(90deg, rgba(205,163,209,1) 3%, rgba(130,57,223,1) 100%);"};
  border: none;
`;
