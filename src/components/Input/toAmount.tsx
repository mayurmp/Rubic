import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import CurrencyContext from "../../context/currency";
import { styled as muiStyled } from "@mui/material";
import { InputComponet, SubInputComponetTo } from "./amount.styled";

export const ToAmount = () => {
  const {
    swapTrade,
    inputAmount,
    sourceToken,
    destinedToken,
    inProgress,
    setInProgress,
    swapAmount,
  } = useContext(CurrencyContext);

  useEffect(() => {
    if (
      inputAmount !== undefined &&
      parseFloat(inputAmount) > 0 &&
      sourceToken &&
      destinedToken
    ) {
      setInProgress(true);
    }
  }, [inputAmount, sourceToken, destinedToken]);

  return (
    <InputComponet>
      <SubInputComponetTo>
        {/* <TextContainer> */}
        {/* {tradeValue
            ? tradeValue
            : inProgress
            ? "Calculating..."
            : ""} */}
        {inputAmount ? (inProgress ? "Calculating..." : swapAmount) : ""}
        {/* </TextContainer> */}
      </SubInputComponetTo>
    </InputComponet>
  );
};
