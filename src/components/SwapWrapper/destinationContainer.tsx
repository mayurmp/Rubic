import React, { useContext } from "react";
import DestinationButton from "../Button/destinationButton";
import { ToAmount } from "../Input/toAmount";
import { QuoteSection } from "../Quote/quote";
import CurrencyContext from "../../context/currency";
import { TokenChain } from "../MaxButton";
import {
  QuoteChainConatiner,
  StyledContainer,
  SubContainer,
} from "./container.styled";
import { Skeleton, Typography } from "@mui/joy";

export const DestinationContainer = () => {
  const { destinedToken, swapAmount, toChain, inProgress } =
    useContext(CurrencyContext);
  return (
    <StyledContainer>
      <SubContainer>
        <DestinationButton></DestinationButton>
        <ToAmount />
      </SubContainer>
      <QuoteChainConatiner>
        {destinedToken && <TokenChain chain={toChain} type="to"></TokenChain>}
        {inProgress ? (
          <Typography>
            <Skeleton>Lorem ipsum lapekam</Skeleton>
          </Typography>
        ) : swapAmount ? (
          <QuoteSection />
        ) : (
          ""
        )}
      </QuoteChainConatiner>
    </StyledContainer>
  );
};
