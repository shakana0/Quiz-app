import styled from "styled-components";
import { Modal } from "@mui/material";

export const DialogStyles = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;

  .box {
    background-color: #532595;
    width: 500px;
    height: 300px;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    align-items: center;

    .close-icon{
        cursor: pointer;
        align-self: flex-end;
        font-size: 2rem;
    }
.info-container{
    height: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 3rem;

    .btn-container{
        display: flex;
        justify-content: space-evenly;
        button{
            width: 25%;
        }
    }
}
    
  }
`;
