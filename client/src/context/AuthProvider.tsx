import { createContext, useState } from "react";
import { credentialsType } from "../interface/userType";
interface childrenProps {
  children: React.ReactNode;
}
// const intitialState: credentialsType = {
//     emailAdress: "",
//     userName: "",
//     password: "",
// }
interface authContectType{
    auth: credentialsType | null,
    setAuth: React.Dispatch<React.SetStateAction<credentialsType | null>>
}
// export const AuthContext = createContext<authContectType | null>(null);
export const AuthContext = createContext({} as authContectType);


export const AuthProvider = ({ children }: childrenProps) => {
  const [auth, setAuth] = useState<credentialsType | null>(null);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// export {AuthContext}
