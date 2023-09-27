import styled from "styled-components";

export const ImageUploadStyling = styled.div`
  padding-top: 2rem;
  .error-text {
    color: red;
    margin-top: 2rem;
    font-size: 0.8rem;
  }
  section {
    display: flex;
    align-items: flex-end;
    .add-file-btn {
      background-color: transparent;
      border: 2px solid white;
      border-radius: 10px;
      padding: 0 1rem;
      height: 45px;
      margin: 1rem 1rem 0 0;
      display: flex;
      align-items: center;
    }
    .add-file-input {
      border-bottom: none;
      padding: 1rem 1rem 0 0;
    }
  }
  .done-icon {
    display: block;
    font-size: 2rem;
    fill: green;
    position: relative;
    animation: slideUpIcon 1s 1;
  }
  .hide-icon{
    display: none;
  }

  @keyframes slideUpIcon {
    from {
      height: 0;
    }
    to {
      height: 3rem;
    }
  }
`;
