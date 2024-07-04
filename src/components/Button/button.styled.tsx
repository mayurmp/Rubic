import { Button } from "@mui/joy";
import { styled as muiStyled } from "@mui/joy";
import styled from "styled-components";
import { Box } from "@mui/material";

export const ButtonComponent = muiStyled(Box)`
  // width: 127px;
  height: 28px;
  display: flex;
  padding: 8px 0px 8px 0px;
  align-items: center;
  gap: 4px;
  border-radius: 8px;
`;

export const ButtonStyle = muiStyled(Button)`
  // width: 127px;
  padding: 0;
  margin: 0;
  border-width: 0rem;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  padding-left: 7px;
  font-weight: 400;
  height: 44px;
}
`;

export const SVGImage = styled.img`
  height: 24px;
  widthL 24px;
`;
