import React from "react";
import styled from "styled-components";

export const SingleQuizViewStyling = styled.div`
  background-color: #9dc5ff;
  padding-top: 2rem;

  .back-btn {
    background-color: transparent;
    border: none;
    display: flex;
    align-items: center;
    margin-left: 10% ;

    .back-icon {
      font-size: 2rem;
      margin-right: 0.5rem;
    }
    h3 {
      font-size: 1.2rem;
    }
  }
  h1{
    margin: 3rem 0 2rem 10%; 
  }
  .game-board {
    display: flex;
    justify-content: space-between;
    width: 80%;
    margin: 3rem auto 0 auto;
    padding: 2rem;

      .quiz-btns {
        display: flex;
        flex-direction: column;
        align-items: center;
        p {
          margin-bottom: 1rem;
        }

        button {
          background-color: transparent;
          border: 2px solid white;
          border-radius: 4px;
          color: #ef9207;
          width: 150px;
          padding: 0.8rem 0.5rem;
          margin: 0.5rem 0;

          &:hover {
            background-color: #ffa6006b;
          }
        }
      }

    .quiz {
      width: 500px;
      height: 300px;
      background-color: #ffffff3b;
      border-radius: 10px;
    }
  }
`;
