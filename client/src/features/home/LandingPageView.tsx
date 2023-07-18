import { AuthBtn } from "../buttons/AuthBtn";
import { LandingPageStyling } from "../../components/styles/LandingPage.styled";
import { useDispatch } from "react-redux";
import { toggleModalState, setActiveForm } from "../Modal/ModalSlice";
import Strings from "../../utils/strings";

export const LandingPage = () => {
  const dispatch = useDispatch();

  return (
    <LandingPageStyling>
      <div className="hero-img">
        <div className="overlay">
          <h1> {Strings.landingPage.pageHader.toUpperCase()}</h1>
        </div>
        <AuthBtn
          variant="primary-pink"
          isFullWidth={false}
          btnText={Strings.landingPage.button.getStarted}
          onClick={() => {
            dispatch(
              toggleModalState({ showModal: true, modalType: "Sign Up" })
            );
            dispatch(setActiveForm({ logIn: false, signUp: true }));
          }}
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
          <p>{Strings.landingPage.text.createQuiz}</p>
        </article>
        <article>
          <p>{Strings.landingPage.text.inviteFriends}</p>
          <img
            src={require("../../assets/img/astronaut-reading.PNG")}
            alt="astronaut reading"
            width={320}
            height={300}
          />
        </article>
        <article>
          <img
            src={require("../../assets/img/astronaut-w-friend.jpg")}
            alt="astronaut with friend"
            width={320}
            height={300}
          />
          <p> {Strings.landingPage.text.callFriends}</p>
        </article>
      </section>
    </LandingPageStyling>
  );
};
