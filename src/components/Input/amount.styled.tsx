import { Input } from "@mui/joy";
import { styled as muiStyled } from "@mui/joy";
import styled, { css } from "styled-components";
import { Box } from "@mui/material";
import { palette } from "../../theme/theme";

export const SubInputComponet = styled.div<{
  inputAmountExceedsBalance: boolean;
}>`
  width: 173px;
  height: 28px;
  display: flex;
  padding: 8px;
  justify-content: flex-end;
  align-items: center;
  flex: 1 0 0;
  border-radius: 8px;
  background-color: ${palette.customPallet.white};

  ${(props) =>
    props.inputAmountExceedsBalance &&
    css`
      border: 1px solid ${palette.customPallet.warning};
    `}
`;

export const TextContainer = muiStyled(Box)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
`;

export const SubTextContainer = muiStyled(Box)`
  display: flex;
  align-items: flex-start;
  gap: 4px;
  padding-right: 25px;
`;

export const InputAreaa = muiStyled(Input)`
  color: ${palette.customPallet.fontColorPrimary};
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.54px;
  outline: none;
  border: none;
  text-align: center;
  
`;
export const InputArea = styled.input.attrs({ type: "number" })`
  background-color: transparent;
  color: ${palette.customPallet.fontColorGrey};
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.54px;

  outline: none !important;
  border: none !important;

  &:focus {
    outline: none !important;
    border: none !important;
  }
  &::placeholder {
    color: ${palette.customPallet.fontColorGrey};
    opacity: 0.6;
  }
  
  -moz-appearance: textfield;
  -webkit-appearance: none;

  /* For WebKit browsers */
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const InputComponet = muiStyled(Box)`
  width: 173px;
  height: 28px;
  display: flex;
  padding: 8px;
  justify-content: end;
  align-items: center;
  flex: 1 0 0;
  border-radius: 8px;
  background-color: ${palette.customPallet.backGroundColorBlue};

  color: ${palette.customPallet.fontColorPrimary};
  text-align: right;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.54px;
`;

export const SubInputComponetTo = muiStyled(Box)`
  color: ${palette.customPallet.fontColorPrimary};
  display: flex;
  flex-direction: row-reverse;
  text-align: right;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.48px;
`;
