import React from "react";
import styled from "styled-components";

export const QuizListStyling = styled.div`
  margin: 0 auto;
  padding: 1rem;
  border: 2px solid white;
  height: 400px;
  width: 70%;
  border-radius: 20px;
  background-color: #ffffff21;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  overflow-y: auto;

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
