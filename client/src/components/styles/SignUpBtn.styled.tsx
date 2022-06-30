import React from "react";
import styled from "styled-components";
import { LogiInButtonProps } from "../../interface/componentsPropsTypes"

//2 variationer: " primary secondary " skillnad i styling: strl, color, text
//4 variationer (två var), gul-stor och liten, rosa -stor och liten

export const SignUpBtnStyling = styled.button<LogiInButtonProps>`
  /* padding: 0.8rem 8rem; */
  padding: ${(props) => props.isFullWidth === true ? ".8rem 5rem" : ".8rem 2rem"};
  background: ${(props) =>
    props.variant === "primary"
      ? "linear-gradient(90deg, rgba(239,206,44,1) 34%, rgba(249,67,111,1) 100%)"
      : "linear-gradient(-90deg, rgba(240,9,64,1) 3%, rgba(229,60,111,1) 22%, rgba(186,140,191,1) 100%)"};
  border-radius: 10px;
  font-size: 1.2rem;
  border: none;
  box-shadow: -10px 10px 4px 0px rgba(0,0,0,0.25);
  cursor: pointer;
`;