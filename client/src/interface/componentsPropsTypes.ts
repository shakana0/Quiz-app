import React from "react"

export interface LogiInButtonProps {
    variant?: "primary" | "primary-pink" | "secondary" | "secondary-light" | "secondary-icon";
    isFullWidth?: true | false;
    isActive?: true | false;
    btnText?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  }

  /*
  background-colors:
  transparent
  orange
  purple-white
  pink-red

  --
width:
small 
big
  */