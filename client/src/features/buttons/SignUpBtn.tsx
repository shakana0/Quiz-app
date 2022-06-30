import React from "react";
import { SignUpBtnStyling } from "../../components/styles/SignUpBtn.styled";
import { LogiInButtonProps } from "../../interface/componentsPropsTypes"



export const SignUpBtn = ({ variant, btnText, isFullWidth }: LogiInButtonProps) => {

  const testingProp = () =>{
    if(btnText === "Sign Up"){
      console.log('min prop text är: ' , btnText)
    }
    if(btnText === "Get Started"){
      console.log('här är min prop text är: ' , btnText)
    }
  }
  // testingProp()
  return (
    <SignUpBtnStyling type="button" isFullWidth={isFullWidth} variant={variant}>
      {btnText}
    </SignUpBtnStyling>
  );
};
