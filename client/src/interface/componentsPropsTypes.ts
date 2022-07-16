import React from "react"

export interface LogiInButtonProps {
    variant?: "primary" | "primary-pink" | "secondary" | "secondary-light" | "secondary-icon" | "tertiary"
    isFullWidth?: true | false;
    isActive?: true | false;
    btnText?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
    className?: any & React.HTMLAttributes<HTMLButtonElement> | undefined;
  }
