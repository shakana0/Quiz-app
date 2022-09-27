import React from "react";
import styled from "styled-components";

export const QuizCardStyling = styled.article`
  border: 2px solid white;
  height: 150px;
  padding: 0 0 2rem 2rem;
  width: 300px;
  border-radius: 10px;
  /* background-color: #efe40f6b; */
  background-color: #2901863d;
  margin: 1rem;
  transition: 0.5s ease;
  cursor: pointer;
  &:hover {
    /* background-color: #f1c22784; */
    background-color: #0303a54c;
  }
  &:hover > .icon-container .delete-icon {
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
      transition: .5s ease;
      &:hover{
        transform: scale(1.1);
      }
    }
  }
  .quiz-card-info {
    margin: 1rem 2rem 0 0;
    text-align: center;
    p {
      padding: 1rem 0;
    }
  }
`;
