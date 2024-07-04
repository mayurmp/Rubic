import { Box, Typography } from "@mui/joy";
import { styled as muiStyled } from "@mui/material";
import styled from "styled-components";
import { palette } from "../../theme/theme";

export const SubHeading = muiStyled(Box)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
`;

export const CustomGreyText = styled(Typography)`
  color:  ${palette.customPallet.fontColorSecondary}; !important;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.54px;
`;

export const PopUpComponent = muiStyled(Box)`
width:100%;
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 450px 2px 0px 2px;
`;
export const SubPopUpComponent = muiStyled(Box)`
  width:93%;
  height: 222px;
  display: flex;
  padding: 0px 16px 32px 16px;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  border-radius: 30px 30px 0px 0px;
  background-color:${palette.customPallet.white};
`;
