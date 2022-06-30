import React from "react";
import { ModalStyling } from "../../components/styles/Modal.styled";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

interface ModalProps {
  closeModal?: any;
}

export const Modal = ({closeModal}: ModalProps) => {
  return (
    <ModalStyling>
      <CloseRoundedIcon className="close-icon" onClick={closeModal}/>
      <img
        src={require("../../assets/img/astronaut-coming-down.PNG")}
        alt=" picture of stronaut coming down"
        width={320}
        height={300}
      />
      <form action="">
        <input type="text" placeholder="Type your username or email address" />
        <input type="text" placeholder="Type your passwodord" />
      </form>
    </ModalStyling>
  );
};
