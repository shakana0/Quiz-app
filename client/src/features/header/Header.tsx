//mountar login knapparna, när knapparna rendreras bestämms m hjälp av en funktion

import React from "react";
import styled from "styled-components";

const HeaderStyling = styled.header`
  padding: 2rem 0;
  background-color: pink;
`;

export const Header = () => {
  return <HeaderStyling>im header!</HeaderStyling>;
};
