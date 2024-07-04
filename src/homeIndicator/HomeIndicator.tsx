import React from "react";
import styled from "styled-components";
import { Box, styled as muiStyled } from "@mui/joy";
import { palette } from "../theme/theme";

const HomeIndicatorMain = muiStyled(Box)`
  padding: 0px 127px;
  justify-content: center;
  align-items: center;
`;

const SubHomeIndicator = muiStyled(Box)`
  width: 139px;
  height: 5px;
  margin-top: 8px;
  border-radius: 100px;
  background-color: ${palette.customPallet.fontColorDark};
`;
export const HomeIndicator = () => {
  return (
    <HomeIndicatorMain>
      <SubHomeIndicator />
    </HomeIndicatorMain>
  );
};
