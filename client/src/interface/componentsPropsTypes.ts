import React from "react"

export interface LogiInButtonProps {
    variant?: "primary" | "secondary" | "knappJävel" | "bajsKnapp";
    isFullWidth?: true | false;
    btnText?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  }

  