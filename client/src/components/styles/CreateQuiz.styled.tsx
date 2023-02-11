import styled from "styled-components";

export const CreateQuizStyling = styled.div`
  background-color: #e8c4f4;

  form {
    display: flex;
    justify-content: ceanter;
    align-items: center;
    flex-direction: column;
    margin: 0 auto;
    padding: 0 2rem;
    width: 70%;

    input {
      background-color: transparent;
      border: none;
      border-bottom: 2px solid white;
      padding: 1rem;
      margin-top: 1rem;

      ::placeholder {
        color: #ffffffb7;
        font-size: 1.1rem;
      }
      &:focus {
        outline: none;
        border-bottom-color: rgba(130, 57, 223, 1);
      }
    }
    .error {
      color: red;
      font-size: 0.8rem;
    }
    .quiz-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;

      div {
        display: flex;
        flex-direction: column;

        width: 100%;
        h1 {
          margin: 2rem 0 6rem 0;
        }
        input {
          width: 80%;
        }
      }
    }
    .card-section {
      width: 100%;
      margin-top: 2rem;
      .show-error{
        margin: 3rem auto;
        padding: 1rem;
        width: 65%;
        display: block;
        border: 3px solid red;
        border-radius: 10px;
        background-color: #ff00003c;
        h4{
          color: red;
          text-align: center;
        }
      }
      .hide-error{
      display: none;
    }
      .quiz-card {
        background-color: #ffffff29;
        border: 2px solid white;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        margin: 2rem 0;
        padding: 0 0 2rem 2rem;
        input:last-child{
        margin-right: 2rem;
        }
        .top {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          input {
            width: 60%;
          }
          div {
            display: flex;
            align-items: center;

            .add-file-btn {
              background-color: transparent;
              border: 2px solid white;
              border-radius: 10px;
              padding: 0 1.5rem;
              height: 45px;
              margin: 1rem 2rem 0 0;
            }
            //fixa ikonen
            .delete-icon {
              align-self: flex-start;
              font-size: 2rem;
              fill: red;
              transition: 0.25s ease;

              &:hover {
                cursor: pointer;
                transform: scale(1.1);
              }
            }
          }
        }
      }
      .add-card-btn {
        background-color: #ffffff29;
        width: 100%;
        padding: 1rem;
        margin: 2rem 0;
        border: 2px solid white;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;

        .add-icon {
          font-size: 2.5rem;
          margin-right: 0.5rem;
        }
        h2 {
          font-size: 1.5rem;
        }
      }
    }

    .create-btn {
      width: 30%;
      align-self: flex-end;
      display: flex;
      justify-content: center;
      font-size: 1.6rem;
      margin: 1rem 0 2rem 0;
    }
  }
`;
