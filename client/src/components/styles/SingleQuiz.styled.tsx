import styled from "styled-components";

export const SingleQuizViewStyling = styled.div`
  /* background-color: #9dc5ff; */
  /* background-color: #aea8f7; */
  background-color: #96adde;

  padding-top: 2rem;

  .top {
    display: flex;
    justify-content: space-between;
    padding: 0 4rem;
    .back-btn {
      background-color: transparent;
      border: none;
      display: flex;
      align-items: center;
      .back-icon {
        font-size: 2.2rem;
        margin-right: 0.5rem;
      }
      h3 {
        font-size: 1.6rem;
      }
    }
    .delete-icon {
      font-size: 2rem;
      fill: red;
      transition: 0.5s ease;
      cursor: pointer;
      &:hover {
        transform: scale(1.3);
      }
    }
  }

  h1 {
    margin: 3rem 0 2rem 10%;
  }
  .description {
    font-size: 1.5rem;
    color: orange;
    -webkit-text-stroke: 1px #835604;
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
        color: orange;
        -webkit-text-stroke: 1px #835604;
        width: 150px;
        padding: 0.8rem 0.5rem;
        margin: 1rem 0;
        font-size: 1.1rem;

        &:hover {
          background-color: #ffa6006b;
        }
      }
    }

    /* FlashCards */
    .quiz-container {
      display: flex;
      flex-direction: column;
      width: 70%;
      min-height: 400px;
      .card-container {
        width: 100%;
        cursor: pointer;
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
        border: 4px solid #cb8501da;
      }
      .back {
        background-color: #82a8e1;
        border: 4px solid #7486ac;
        text-align: center;
      }

      .pagination-btns {
        display: flex;
        justify-content: center;
        width: 40%;
        margin: 1rem auto;

        button {
          margin: 0 1rem;
          padding: 0.5rem 1.8rem;
          background-color: orange;
          border-radius: 5px;
          border: none;

          &:hover {
            background-color: #db9108c9;
          }
        }
      }
    }

    .compleeted,
    .wrong {
      width: 100%;
      /* height: 300px; */
      height: 100%;
      background-color: #47c74785;
      border: 4px solid #71a971;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-radius: 20px;
      box-sizing: border-box;

      .emoji {
        font-size: 5rem;
      }
      h1{
        margin: 2rem 0;
        font-size: 2rem;
      }
    }
    .wrong {
      background-color: #ff0000c1;
      button {
        padding: 0.8rem 2rem;
        border: 3px solid #71a971;
        border-radius: 10px;
        background-color: #319631;
        font-size: 0.8rem;
        margin-top: 2rem;
      }
    }

    /* Write */
    .write-container {
      width: 70%;
      min-height: 400px;
      border: 4px solid #7a70b7;
      border-radius: 20px;
      background-color: #342882;
      .wrapper {
        box-sizing: border-box;
        width: 100%;
        height: 90%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        padding: 1rem;
      }
      .points {
        align-self: flex-end;
        margin: 0 1rem 1rem 0;
        font-size: 1.5rem;
      }
      section {
        width: 95%;
        border-bottom: 3px solid white;
        padding-bottom: 1rem;
        p {
          font-size: 1.2rem;
          line-height: 32px;
        }
      }
      div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 95%;
        height: 50%;
        input {
          padding: 0.3rem 1rem;
          width: 70%;
          height: 50%;
          align-self: flex-end;
          background-color: transparent;
          font-size: 1.5rem;
          border: none;
          border-bottom: 3px solid white;
          &:focus {
            outline: none;
          }
        }
        button {
          padding: 0.5rem 1.5rem;
          border: 3px solid #71a971;
          border-radius: 10px;
          align-self: flex-end;
          background-color: #319631;
          font-size: 1.2rem;
        }
      }
    }

    /* Match */
    .match-container {
      width: 70%;
      height: 400px;
      border: 4px solid #675f9a;
      border-radius: 20px;
      background-color: #7a6cd6;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .definition {
        width: 100%;
        height: 35%;
        padding: 1rem 2rem;
        box-sizing: border-box;
        p {
          line-height: 32px;
        }
      }
      .alternatives {
        padding-bottom: 0.5rem;

        p {
          padding-left: 2rem;
        }
        .btns-wrapper {
          display: flex;
          flex-wrap: wrap;
          padding: 0 1rem;
          button {
            padding: 0.8rem 0;
            background-color: transparent;
            border: 2px solid orange;
            color: orange;
            border-radius: 10px;
            margin: 1rem;
            width: 45%;
            font-size: 1.1rem;
            &:hover {
              background-color: #eba74260;
            }
          }
        }
      }
    }
  }
`;
