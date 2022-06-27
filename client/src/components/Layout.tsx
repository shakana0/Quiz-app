import React from "react";
import styled from "styled-components";
import { Header } from "../features/header/Header";

const LaoutStyling = styled.div`
  margin: 0;
  padding: 0;
  background-color: orange;

  main{
    /* height: 100vh; */
  }

  footer{
    padding: 2rem 0;
    background-color: #2cf289;
  }
`;

interface childrenProps {
  children: React.ReactNode;
}
export const Layout = ({ children }: childrenProps) => {
  return (
    <LaoutStyling>
      <Header/>
      <main>{children}</main>
      <footer>Hi I'm footer</footer>
    </LaoutStyling>
  );
};
