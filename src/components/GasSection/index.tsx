import {
  AspectRatio,
  Avatar,
  Box,
  Card,
  Skeleton,
  Stack,
  Typography,
  colors,
} from "@mui/joy";
import { styled } from "@mui/joy/styles";
import { useContext, useEffect, useState } from "react";
import CurrencyContext from "../../context/currency";
import { BlockchainInfo } from "../../constants/blockchain-info";
import { palette } from "../../theme/theme";
import { gasFeesCalculation } from "./gasfees";

import {
  GreyFont,
  Row,
  DarkGreyFont,
  WarningText,
  BuyTokenText,
  RowWrapper,
  ChainAvatar,
  GasContainer,
} from "./gasSection.styled";
import {
  CrossChainTrade,
  EvmCrossChainTrade,
  EvmOnChainTrade,
  OnChainTrade,
} from "rubic-sdk";
import { convertToFiat } from "../../utils/fiatConversion";

export const GasSection = ({
  loading,
  balance,
  gasInFiat1,
}: {
  loading: boolean;
  balance: string;
  gasInFiat1: string;
}) => {
  const {
    swapAmount,
    inProgress,
    sourceToken,
    isBalance,
    fromChain,
    bestTrade,
    setGasFees,
    gasFees,
    fiatData,
    walletBalance,
  } = useContext(CurrencyContext);

  // const [gas, setGas] = useState<string | null>(null);
  const gasStationSVG = "images/svg/gas.svg";
  const warningSVG = "images/svg/warning.svg";

  const gasInFiat = convertToFiat(
    Number(gasFees),
    Number(fiatData?.fromNativeTokenPrice)
  );
  const balanceInFiat = convertToFiat(
    Number(walletBalance),
    Number(fiatData?.fromNativeTokenPrice)
  );

  useEffect(() => {
    if (bestTrade !== null && bestTrade?.trade !== null) {
      setGasFees(gasFeesCalculation(bestTrade?.trade));
    }
  }, [bestTrade]);
  // console.log("Gas data", gas);
  console.log("gasInFiat:", gasInFiat);

  const tradeInstance = (
    trade: CrossChainTrade | OnChainTrade | null | undefined
  ): boolean => {
    if (trade instanceof EvmCrossChainTrade) {
      return trade?.gasData !== null;
    }
    if (trade instanceof EvmOnChainTrade) {
      return trade?.gasFeeInfo !== null;
    }
    return false;
  };

  return (
    <GasContainer>
      <RowWrapper>
        <Row>
          <>
            <img src={gasStationSVG} alt="My Icon" />
          </>
          <GreyFont marginLeft={"4px"}>Gas Fee</GreyFont>
        </Row>
        <Row>
          {inProgress ? (
            <Typography>
              <Skeleton>Lorem ipsum</Skeleton>
            </Typography>
          ) : (
            <Row>
              {tradeInstance(bestTrade?.trade) ? (
                <>
                  {fromChain !== undefined && (
                    <DarkGreyFont isBalance={isBalance}>
                      ~ {Number(gasFees).toFixed(5)} {BlockchainInfo[fromChain].nativeToken}
                    </DarkGreyFont>
                  )}
                  <GreyFont>
                    (~{gasInFiat ? `$${gasInFiat.toFixed(4)}` : gasInFiat1})
                  </GreyFont>
                </>
              ) : (
                <GreyFont>Data not available</GreyFont>
              )}
            </Row>
          )}
        </Row>
      </RowWrapper>
      <RowWrapper>
        <Row>
          {fromChain !== undefined && (
            <ChainAvatar src={BlockchainInfo[fromChain].logoURI} />
          )}
          <GreyFont marginLeft={"4px"} color={"neutral"}>
            {"Available"}
          </GreyFont>
        </Row>
        <Row>
          {inProgress ? (
            <Typography>
              <Skeleton>Lorem ipsum is placeholder</Skeleton>
            </Typography>
          ) : (
            <Row>
              {fromChain !== undefined && (
                <DarkGreyFont fontSize={"14px"} isBalance={isBalance}>
                  {walletBalance
                    ? `${parseFloat(walletBalance).toFixed(4)} ${BlockchainInfo[fromChain].nativeToken}`
                    : balance}
                </DarkGreyFont>
              )}
              <GreyFont>
                (~{balanceInFiat ? `$${balanceInFiat.toFixed(4)}` : "$52.24"})
              </GreyFont>
            </Row>
          )}
        </Row>
      </RowWrapper>
      {(!isBalance ||
        (fromChain !== undefined &&
          BlockchainInfo[fromChain].balance <= 0)) && (
        <RowWrapper>
          <Row>
            <>
              <img src={warningSVG} alt="Warning SVG" />
            </>
            {fromChain && (
              <WarningText>{`Insufficient ${BlockchainInfo[fromChain].nativeToken} for gas fee`}</WarningText>
            )}
          </Row>
          <Row>
            {fromChain && (
              <BuyTokenText>{`Buy ${BlockchainInfo[fromChain].nativeToken}`}</BuyTokenText>
            )}
          </Row>
        </RowWrapper>
      )}
    </GasContainer>
  );
};
