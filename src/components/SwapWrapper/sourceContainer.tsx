import React from "react";
import SourceButton from "../Button/sourceButton";
import { FromInput } from "../Input/fromAmount";
import { MaxButton } from "../MaxButton";
import { StyledContainer, SubContainer } from "./container.styled";

interface prop {
  calcTradeVal: (val: number) => void;
}

// export const Container = ({ calcTradeVal }: prop) => {
export const Container = () => {
  return (
    <StyledContainer>
      <SubContainer>
        <SourceButton />
        <FromInput />
      </SubContainer>
      <MaxButton></MaxButton>
    </StyledContainer>
  );
};
