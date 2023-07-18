import styled from "styled-components";
import { LogiInButtonProps } from "../../interface/componentsPropsTypes";

export const AuthBtnStyle = styled.button<LogiInButtonProps>`
  padding: 0.8rem 1.5rem;
  width: ${(props) => (props.isFullWidth === true ? "60%" : "")};
  border-radius: 10px;
  font-size: 1.2rem;
  background: ${(props) =>
    props.variant === "primary"
      ? "linear-gradient(90deg, rgba(239,206,44,1) 34%, rgba(249,67,111,1) 100%)"
      : props.variant === "primary-pink"
      ? "linear-gradient(-90deg, rgba(240,9,64,1) 3%, rgba(229,60,111,1) 22%, rgba(186,140,191,1) 100%)"
      : props.variant === "secondary"
      ? "linear-gradient(90deg, rgba(205,163,209,1) 3%, rgba(130,57,223,1) 100%)"
      : props.variant === "tertiary"
      ? "linear-gradient(90deg, rgba(249,135,210,1) 3%, rgba(130,57,223,1) 100%)"
      : "transparent"};
  border: none;
  box-shadow: ${(props) =>
    props.variant === "secondary-light" ||  props.variant === "secondary-icon"
      ? "none"
      : "-5px 7px 4px 0px rgba(0,0,0,0.25)"};
 

  display: flex;
  align-items: center;

  .down-icon {
    color: white;
    font-size: 2.4rem;
    display: ${(props) =>
      props.variant != "secondary-icon" ? "none" : "block"};
  }
`;
