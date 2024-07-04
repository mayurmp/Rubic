import styled from "styled-components";
import { animated } from "react-spring";
import { Box, styled as muiStyled } from "@mui/joy";
import { palette } from "../../theme/theme";

export const ModalWrapper = styled(animated.div)`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  height: 727px;
  overflow: hidden;
  z-index: 1;
`;

export const ModalContent = muiStyled(Box)`
width:100%;
  display: flex;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  overflow: hidden;
`;
export const SubModalContent = muiStyled(Box)`
width:100%;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  overflow: hidden;
`;

export const BackgroundOverlay = muiStyled(Box)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 827px;
  background-color: ${palette.customPallet.backGroundColor};
  z-index: 0;
  border-bottom-left-radius: 28px;
  border-bottom-right-radius: 28px;
  border-top-left-radius: 28px;
  border-top-right-radius: 28px;
`;
