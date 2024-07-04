import { Box, Skeleton, Typography } from "@mui/joy";
import {
  TextStyle,
  Row,
  ProviderFeeBox,
  ProviderContainer,
  BestProviderBox,
  ProviderDetailArrowBox,
  ProviderArrow,
  OtherProviderBox,
  OtherProviderText,
} from "./index.styled";
import CurrencyContext from "../../context/currency";
import { useContext, useEffect, useState } from "react";
import { TradeProvider } from "../../models/trade-provider";
import { TRADES_PROVIDERS } from "../../constants/provider/trades-providers";
import { RouterPath } from "./routerPath";

export const ProviderSection = () => {
  const { inProgress, swapAmount, bestTrade } = useContext(CurrencyContext);
  const [isRouterPath, setIsRouterPath] = useState<boolean>(false);
  const [provider, setProvider] = useState<any>();

  const providerInfo = (tradeProvider: string | undefined) => {
    if (tradeProvider !== undefined) {
      const providerKey = tradeProvider as TradeProvider;
      const provider = TRADES_PROVIDERS[providerKey];
      console.log(provider);
      setProvider({ ...provider });
    }
  };
  useEffect(() => {
    providerInfo(bestTrade?.tradeType);
    setIsRouterPath(false);
  }, [inProgress]);

  return (
    <ProviderContainer my={4}>
      <Box>
        <TextStyle fontColor="${palette.customPallet.greyFont}" size="18px">
          {inProgress ? "Calculating Providers" : "Provider"}
        </TextStyle>
      </Box>
      <BestProviderBox p={"12px 16px"}>
        {inProgress ? (
          <Typography>
            <Skeleton>Lorem ipsum</Skeleton>
          </Typography>
        ) : (
          <Row>
            <img
              style={{ height: "25px", width: "25px", borderRadius: "100%" }}
              src={provider?.image}
              alt={provider?.name}
            />
            <TextStyle
              fontColor="${palette.customPallet.darkGreyFont}"
              size="16px"
            >
              {provider?.name}
            </TextStyle>
            <TextStyle
              fontColor="${palette.customPallet.greenShade}"
              sx={{ marginLeft: "8px" }}
            >
              Best offer
            </TextStyle>
          </Row>
        )}
      </BestProviderBox>
      {/* {isRouterPath && !inProgress && <RouterPath />} */}
      <ProviderFeeBox>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Row>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.69999 10.8335H7.44667C6.56 10.8335 5.83333 10.0868 5.83333 9.16682C5.83333 8.89349 6.05999 8.66682 6.33333 8.66682C6.60666 8.66682 6.83333 8.89349 6.83333 9.16682C6.83333 9.53349 7.10667 9.83349 7.44667 9.83349H8.69999C8.95999 9.83349 9.16666 9.60015 9.16666 9.31349C9.16666 8.95349 9.06667 8.90015 8.84 8.82015L6.83333 8.12015C6.40666 7.96681 5.83333 7.66016 5.83333 6.68016C5.83333 5.84682 6.49334 5.16016 7.3 5.16016H8.55332C9.43999 5.16016 10.1667 5.90682 10.1667 6.82682C10.1667 7.10016 9.93999 7.32682 9.66666 7.32682C9.39333 7.32682 9.16666 7.10016 9.16666 6.82682C9.16666 6.46016 8.89332 6.16016 8.55332 6.16016H7.3C7.04 6.16016 6.83333 6.39349 6.83333 6.68016C6.83333 7.04016 6.93332 7.09348 7.15999 7.17348L9.16666 7.87348C9.59333 8.02682 10.1667 8.33349 10.1667 9.31349C10.1667 10.1535 9.50665 10.8335 8.69999 10.8335Z"
                fill="#98A2B3"
              />
              <path
                d="M8 11.5C7.72667 11.5 7.5 11.2733 7.5 11V5C7.5 4.72667 7.72667 4.5 8 4.5C8.27333 4.5 8.5 4.72667 8.5 5V11C8.5 11.2733 8.27333 11.5 8 11.5Z"
                fill="#98A2B3"
              />
              <path
                d="M8 15.1663C4.04666 15.1663 0.833328 11.953 0.833328 7.99967C0.833328 4.04634 4.04666 0.833008 8 0.833008C8.27333 0.833008 8.5 1.05967 8.5 1.33301C8.5 1.60634 8.27333 1.83301 8 1.83301C4.6 1.83301 1.83333 4.59967 1.83333 7.99967C1.83333 11.3997 4.6 14.1663 8 14.1663C11.4 14.1663 14.1667 11.3997 14.1667 7.99967C14.1667 7.72634 14.3933 7.49967 14.6667 7.49967C14.94 7.49967 15.1667 7.72634 15.1667 7.99967C15.1667 11.953 11.9533 15.1663 8 15.1663Z"
                fill="#98A2B3"
              />
              <path
                d="M14.6667 4.49967C14.3933 4.49967 14.1667 4.27301 14.1667 3.99967V1.83301H12C11.7267 1.83301 11.5 1.60634 11.5 1.33301C11.5 1.05967 11.7267 0.833008 12 0.833008H14.6667C14.94 0.833008 15.1667 1.05967 15.1667 1.33301V3.99967C15.1667 4.27301 14.94 4.49967 14.6667 4.49967Z"
                fill="#98A2B3"
              />
              <path
                d="M11.333 5.16663C11.2063 5.16663 11.0796 5.11996 10.9796 5.01996C10.7863 4.82663 10.7863 4.50663 10.9796 4.31329L14.313 0.979961C14.5063 0.786628 14.8263 0.786628 15.0196 0.979961C15.213 1.17329 15.213 1.49329 15.0196 1.68663L11.6863 5.01996C11.5863 5.11996 11.4596 5.16663 11.333 5.16663Z"
                fill="#98A2B3"
              />
            </svg>
            <TextStyle fontColor="#98A2B3">Protocol Fees</TextStyle>
            <TextStyle fontColor="#344054" marginLeft={"4px"}>
              {inProgress ? (
                <Skeleton>Lorem123</Skeleton>
              ) : (
                bestTrade?.trade?.feeInfo?.rubicProxy?.fixedFee?.amount.toFixed(
                  6
                )
              )}
            </TextStyle>
          </Row>
          <Row>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 15.1663C4.04667 15.1663 0.833333 11.953 0.833333 7.99967C0.833333 4.04634 4.04667 0.833008 8 0.833008C11.9533 0.833008 15.1667 4.04634 15.1667 7.99967C15.1667 11.953 11.9533 15.1663 8 15.1663ZM8 1.83301C4.6 1.83301 1.83333 4.59967 1.83333 7.99967C1.83333 11.3997 4.6 14.1663 8 14.1663C11.4 14.1663 14.1667 11.3997 14.1667 7.99967C14.1667 4.59967 11.4 1.83301 8 1.83301Z"
                fill="#98A2B3"
              />
              <path
                d="M10.4731 10.6202C10.3864 10.6202 10.2998 10.6002 10.2198 10.5468L8.1531 9.3135C7.63977 9.00684 7.25977 8.3335 7.25977 7.74017V5.00684C7.25977 4.7335 7.48643 4.50684 7.75977 4.50684C8.0331 4.50684 8.25977 4.7335 8.25977 5.00684V7.74017C8.25977 7.98017 8.45977 8.3335 8.66643 8.4535L10.7331 9.68684C10.9731 9.82684 11.0464 10.1335 10.9064 10.3735C10.8064 10.5335 10.6398 10.6202 10.4731 10.6202Z"
                fill="#98A2B3"
              />
            </svg>
            <TextStyle fontColor="#98A2B3">Time</TextStyle>
            <TextStyle fontColor="#344054" marginLeft={"4px"}>
              {inProgress ? <Skeleton>Lorem1234</Skeleton> : "8 minutes"}
            </TextStyle>
          </Row>
        </Box>
      </ProviderFeeBox>
      <ProviderDetailArrowBox>
        <ProviderArrow height={32}>
          <svg
            width="30"
            height="10"
            viewBox="0 0 30 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => setIsRouterPath(!isRouterPath)}
          >
            <path
              d="M29 1L15 9L1 0.999996"
              stroke="#344054"
              stroke-width="2"
              stroke-miterlimit="3.8637"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </ProviderArrow>
      </ProviderDetailArrowBox>
      <OtherProviderBox borderRadius={8}>
        <OtherProviderText>
          <TextStyle fontColor="#667085" size="16px">
            Other Providers
          </TextStyle>
          <svg
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 9.5L12 15.5L5.99999 9.5"
              stroke="#344054"
              stroke-width="2"
              stroke-miterlimit="3.8637"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </OtherProviderText>
      </OtherProviderBox>
    </ProviderContainer>
  );
};
