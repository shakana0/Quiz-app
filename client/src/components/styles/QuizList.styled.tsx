import React from "react";
import styled from "styled-components";

export const QuizListStyling = styled.div`
  margin: 1rem auto 2rem auto;
  padding: 1rem;
  border: 2px solid white;
  height: 400px;
  width: 70%;
  border-radius: 20px;
  background-color: #ffffff21;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  overflow-y: auto;

  .no-quizes-header {
    color: orange;
    -webkit-text-stroke: 1px #c702a9ea;
    font-size: 2.5rem;
  }

  ::-webkit-scrollbar {
    background-color: transparent;
    width: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #55018655;
    border-radius: 10px;
    width: 10px;
  }
`;
