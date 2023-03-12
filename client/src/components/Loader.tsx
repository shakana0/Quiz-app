import styled from "styled-components";

const LoaderStyling = styled.div`
  /* width: 100vw;
  height: 100vh;
  background-color: #b885e57e;
  position: absolute; */

  /* .loader {
    border: 16px solid #f3f3f3; 
    border-top: 16px solid #3498db; 
    border-radius: 50%;
    width: 120px;
    height: 120px;
    animation: spin 2s linear infinite;
    position: fixed;
    top: 50%;
    left: 50%;
  } */
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid #851ebd; /* Blue */
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
  position: absolute;
  top: 35%;
  left: 45%;

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
    // <LoaderStyling>
    //   <div className="loader"></div>
    // </LoaderStyling>
    <LoaderStyling />
  );
};
