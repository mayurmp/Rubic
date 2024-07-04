import { Box, Button, Typography, styled as muiStyled } from "@mui/joy";
import { palette } from "../../theme/theme";

export const TokenBalance = muiStyled(Box)`
  width: 100%;
  height: 22px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
  margin-top: 16px;
`;

export const SubChain = muiStyled(Box)`
  display: flex;
  align-items: flex-start;
`;

export const ChainName = muiStyled(Box)`
  display: flex;
  padding: 2px 8px;
  align-items: center;
  border-radius: 4px;
  background-color: ${palette.customPallet.backGroundColorBlueShade};
  mix-blend-mode: multiply;
`;

export const ChainNameText = muiStyled(Typography)`
  color: ${palette.customPallet.fontColorBlue};
  text-align: center;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0.36px;
`;
export const Balance = muiStyled(Box)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  align-self: stretch;
`;

export const BalanceText = muiStyled(Typography)`
  flex: 1 0 0;
  color: ${palette.customPallet.fontColorSecondary};
  text-align: right;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.39px;
`;

export const MaxButtonText = muiStyled(Button)`
  color: ${palette.customPallet.borderColor};
  font-size: 13px;
  font-style: normal;
  font-weight: 700;
  border: 0px solid black;
  letter-spacing: 0.39px;
  text-decoration-line: underline;
  background-color: transparent;
  outline:none;
`;
