import React from "react";
import styled from "styled-components";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { AuthBtnStyle } from "../../components/styles/AuthBtn.styled";
import { Link } from "react-router-dom";

// interface CreateButtonProps {
//   variant?: "primary" | "secondary";
//   isFullWidth?: true | false;
// }

// const CreateBtnStyling = styled.button`
//   /* color: white; */
//   font-size: 1.2rem;
//   background-color: transparent;
//   display: flex;
//   align-items: center;
//   border: none;

//   .down-icon {
//     color: white;
//     font-size: 2.4rem;
//   }
// `;

//create knappen har två villkor 1. om use.params är create sidan, om inte redirects
// 2. gör en post på formuläret (form validation måste ha 0 error)

// import { LogiInButtonProps } from "../../interface/componentsPropsTypes";

// export const CreateBtn = ({
//   variant,
//   btnText,
//   isFullWidth,
// }: LogiInButtonProps) => {
//   return (
//     <AuthBtnStyle type="button" isFullWidth={isFullWidth} variant={variant}>
//       {btnText}
//       <KeyboardArrowDownRoundedIcon className="down-icon" />
//     </AuthBtnStyle>
//   );
// };
