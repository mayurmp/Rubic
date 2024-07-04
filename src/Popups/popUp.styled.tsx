import styled from "styled-components";
import { Box, styled as muiStyled } from "@mui/joy";
import { palette } from "../theme/theme";

export const PopUpHeaderMain = muiStyled(Box)`
  padding-top: 8px;
  text-align: center;
`;

export const SubPopupHeader = muiStyled(Box)`
  margin-left: 165px;
  border-radius: 2px;
  background-color: ${palette.customPallet.backGroundColorSecondary};
`;

export const SelectTokenText = muiStyled(Box)`
  align-self: stretch;
  color: ${palette.customPallet.fontColorGrey};
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  letter-spacing: 0.48px;
  margin: 16px 0px 16px 0px;
`;

export const PopupContain = muiStyled(Box)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  flex: 1 0 0;
  align-self: stretch;
`;

export const SubPopupContain = muiStyled(Box)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
`;

export const AvailableChain = muiStyled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
`;

export const AvailableChainText = muiStyled(Box)`
  display: flex;
  padding: 4px;
  align-items: flex-start;
  gap: 10px;
`;

export const SubAvailableChainText = muiStyled(Box)`
  color: ${palette.customPallet.fontColorPrimary};
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.42px;
`;

export const ViewAll = muiStyled(Box)`
  padding: 4px;
  justify-content: space-between;
  align-items: flex-start;
`;

export const ViewAllText = muiStyled(Box)`
  color: ${palette.customPallet.borderColor};
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0.42px;
`;

export const Selector = muiStyled(Box)`
  display: flex;
  align-items: flex-start;
  gap: 8px;
`;

export const All = muiStyled(Box)`
  display: flex;
  width: 100px;
  padding: 4px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  border-radius: 8px;
  border: 2px solid ${palette.customPallet.borderColor};
  background-color: ${palette.customPallet.backGroundColorDark};
`;

export const AllText = muiStyled(Box)`
  overflow: hidden;
  color: ${palette.customPallet.fontColorGrey};
  text-overflow: ellipsis;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  letter-spacing: 0.48px;
`;

export const Token = muiStyled(Box)`
  display: flex;
  padding: 8px 12px 8px 8px;
  align-items: center;
  gap: 4px;
`;

export const TokenLogo = muiStyled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SubTokenLogo = muiStyled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
`;
export const TokenText = muiStyled(Box)`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  color: ${palette.customPallet.fontColorGrey};
  text-overflow: ellipsis;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  letter-spacing: 0.48px;
`;

export const Chain = muiStyled(Box)`
  display: flex;
  padding: 8px 12px 8px 8px;
  align-items: center;
  gap: 4px;
  border-radius: 8px;
  background-color:${palette.customPallet.backGroundColorPrimary};
`;

export const ChainLogo = muiStyled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ChainName = muiStyled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CurrencyMap = muiStyled(Box)`
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

export const ChainContainer = muiStyled(Box)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;

export const CurrencyItem = muiStyled(Box)`
  margin-bottom: 5px;
`;

export const Chainmap = muiStyled(Box)<{ selected: boolean }>`
  padding: 10px;
  text-align: center;
  display: flex;
  justify-content: center;
  border-radius: 10px;
  cursor: pointer;
  background-color: ${(props) =>
    props.selected
      ? palette.customPallet.backGroundColorBg
      : palette.customPallet.white};
  color: ${(props) =>
    props.selected ? palette.customPallet.white : palette.customPallet.black};
`;

export const SubModalContent = muiStyled(Box)`   
  display: flex;
  width: 391px;
  height: 706px;
  padding: 0px 16px;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  border-radius: 30px 30px 0px 0px;
  background-color: ${palette.customPallet.white};
`;
