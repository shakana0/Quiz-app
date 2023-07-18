import styled from "styled-components";

export const QuizCardStyling = styled.article`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
  height: 150px;
  padding: 1rem;
  width: 300px;
  border-radius: 10px;
  background-color: #2901863d;
  margin: 1rem;
  transition: 0.5s ease;
  cursor: pointer;
  &:hover {
    background-color: #0303a54c;
  }
  /* &:hover > .icon-container .delete-icon {
    opacity: 1;
  }
  .icon-container {
    display: flex;
    justify-content: flex-end;
    box-sizing: border-box;
    .delete-icon {
      font-size: 2rem;
      fill: red;
      opacity: 0;
      transition: 0.5s ease;
      &:hover {
        transform: scale(1.3);
      }
    }
  } */
  .quiz-card-info {
    text-align: center;
    p {
      padding: 1rem 0;
    }
  }
`;
