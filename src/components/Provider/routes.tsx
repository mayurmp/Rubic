import { Typography } from "@mui/joy";
import {
  CrossChainStep,
  CrossChainTradeType,
  OnChainTrade,
  OnChainTradeType,
  RubicStep,
} from "rubic-sdk";
import { BlockchainInfo } from "../../constants/blockchain-info";
import { ON_CHAIN_PROVIDERS } from "../../constants/provider/on-chain-providers";
import { BRIDGE_PROVIDERS } from "../../constants/provider/bridge-providers";
import { useEffect, useState } from "react";
import React from "react";
import {
  RouteContainer,
  RouteSymbol,
  AvatarBox,
  TokenAvatar,
  ChainAvatar,
  DividerStyle,
  RouteData,
} from "./index.styled";
import { Itrade } from "../../context/currency";

interface routePropInterface {
  token?: any;
  chain?: string;
  amount?: string | undefined;
  route?: RubicStep;
  trade?: Itrade | null;
}

interface IProvider {
  label: string;
  image?: string;
}

interface RoutePathItem {
  symbol: string;
}

interface Route {
  path?: RoutePathItem[];
}

interface ProviderInfo {
  provider?: IProvider;
  amounts?: string[];
}

export const StepRoute = ({
  token,
  chain,
  amount,
  route,
  trade,
}: routePropInterface) => {
  const [step, setStep] = useState<ProviderInfo>();

  const getRoute = (route: RubicStep | undefined) => {
    if (route?.type === "on-chain") {
      const provider = ON_CHAIN_PROVIDERS[route?.provider as OnChainTradeType];
      return {
        provider: {
          label: `Swap Via ${provider?.name}`,
          image: provider?.image,
        },
        amounts: route?.path?.map((el: any) => el.symbol),
      };
    }
    const provider = BRIDGE_PROVIDERS[route?.provider as CrossChainTradeType];
    return {
      provider: {
        label: `Bridge Via ${provider?.name}`,
        image: provider?.image,
      },
      amounts: route?.path?.map((el: any) => {
        const tokenAmountString =
          "tokenAmount" in el && el.tokenAmount > 0
            ? el.tokenAmount.toFixed(6) + " "
            : "";
        return `${tokenAmountString}${el.symbol}`;
      }),
    };
  };

  const onChainRoutes = (route: Itrade | undefined | null) => {
    const provider = ON_CHAIN_PROVIDERS[route?.tradeType as OnChainTradeType];
    return {
      provider: {
        label: `Swap Via ${provider?.name}`,
        image: provider?.image,
      },
      amounts: (route?.trade as OnChainTrade)?.path?.map(
        (el: any) => el.symbol
      ),
    };
  };

  useEffect(() => {
    if (route) {
      setStep(getRoute(route));
    } else {
      setStep(onChainRoutes(trade));
    }
  }, [setStep]);


  return (
    <RouteContainer>
      <RouteSymbol>
        <AvatarBox>
          {route || trade ? (
            <TokenAvatar src={step?.provider?.image} />
          ) : (
            <>
              <TokenAvatar src={token?.logoURI}></TokenAvatar>
              {chain && (
                <ChainAvatar src={BlockchainInfo[chain].logoURI}></ChainAvatar>
              )}
            </>
          )}
        </AvatarBox>
        <DividerStyle orientation="vertical" variant="middle" />
      </RouteSymbol>
      <RouteData>
        <Typography
          sx={{
            fontSize: "18px",
            color: "${palette.customPallet.fontColorGrey}",
          }}
        >
          {route ? step?.provider?.label : `${amount} ${token?.symbol}`}
        </Typography>
        <Typography
          sx={{
            fontSize: "14px",
            color: "${palette.customPallet.fontColorPrimary}",
          }}
        >
          {route
            ? step?.amounts !== undefined &&
              step?.amounts.map((item: any, index: number) => (
                <React.Fragment key={index}>
                  {index !== 0 && " > "} {item}
                </React.Fragment>
              ))
            : chain && `~$23.59 - on ${BlockchainInfo[chain].name}`}
        </Typography>
      </RouteData>
    </RouteContainer>
  );
};
