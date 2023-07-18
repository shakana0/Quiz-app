import styled from "styled-components";

export const HeaderStyling = styled.header`
  padding: 0.5rem 2rem;
  background-color: #342882;
  display: flex;
  justify-content: space-between;

  .icons-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 25%;

    .home-icon,
    .profile-icon,
    .chat-icon {
      color: white;
      font-size: 2rem;
      cursor: pointer;
      transition: .25s ease;

      &:hover {
        transform: scale(1.1);
      }
    }
  }
  .btn-container {
    display: flex;
    justify-content: space-between;
    width: 25%;
  }
  button {
    height: 50px;
  }
`;
