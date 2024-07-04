import { useContext } from "react";
import styled from "styled-components";
import CurrencyContext from "../../context/currency";
import { Box, styled as muiStyled } from "@mui/joy";
import { palette } from "../../theme/theme";

const LineComponent = muiStyled(Box)`
  width: 248px;
  border: 1px solid ${palette.customPallet.borderColor};
  transform: rotate(-0deg);
  position: relative;
`;

const SVGWrapper = muiStyled(Box)`
  position: absolute;
  left: 50%;
  transform: translate(-50%, -40%);
`;

export const MiddleLine = () => {
  const {
    setInputAmount,
    sourceToken,
    setSourceToken,
    destinedToken,
    setDestinedToken,
    swapAmount,
    setSwapAmount,
    fromChain,
    setFromChain,
    toChain,
    setToChain,
    setInProgress,
  } = useContext(CurrencyContext);

  const swapArrow = "images/svg/swapArrow.svg";

  const handleSwap = () => {
    setSourceToken(destinedToken);
    setDestinedToken(sourceToken);
    setInputAmount("");
    setInProgress(false);
    setSwapAmount("");
    setFromChain(toChain);
    setToChain(fromChain);
  };
  return (
    <LineComponent>
      <SVGWrapper>
        <img src={swapArrow} alt="swap_arrow" onClick={handleSwap} />
      </SVGWrapper>
    </LineComponent>
  );
};
