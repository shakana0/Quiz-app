import React from "react";
import styled from "styled-components";

export const ProfileViewStyling = styled.div`
  background-color: #d4acfc;
  display: flex;
  flex-direction: column;
  .profile {
    display: flex;
    flex-direction: column;
    .log-out-btn {
      width: 100px;
      height: 45px;
      color: red;
      border: 3px solid red;
      border-radius: 10px;
      background-color: transparent;
      align-self: flex-end;
      margin: 2rem 2rem 0 0;

      &:hover {
        background-color: #ff000038;
      }
    }

    .profile-info {
      display: flex;
      justify-content: center;
      div {
        display: flex;
        align-items: center;
        width: 40%;
        .circle,
        h1 {
          font-size: 1.7rem;
          margin-bottom: 25%;
        }
        .circle {
          width: 60px;
          height: 60px;
          border: 3px solid white;
          border-radius: 50%;
          margin-right: 1.5rem;
        }
      }
    }
  }
  .create-btn {
    width: 20%;
    align-self: flex-end;
    display: flex;
    justify-content: center;
    font-size: 1.6rem;
    margin: 3rem 10% 2rem 0;
  }
  .nav-btn{
    width: 100px;
  }
`;
