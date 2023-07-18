import { AuthBtnStyle } from "../../components/styles/AuthBtn.styled"
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { LogiInButtonProps } from "../../interface/componentsPropsTypes";

export const AuthBtn = ({
  variant,
  btnText,
  isFullWidth,
  onClick,
  className
}: LogiInButtonProps) => {
  return (
    <AuthBtnStyle
      type="button"
      isFullWidth={isFullWidth}
      variant={variant}
      onClick={onClick}
      className={className}
    >
      {btnText}
   <KeyboardArrowDownRoundedIcon className="down-icon" />

    </AuthBtnStyle>
  );
};
