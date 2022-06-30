import React from "react";
import styled from "styled-components";
import { LogiInButtonProps } from "../../interface/componentsPropsTypes"


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
  /* box-shadow: -10px 10px 4px 0px rgba(0,0,0,0.25); */
  box-shadow: ${(props) =>
    props.variant === "primary"
      ? "none"
      : "-10px 10px 4px 0px rgba(0,0,0,0.25)"};
  cursor: pointer;
`;
