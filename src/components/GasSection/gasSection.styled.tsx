import { Avatar, Box, Card, Typography } from "@mui/joy";
import { styled } from "@mui/joy/styles";
import { palette } from "../../theme/theme";

export const GasContainer = styled(Card)`
  display: flex;
  padding: 8px 16px;
  gap: 0px;
  width: 91%;
  border-radius: 8px;
  border: none;
`;

export const RowWrapper = styled(Box)`
  display: flex;
  justify-content: space-between;
  height: 32px;
  align-items: center;
`;

export const Row = styled(Box)`
  display: flex;
  gap: 4px;
  align-items: center;
`;

export const GreyFont = styled(Typography)`
  font-size: 14px;
  color: ${palette.customPallet.fontColorPrimary} !important;
  font-weight: 300;
`;

export const DarkGreyFont = styled(Typography)<{ isBalance?: boolean }>`
  font-size: 14px;
  color: ${({ isBalance }) =>
    isBalance
      ? "${palette.customPallet.darkgreyFont} !important"
      : "${palette.customPallet.warning} !important"};
  fontweight: 400;
`;

export const WarningText = styled(Typography)`
  font-size: 14px;
  font-weight: 500;
  color: ${palette.customPallet.warning};
`;

export const BuyTokenText = styled(Typography)`
  font-size: 14px;
  font-weight: 500;
  color: ${palette.primary.solidBg};
  margin-left: 25px;
  text-decoration-line: underline;
`;



export const ChainAvatar = styled(Avatar)`
  height: 16px;
  width: 16px;
  border-width: 2px;
  border-color: ${palette.customPallet.white};
`;


