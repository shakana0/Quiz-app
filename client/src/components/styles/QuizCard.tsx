import React from "react";
import styled from "styled-components";

export const QuizCardStyling = styled.article`
  border: 2px solid white;
  height: 150px;
  padding: 2rem;
  width: 300px;
  border-radius: 10px;
  background-color: #efe40f6b;
  margin: 1rem;
  /* display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column; */
  transition: .5s ease;
  cursor: pointer;
  &:hover {
    background-color: #f1c22784;
  }

  h2 {
    /* text-align: center; */
  }
  p{
    padding: 1rem 0;
  }
`;
