import styled from "styled-components";
import { Box, styled as muiStyled } from "@mui/joy";
import { palette } from "../../theme/theme";

export const StyledContainer = muiStyled(Box)`
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  align-self: stretch;
  height: 82px;
`;
export const SubContainer = muiStyled(Box)`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
`;

export const QuoteChainConatiner = muiStyled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 16px 0px 0px 0px;
`;

export const GetTextStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
`;

export const SubGetText = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  flex: 1 0 0;
  align-self: stretch;
`;

export const TextComponent = styled.span`
  color: ${palette.customPallet.fontColorGrey};
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  letter-spacing: 0.42px;
`;

export const ValueComponent = styled.span`
  font-size: 13px;
  font-weight: 400;
  text-align: right;
  color: ${palette.customPallet.fontColorPrimary};
`;

export const PayTextStyle = styled.div`
  // width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
`;

export const SubPayText = styled.div`
  align-items: center;
  gap: 4px;
  flex: 1 0 0;
  align-self: stretch;
`;
