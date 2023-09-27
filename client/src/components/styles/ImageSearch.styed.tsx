import styled from "styled-components";

export const ImageSearchStyling = styled.div`
  padding-top: 2rem;
  img {
    margin: 0 0.3rem;
    cursor: pointer;
    border: 1px solid black;
    transition: 0.2 ease;
    :hover {
      transform: scale(1.05);
    }
   
  }
  .active{
      border: 4px solid red;
    }
  h2 {
    -webkit-text-stroke: 1px #ff0000a3;
    text-align: center;
  }
`;
