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
    margin-left: 10%;

    .back-icon {
      font-size: 2rem;
      margin-right: 0.5rem;
    }
    h3 {
      font-size: 1.2rem;
    }
  }
  h1 {
    margin: 3rem 0 2rem 10%;
  }
  .description {
    font-size: 1.5rem;
    color: orange;
    margin: 1rem 0 0 10%;
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
    .quiz-cintainer {
      display: flex;
      flex-direction: column;
      width: 70%;

      .card-container {
        width: 100%;
      }
      .front,
      .back {
        width: 100%;
        height: 300px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 20px;

        p {
          width: 70%;
          line-height: 32px;
        }
      }
      .front {
        background-color: #ffa600cb;
      }
      .back {
        background-color: #82a8e1;
      }

      .pagination-btns {
        display: flex;
        justify-content: center;
        width: 40%;
        margin: 1rem auto;

        button {
          margin: 0 1rem;
          padding: .5rem 1.8rem;
          background-color: orange;
          border: none;
        }
      }
      .compleeted{
        width: 100%;
        height: 300px;
        background-color: #47c74785;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-radius: 20px;
        
        .emoji-icon{
          fill: white;
          font-size: 5rem;
          margin-bottom: 2rem;
        }
      }
    }
  }
`;
