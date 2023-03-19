import styled from "styled-components";

const LoaderStyling = styled.div`
  min-width: 100%;
  height: 100%;
  background-color: #b885e589;
  position: fixed;
  padding-left: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;

  .loader {
    border: 12px solid #f3f3f3;
    border-top: 12px solid #9d41ce;
    border-radius: 50%;
    width: 90px;
    height: 90px;
    animation: spin 2s linear infinite;
  }
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const Loader = () => {
  return (
    <LoaderStyling>
      <div className="loader"></div>
    </LoaderStyling>
  );
};
