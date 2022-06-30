import React from "react";
import { SignUpBtn } from "../buttons/SignUpBtn";
import { LandingPageStyling } from "../../components/styles/LandingPage.styled"


export const LandingPage = () => {
  return (
    <LandingPageStyling>
      <div className="hero-img">
        <div className="overlay">
          <h1>HAVE FUN LEANRING</h1>
        </div>
        <SignUpBtn variant="secondary" isFullWidth={false} btnText="Get Started" />
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
