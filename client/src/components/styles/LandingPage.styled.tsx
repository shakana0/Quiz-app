import styled from "styled-components";
import SpaceImg from "../../assets/img/space-dessert.jpg";


export const LandingPageStyling = styled.div`
background-color: #cda3d1;

.hero-img {
  background-image: url(${SpaceImg});
  background-position: center;
  background-size: cover;
  height: 90vh;
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;

  .overlay {
    height: 70%;
    width: 80%;
    background-color: #e2aa104f;
    border-radius: 50px;
    margin: auto auto 1rem auto;
    display: flex;
    justify-content: center;
    align-items: center;

    h1 {
      font-size: 3rem;
    }
  }
  button {
    margin: 0 2rem 1rem auto;
  }
}

section {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  article {
    display: flex;
    align-items: center;
    margin: 2rem 0;
    img{
      box-shadow: -10px 10px 4px 0px rgba(0,0,0,0.25);
    }

    :nth-child(2) p{
      margin: 0 1.5rem 0 0;
    }

    p {
      font-size: 1.5rem;
      width: 300px;
      margin-left: 3.5rem;
      line-height: 2.2rem;
    }
  }
}
`;
