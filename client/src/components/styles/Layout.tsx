import React from "react";
import styled from "styled-components";
import { Header } from "../../features/header/Header";

const LaoutStyling = styled.div`
  margin: 0;
  padding: 0;

  main {
  }

  footer {
    padding: 2rem 0;
    background-color: #342882;
  }
`;

interface childrenProps {
  children: React.ReactNode;
}
export const Layout = ({ children }: childrenProps) => {
  return (
    <LaoutStyling>
      <Header />
      <main>{children}</main>
      <footer></footer>
    </LaoutStyling>
  );
};
