import React from "react";
import { AuthBtn } from "../buttons/AuthBtn";
import { LandingPageStyling } from "../../components/styles/LandingPage.styled";
import { useDispatch } from "react-redux";
import { toggleModalState } from "../header/HeaderSlice";

export const LandingPage = () => {
  const dispatch = useDispatch();

  return (
    <LandingPageStyling>
      <div className="hero-img">
        <div className="overlay">
          <h1>HAVE FUN LEARNING</h1>
        </div>
        <AuthBtn
          variant="primary-pink"
          isFullWidth={false}
          btnText="Get Started"
          onClick={() =>
            dispatch(toggleModalState({ showModal: true, modalType: "Sign Up" }))
          }
        />
      </div>
      <section>
        <article>
          <img
            src={require("../../assets/img/astronaut-on-computer.PNG")}
            alt="astronaut on computer"
            width={320}
            height={300}
          />
          <p>
            Make your own quizes. Customize quiz with flashcards on repeat,
            shuffle, etc.
          </p>
        </article>
        <article>
          <p>Invite friends and take quizes together.</p>
          <img
            src={require("../../assets/img/astronaut-reading.PNG")}
            alt="astronaut on computer"
            width={320}
            height={300}
          />
        </article>
        <article>
          <img
            src={require("../../assets/img/astronaut-w-friend.jpg")}
            alt="astronaut on computer"
            width={320}
            height={300}
          />
          <p>Give your friends a call and practice together live.</p>
        </article>
      </section>
    </LandingPageStyling>
  );
};
