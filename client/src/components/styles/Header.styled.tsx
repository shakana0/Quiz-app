import React from "react";
import styled from "styled-components";

export const HeaderStyling = styled.header`
  padding: .5rem 2rem;
  background-color: #342882;
  display: flex;
  justify-content: space-between;

  .home-icon,
  .profile-icon,
  .chat-icon {
    color: white;
    font-size: 2rem;
  }
  .icons-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 25%;
  }
  .btn-container {
    display: flex;
    justify-content: space-between;
    width: 25%;
  }
  button{
      height: 50px;

  }
`;