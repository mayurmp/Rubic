import { Box, Typography } from "@mui/joy";
import { styled } from "@mui/joy/styles";
import CurrencyContext from "../../context/currency";
import { useContext, useEffect, useState } from "react";
import { palette } from "../../theme/theme";

const Row = styled(Box)`
  display: flex;
  gap: 4px;
  // border: 1px solid black;
  width: max-content;
`;
const RowWrapper = styled(Box)`
  // border: 2px solid brown;
  display: flex;
  flex-direction: row-reverse;
  margin-top: 5px;
  margin-right: -2px;
`;
const QuoteStyle = styled(Typography)`
  color: ${palette.customPallet.fontColorSecondary};
  font-weight: 500;
  //   letter-spacing: 0.39px;
`;
const QuoteCoversion = styled(Typography)`
  color: ${palette.customPallet.fontColorSecondary};
  font-weight: 400;
  // letter-spacing: 0.39px;
`;
export const QuoteSection = () => {
  const [quoteVal, setQuoteVal] = useState<number | undefined>();
  const { inputAmount, sourceToken, destinedToken, swapAmount } =
    useContext(CurrencyContext);

  const QuoteConversion = (
    inputAmount: string | undefined,
    swapAmount: string | undefined
  ) => {
    console.log("tradeVal Quote", swapAmount);
    console.log("Input Quote", inputAmount);
    if (
      inputAmount !== undefined &&
      swapAmount !== undefined &&
      parseFloat(inputAmount) !== 0
    ) {
      setQuoteVal(
        parseFloat(
          (parseFloat(swapAmount) / parseFloat(inputAmount)).toFixed(5)
        )
      );
    }
  };

  useEffect(() => {
    QuoteConversion(inputAmount, swapAmount);
  }, [inputAmount, sourceToken, destinedToken, swapAmount]);
  return (
    <RowWrapper>
      <Row>
        <QuoteStyle fontSize={"13px"}></QuoteStyle>
        <QuoteCoversion
          fontSize={"13px"}
        >{`1 ${sourceToken?.symbol} = ${quoteVal} ${destinedToken?.symbol}`}</QuoteCoversion>
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <g clip-path="url(#clip0_4269_148737)">
            <path
              d="M10.0013 18.3327C14.6037 18.3327 18.3346 14.6017 18.3346 9.99935C18.3346 5.39698 14.6037 1.66602 10.0013 1.66602C5.39893 1.66602 1.66797 5.39698 1.66797 9.99935C1.66797 14.6017 5.39893 18.3327 10.0013 18.3327Z"
              stroke="#0265DC"
              stroke-width="1.66667"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M10 13.3333V10"
              stroke="#0265DC"
              stroke-width="1.66667"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M10 6.66602H10.0083"
              stroke="#0265DC"
              stroke-width="1.66667"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_4269_148737">
              <rect width="20" height="20" fill="white" />
            </clipPath>
          </defs>
        </svg> */}
      </Row>
    </RowWrapper>
  );
};
