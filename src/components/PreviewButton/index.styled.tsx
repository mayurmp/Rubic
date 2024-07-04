import { Box, Button } from "@mui/joy";
import { styled as muiStyled } from "@mui/joy";
import styled from "styled-components";
import { palette } from "../../theme/theme";

export const SelectButtonStyle = muiStyled(Button)<{
  inputAmountExceedsBalance: boolean;
  swapAmount: string | undefined;
  inProgress: boolean; // Add inProcessing prop
}>`
    width: 100%;
    height: 44px;
    display: flex;
    padding: 0px 24px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border: none;      
    cursor: pointer;
    border-radius: 8px;
    margin-top: 0px;
    background-color: ${(props) =>
      props.inputAmountExceedsBalance
        ? palette.customPallet.fontColorRed
        : props.inProgress
        ? palette.customPallet.backGroundColorAthens // grey
        : props.swapAmount
        ? palette.customPallet.borderColor
        : palette.customPallet.backGroundColorAthens};         // grey
    &:hover {
      background-color: ${(props) =>
        props.inputAmountExceedsBalance
          ? palette.customPallet.fontColorRed
          : props.inProgress
          ? palette.customPallet.backGroundColorAthens // grey
          : props.swapAmount
          ? palette.customPallet.borderColor
          : palette.customPallet.backGroundColorAthens};
    }
  `;

export const SelectButtonText = muiStyled(Box)`
  width: 300px;
  height: 44px;
`;
export const Text = muiStyled(Box)<{
  inputAmountExceedsBalance: boolean;
  swapAmount: string | undefined;
  inProgress: boolean; 
}>`
  color: ${(props) =>
    props.inputAmountExceedsBalance
      ? palette.customPallet.warning
      : props.inProgress
      ? palette.customPallet.fontColorDark
      : props.swapAmount
      ? palette.customPallet.white
      : palette.customPallet.fontColorDark};
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0.48px;
  margin-top: 10px;
`;

export const ModalBox = muiStyled(Box)`
  display: flex;
  padding: 0px 16px;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  border-radius: 30px 30px 0px 0px;
  background-color:${palette.customPallet.white};
`;
