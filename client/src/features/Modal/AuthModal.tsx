import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ModalStyling } from "../../components/styles/Modal.styled"
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { AuthBtn } from "../buttons/AuthBtn";
import { toggleModalState } from "./ModalSlice";
import { credentialsType } from "../../interface/userType";
import * as api from "../../api/userApi"
import { fetchUsers } from "./ModalSlice"

export const Modal = () => {
  const dispatch = useDispatch();
  const { modalType } = useSelector((state: any) => state.modal);
  const [credentials, setCredentials] = useState({
    emailAdress: "",
    userName: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    emailAdress: "",
    userName: "",
    password: "",
  });
  const [isCorrect, setIsCorrect] = useState({
    email: false,
    userName: false,
    password: false,
  });
  const validateForm = (event: any) => {
    event.preventDefault();
    let newErr = {
      emailAdress: "",
      userName: "",
      password: "",
    };
    const validChar = /^[0-9a-zA-Z@.-_]+$/;
    const emailValidFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    //validation for email
    if (credentials.emailAdress === "") {
      newErr.emailAdress = "Email adress is required";
    } else if (!emailValidFormat.test(credentials.emailAdress)) {
      newErr.emailAdress =
        "Email adress must be in correct format for e.g. name@gmail.com :( ";
    } else if (
      credentials.emailAdress.length! < 10 ||
      credentials.emailAdress.length! > 20
    ) {
      newErr.emailAdress =
        "Your email adress needs to be between 10 and 20 characters long";
    } else {
      setIsCorrect((current) => {
        return {
          ...current,
          email: true,
        };
      });
    }

    //validation for user name
    if (credentials.userName === "") {
      newErr.userName = "User name is required";
    } else if (!validChar.test(credentials.userName)) {
      newErr.userName = "Invalid characters detected :(";
    } else if (
      credentials.userName.length! < 8 ||
      credentials.userName.length! > 15
    ) {
      newErr.userName =
        "Your user name needs to be between 8 and 15 characters long";
    } else {
      setIsCorrect((current) => {
        return {
          ...current,
          userName: true,
        };
      });
    }

    //validation for password
    if (credentials.password === "") {
      newErr.password = "Password is required";
    } else if (
      credentials.password.length! < 8 ||
      credentials.password.length! > 15
    ) {
      newErr.password =
        "Your password needs to be between 8 and 15 characters long";
    } else {
      setIsCorrect((current) => {
        return {
          ...current,
          password: true,
        };
      });
    }
    setErrors(newErr);

    //checking if there is any errors
    let noErr = [];
    for (let value of Object.values(newErr)) {
      if (value !== "") {
        console.log("errors :(");
        noErr.push("error");
      }
    }
    if (!noErr.length) {
      console.log("inga errors :)");
      sendCredentials(); //vet inte om den ska va här :(
    }
  };

  const sendCredentials = () => {
    console.log("you have made it :)");
    // sending credentials to api.postUser function
    api.postUser(credentials);
  };

  const [allUsers, setAllUsers] = useState<credentialsType[]>([]);
  useEffect(() => {
    const loadUsers = async () => {
      const res = await dispatch(fetchUsers());
      console.log(res.payload, 'från modal')
      setAllUsers(res.payload);
    };
    loadUsers();
  }, []);
  
  const handleLogIn = () => {
    //LoginModal kan ha sin egen mapp i features
    /*loopa igeon allUsers .find och kolla om ngn mejl eller användarnamn matchar input OCH password
    Om sant log in == success else failed och visa error
    */
    /*
    *Gör själva formuläret till en egen (child)komponent. 
    *Identifiera och bryt ut repetitiva elements till små funktioner.
    *Alla events som onChange, onClick får kommonicera med Modal via props
    */

  };

  //Renders authentication buttons
  const RenderModalToggleBtns = () => {
    return (
      <div>
        <AuthBtn
          variant="secondary-light"
          isFullWidth={false}
          btnText="Log In"
          onClick={(event: React.MouseEvent<HTMLElement>) => {
            dispatch(
              toggleModalState({ showModal: true, modalType: "Log In" })
            );
          }}
        />
        <AuthBtn
          variant="secondary-light"
          isFullWidth={false}
          btnText="Sign Up"
          onClick={(event: React.MouseEvent<HTMLElement>) => {
            dispatch(
              toggleModalState({ showModal: true, modalType: "Sign Up" })
            );
          }}
        />
      </div>
    );
  };

  /*****/
  const FormHandler = () => {
    if (modalType === "Sign Up") {
      return (
        <form action="">
          <div className="close-icon-container">
            <CloseRoundedIcon
              className="close-icon"
              onClick={() =>
                dispatch(toggleModalState({ showModal: false, modalType: "" }))
              }
            />
          </div>
          <div className="btn-container">
            {RenderModalToggleBtns()}

            <div className="sign-up-btn-container">
              <div>
                <button>
                  <GoogleIcon className="google-icon" />
                  <p>Log In With Google</p>
                </button>
                <button>
                  <FacebookIcon className="facebook-icon" />
                  <p>Log In With Facebook</p>
                </button>
              </div>
              <div className="or-email">
                <span></span>
                <p>Or Email</p>
                <span></span>
              </div>
            </div>
          </div>
          <div className="input-box">
            <input
              type="email"
              placeholder="email address..."
              onChange={(event) =>
                setCredentials({
                  ...credentials,
                  emailAdress: event?.target.value,
                })
              }
            />
            <CheckRoundedIcon
              className={isCorrect.email ? "check-icon" : "hide-check-icon"}
            />
          </div>
          <p className="error">{errors && errors.emailAdress}</p>
          <div className="input-box">
            <input
              type="text"
              placeholder="username..."
              onChange={(event) =>
                setCredentials({
                  ...credentials,
                  userName: event?.target.value,
                })
              }
            />
            <CheckRoundedIcon
              className={isCorrect.userName ? "check-icon" : "hide-check-icon"}
            />
          </div>
          <p className="error">{errors.userName}</p>
          <div className="input-box">
            <input
              type="password"
              placeholder="password..."
              onChange={(event) =>
                setCredentials({
                  ...credentials,
                  password: event?.target.value,
                })
              }
            />
            <CheckRoundedIcon
              className={isCorrect.password ? "check-icon" : "hide-check-icon"}
            />
          </div>
          <p className="error">{errors.password}</p>

          <AuthBtn
            variant="secondary"
            isFullWidth={true}
            btnText="Sign Up"
            onClick={validateForm}
          />
        </form>
      );
    }
    if (modalType === "Log In") {
      return (
        <form
          action=""
          onClick={(event) => {
            event.preventDefault();
          }}
        >
          <div className="close-icon-container">
            <CloseRoundedIcon
              className="close-icon"
              onClick={() => dispatch(toggleModalState(false))}
            />
          </div>
          <div className="btn-container">
            {RenderModalToggleBtns()}
            <button>
              <GoogleIcon className="google-icon" />
              <p>Log In With Google</p>
            </button>
            <button>
              <FacebookIcon className="facebook-icon" />
              <p>Log In With Facebook</p>
            </button>
          </div>
          <div className="input-box">
            <input
              type="email"
              placeholder="email address..."
              onChange={(event) =>
                setCredentials({
                  ...credentials,
                  emailAdress: event?.target.value,
                })
              }
            />
            <CheckRoundedIcon
              className={isCorrect.email ? "check-icon" : "hide-check-icon"}
            />
          </div>
          <p className="error">{errors && errors.emailAdress}</p>
          <div className="input-box">
            <input
              type="password"
              placeholder="password..."
              onChange={(event) =>
                setCredentials({
                  ...credentials,
                  password: event?.target.value,
                })
              }
            />
            <CheckRoundedIcon
              className={isCorrect.password ? "check-icon" : "hide-check-icon"}
            />
          </div>
          <p className="error">{errors.password}</p>
          <AuthBtn
            variant="secondary"
            isFullWidth={true}
            btnText="Log In"
            onClick={validateForm}
          />
        </form>
      );
    }
  };

  return (
   <ModalStyling>
      <div className="pic-container">
        <img
          src={require("../../assets/img/astronaut-coming-down.PNG")}
          alt=" picture of stronaut coming down"
          width={450}
          height={450}
        />
      </div>

  
      {FormHandler()}   
       </ModalStyling>
  )
};
