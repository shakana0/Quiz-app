import React from "react";
import styled from "styled-components";
import { LogiInButtonProps } from "../../interface/componentsPropsTypes";

export const LogInBtnStyling = styled.button<LogiInButtonProps>`
  padding: 0.8rem 1.5rem;
  width: ${(props) => (props.isFullWidth === true ? "60%" : "")};
  border-radius: 10px;
  font-size: 1.2rem;

  border: none;
  box-shadow: ${(props) =>
    props.variant === "primary"
      ? "none"
      : "-10px 10px 4px 0px rgba(0,0,0,0.25)"};
      /* text-decoration: ${(props) => props.isActive === true ? "underline" : "none"};
      text-decoration-color: #f5a104;
      text-decoration-thickness: 10px; */

  /* cursor: pointer; */
`;

  /* background: ${(props) =>
    props.variant === "primary"
      ? "transparent"
      : props.variant === "knappJävel"
      ? "green"
      : props.variant === "bajsKnapp"
      ? "orange"
      : "linear-gradient(90deg, rgba(205,163,209,1) 3%, rgba(130,57,223,1) 100%);"}; */
