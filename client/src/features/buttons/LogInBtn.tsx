import React from "react";
import { LogInBtnStyling } from "../../components/styles/LogInBtn.styled";
import { LogiInButtonProps } from "../../components/styles/SignUpBtn.styled";

export const LogInBtn = ({
  variant,
  btnText,
  isFullWidth,
}: LogiInButtonProps) => {
  return (
    <LogInBtnStyling type="button" isFullWidth={isFullWidth} variant={variant}>
      {btnText}
    </LogInBtnStyling>
  );
};
