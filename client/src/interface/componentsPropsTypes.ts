import React from "react"

export interface LogiInButtonProps {
    variant?: "primary" | "secondary" ;
    isFullWidth?: true | false;
    btnText?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  }