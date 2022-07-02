import React from "react";
import { LogInBtnStyling } from "../../components/styles/LogInBtn.styled";
import { LogiInButtonProps } from "../../interface/componentsPropsTypes";

export const LogInBtn = ({
  variant,
  btnText,
  isFullWidth,
  onClick,
}: LogiInButtonProps) => {
  return (
    <LogInBtnStyling
      type="button"
      isFullWidth={isFullWidth}
      variant={variant}
      onClick={onClick}
    >
      {btnText}
    </LogInBtnStyling>
  );
};
