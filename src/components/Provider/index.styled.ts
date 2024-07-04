import { Avatar, Box, styled as muiStyled, styled, Typography } from "@mui/joy";
import Divider from "@mui/material/Divider";
import { palette } from "../../theme/theme";

export const TextStyle = muiStyled(Typography)<{
  fontColor?: string;
  weight?: number;
  size?: string;
}>`
    color:  ${({ fontColor }) => fontColor};
  font-weight: ${({ weight }) => weight ?? 400};
  font-size: ${({ size }) => size ?? "14px"};
`;

export const Row = styled(Box)`
  display: flex;
  gap: 4px;
  width: max-content;
  align-items: center;
`;

export const ProviderFeeBox = styled(Box)`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background-color: ${palette.customPallet.backGroundColorPrimary};
`;

export const ProviderContainer = muiStyled(Box)`
  width:100%;
  // height: 234px;
  display:flex;
  flex-direction:column;
  // margin-left: 16px;
`;

export const BestProviderBox = muiStyled(Box)`
  margin-top: 8px;
  border-radius: 16px 16px 0px 0px;
  background-color: ${palette.customPallet.backGroundColorPrimary};
`;

export const ProviderDetailArrowBox = muiStyled(Box)`
  background-color: ${palette.customPallet.backGroundColorGrey};
  border-radius: 0px 0px 16px 16px;
`;

export const ProviderArrow = muiStyled(Box)`
  margin-top: 4px;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
`;

export const OtherProviderBox = muiStyled(Box)`
  margin-top: 16px;
  padding: 12px 16px;
  background-color:${palette.customPallet.backGroundColorGrey};
`;

export const OtherProviderText = muiStyled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const RouterPathContainer = styled(Box)`
  max-width: 100%;
  padding: 8px 16px;
  background-color: ${palette.customPallet.backGroundColorPrimary};
`;

export const RouteContainer = styled(Box)`
  display: flex;
  gap: 8px;
`;

export const RouteSymbol = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const AvatarBox = styled(Box)`
  height: 32px;
  width: 32px;
  position: relative;
`;

export const TokenAvatar = styled(Avatar)`
  height: 100%;
  width: 100%;
  border-width: 0px;
`;

export const ChainAvatar = styled(Avatar)`
  height: 11.6px;
  width: 11.6px;
  position: absolute;
  right: -2px;
  bottom: -2px;
  border-width: 2px;
  border-color: ${palette.customPallet.white};
`;

export const DividerStyle = styled(Divider)`
  margin-top: 0px;
  border-width: 2px;
  height: 28px;
`;

export const RouteData = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
