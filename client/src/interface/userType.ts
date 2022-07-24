// import { QuizType } from "./quizType";

// export interface credentialsType {
//   emailAdress: string;
//   userName: string;
//   password: string;
//   quizes: Array<QuizType>
// }

export interface credentialsType {
    emailAdress: string;
    userName: string;
    password: string;
  }

  export interface activeFormType{
      logIn: boolean,
      signUp: boolean,
  }
