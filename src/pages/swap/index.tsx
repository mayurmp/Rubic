// import styled from 'styled-components/macro';
import styled from "styled-components";
import { Heading } from "../../components/Heading/index";
import { SwapWrapper } from "../../components/SwapWrapper/index";
// import { SelectButton } from "../../components/SelectButton";
// import { CalculateButton } from "../../components/Quote/trade";
import { CalcButton } from "../../components/Quote/Calcbutton";
import { GasSection } from "../../components/GasSection";
import CurrencyContext from "../../context/currency";
import { useContext } from "react";
import PreviewButton from "../../components/PreviewButton";
import { ProviderSection } from "../../components/Provider";
// import { RouterPath } from "../../components/Provider/routerPath";
import { Box, styled as muiStyled } from "@mui/joy";
import { palette } from "../../theme/theme";
import { GAS_IN_FIAT, WALLLET_BALANCE } from "../../constants/constant";
// import { TradeBox } from "../../components/Quote/trade";

const RootContainer = muiStyled(Box)`
  width: 393px;
  height: 849px;
  overflow: auto;
  border-radius: 30px;
  border: 1px solid ${palette.customPallet.black};
  background-color: ${palette.customPallet.white};
  position: fixed;
  padding: 0px 16px 16px 16px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  &::-webkit-scrollbar {
    width: 0px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: transparent;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: transparent;
  }
`;

const Headings = muiStyled(Box)`
  width: 100%;
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  margin-top: 0px;
`;
const TopContainer = styled.div`
  margin-left : 10px;
  margin-right : 10px;
`
export const Swap = () => {
  const { inProgress, swapAmount, inputAmount } = useContext(CurrencyContext);
  return (
    <TopContainer>
      <Headings>
        <Heading />
        <SwapWrapper />
        {(inProgress || swapAmount) && (
          <GasSection
            loading={true}
            gasInFiat1={GAS_IN_FIAT}
            balance={WALLLET_BALANCE}
          ></GasSection>
        )}
        <PreviewButton />
        {/* <TradeBox /> */}
        {/* <CalcButton /> */}
        {/* <CalculateButton/> */}
        {/* <CalcButton /> */}
        {/* {(inProgress || swapAmount) && <ProviderSection />} */}
      </Headings>
      {/* <RouterPath/> */}
    </TopContainer>
  );
};
