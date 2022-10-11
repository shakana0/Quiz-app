import React from "react";
import styled from "styled-components";

export const ModalStyling = styled.article`
  width: 100vw;
  height: 100vh;
  background-color: #e9c2f8;
  /* background-color: #d4acfc; */
  display: flex;
  justify-content: center;
  position: fixed;

  .pic-container {
    margin-top: 0;
  }

  form {
    width: 50%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
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

    .close-icon-container {
      align-self: flex-end;
      display: flex;

      .close-icon {
        font-size: 2.5rem;
        margin: 1.5rem 3rem 0 0;
        cursor: pointer;

        &:hover {
          fill: red;
        }
      }
    }

    .btn-container {
      width: 100%;
      display: flex;
      align-items: center;
      flex-direction: column;
      .isActive {
        text-decoration: underline;
        text-decoration-color: orange;
        text-decoration-thickness: 3px;
        color: #7f0186a8;
      }
      .is-not-active {
      }

      button:nth-child(2) {
        margin-left: 1.5rem;
      }

      div {
        display: flex;
        align-items: center;
        justify-content: flex-center;
        width: 60%;
        margin-bottom: 1rem;

        button {
          border: none;
          margin: 0;
          font-size: 1.6rem;

          &:hover {
            text-decoration: underline;
          }
        }
      }

      .sign-up-btn-container {
        display: flex;
        flex-direction: column;
        button:nth-child(2) {
          margin-left: 1.5rem;
        }
        div {
          display: flex;
          width: 100%;
        }

        button {
          box-sizing: border-box;
          border: 2px solid white;
          p {
            font-size: 0.7rem;
            margin-left: 0.5rem;
          }
        }
        .or-email {
          margin-top: 1.5rem;
          span {
            padding: 0.1rem;
            width: 45%;
            background-color: white;
          }
          p {
            width: 20%;
            padding: 0 0 0 0.15rem;
          }
        }
      }
      button {
        border: 2px solid green;
        width: 60%;
        padding: 0.5rem 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: transparent;
        border: 3px solid white;
        margin: 1rem;
        .google-icon,
        .facebook-icon {
          font-size: 2rem;
          margin-left: 0.5rem;
        }
        p {
          color: purple;
          font-size: 1.3rem;
          width: 80%;
        }
      }
    }
    .input-box {
      border: none;
      border-bottom: 3px solid white;
      display: flex;
      align-items: center;
      width: 60%;
      margin-top: 1rem;

      input {
        width: 80%;
        font-size: 1.2rem;
        border: none;
        background-color: transparent;
        padding: 1rem 0;

        ::placeholder {
          color: white;
          font-size: 1rem;
        }

        &:focus {
          outline: none;
        }
      }
      .check-icon {
        width: 20%;
        fill: #008000b6;
        font-size: 1.8rem;
        display: block;
      }
      .hide {
        display: none;
      }
    }
  }
  .error {
    color: red;
    width: 60%;
    font-size: 0.8rem;
  }
  button:last-child {
    margin: 2.5rem 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
