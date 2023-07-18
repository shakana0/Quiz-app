//Handle errors in signup_post
export const handleErrors = (err: any) => {
  // : { [key: string]: any } == type annotation
  let errors: { [key: string]: any } = {
    emailAdress: "",
    userName: "",
    password: "",
  };
  //incorrect email
  if (err.message === "incorrect email or user name") {
    errors.emailAdress = "Email or user name does not exist";
  }

  if (err.message === "incorrect password") {
    errors.password = "Wrong password";
  }

  if (err.code === 11000 && err.message.includes("emailAdress")) {
    errors.emailAdress = "Email already exits";
    return errors;
  }
  if (err.code === 11000 && err.message.includes("userName")) {
    errors.userName = "User name already exits";
    return errors;
  }
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }: any) => {
      //populate object using brackets js
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};
