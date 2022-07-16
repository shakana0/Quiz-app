import styled from "styled-components";
import StarsInSky from "../../assets/img/stars-in-the-sky.jpg";

export const HomeStyling = styled.div`
  /* margin: 0 6rem 0 8rem; */
  background-color: #d4acfc;

  .hero-img {
    background-image: url(${StarsInSky});
    background-position: center;
    background-size: cover;
    height: 75vh;
    /* width: 100vw; */
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;

    .overlay {
      height: 80%;
      width: 80%;
      background-color: #ffffff48;
      border-radius: 50px;
      /* margin: auto auto 1rem auto; */
      margin: auto;
      display: flex;
      justify-content: center;
      align-items: center;

      h1 {
        font-size: 5rem;
        -webkit-text-stroke-width: 0.3px;
        -webkit-text-stroke-color: black;
      }
    }
    img {
      position: absolute;
      left: 70%;
      top: 40%;
    }
  }

  section {
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    h1 {
      font-size: 2rem;
      align-self: flex-start;
      margin: 0 0 2rem 9rem;
    }
    .box {
      border: 2px solid white;
      height: 400px;
      width: 80%;
      border-radius: 30px;
      background-color: #ffffff21;
    }
  }
`;
