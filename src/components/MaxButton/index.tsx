import { useContext, useEffect, useState } from "react";
import CurrencyContext from "../../context/currency";
import { BlockchainInfo } from "../../constants/blockchain-info";
import {
  BlockchainName,
  WrappedCrossChainTrade,
  WrappedOnChainTradeOrNull,
} from "rubic-sdk";
import {
  Balance,
  BalanceText,
  ChainName,
  ChainNameText,
  MaxButtonText,
  SubChain,
  TokenBalance,
} from "./maxButton.styled";
import { ITokenList } from "../../constants/tokenlist";
import { tradeCalculation } from "../Quote/trade";
import RubicSDKContext from "../../context/rubicSdk";
import { tokenDetails } from "../Input/fromAmount";
import { gasFeesCalculation } from "../GasSection/gasfees";

export const MaxButton = () => {
  const {
    sourceToken,
    destinedToken,
    fromChain,
    toChain,
    setInputAmount,
    setSwapTrade,
    inputAmount,
    bestTrade,
    gasFees,
    setIsBalance,
    setBestTrade,
  } = useContext(CurrencyContext);
  const [isNative, setIsNative] = useState<boolean>(false);

  const [tokenBalance, setBalance] = useState(0);
  const [tradeMax, setTradeMax] = useState<
    WrappedOnChainTradeOrNull | WrappedCrossChainTrade
  >();
  const [maxGasFees, setMaxGasFees] = useState<string | null>(null);
  const [enableMax, setEnableMax] = useState<boolean>(false);

  const calculateBalance = () => {
    if (sourceToken) {
      return sourceToken.balance;
    }
    return 0;
  };

  const checkNativeToken = (sourceToken: ITokenList | undefined) => {
    if (
      fromChain &&
      sourceToken !== undefined &&
      sourceToken.symbol === BlockchainInfo[fromChain].nativeToken
    ) {
      setIsNative(true);
    } else {
      setIsNative(false);
    }
  };
  const sdk = useContext(RubicSDKContext);

  const fromToken: tokenDetails = {
    blockchain: fromChain,
    address: sourceToken?.address,
  };
  const toToken: tokenDetails = {
    blockchain: toChain,
    address: destinedToken?.address,
  };

  useEffect(() => {
    const maxTokenBalance = calculateBalance();
    setBalance(maxTokenBalance);
    checkNativeToken(sourceToken);
    setEnableMax(false);
    tradeCalculation(
      fromToken,
      toToken,
      String(maxTokenBalance),
      sdk,
      fromChain,
      toChain,
    ).then((result: any) => {
      if (result) {
        setTradeMax(result);
        setMaxGasFees(gasFeesCalculation(result));
      }
    });
  }, [sourceToken, fromChain, destinedToken, toChain]);

  useEffect(() => {
    const maxAmount = calculateMaxAmountWithFees(tokenBalance);
    if (maxAmount > 0) {
      console.log(`maxAmount in UseEffect: ${maxAmount}`);
      setEnableMax(true);
    } else {
      setEnableMax(false);
    }
  }, [setTradeMax, tradeMax]);

  const calculateMaxAmountWithFees = (
    tokenBalance: number
    // chain: string | undefined
  ) => {
    let maxAmount = tokenBalance;

    const protocolFee = (
      tradeMax?.trade?.feeInfo?.rubicProxy?.fixedFee?.amount ?? 0
    ).toString();
    console.log("Protocol fee: ", protocolFee);

    const providerFee = (
      tradeMax?.trade?.feeInfo?.provider?.cryptoFee?.amount ?? 0
    ).toString();
    console.log("Provider fee", providerFee);

    console.log("Max GasFees:", maxGasFees);

    // const gasFees = 1;
    const originChainFee =
      Number(maxGasFees) + Number(providerFee) + Number(protocolFee);
    console.log("Origin chain fee: ", originChainFee);

    if (isNative) {
      maxAmount -= originChainFee;
    }

    return maxAmount;
  };

  const handleMaxButtonClick = () => {
    let maxAmount = 0;

    if (sourceToken && tokenBalance > 0) {
      // Logic for non-native tokens
      if (
        sourceToken.symbol !== "ETH" &&
        sourceToken.symbol !== "BNB" &&
        sourceToken.symbol !== "MATIC"
      ) {
        maxAmount = tokenBalance;
      }
      // Logic for native tokens
      else {
        maxAmount = calculateMaxAmountWithFees(tokenBalance);
      }
    }
    console.log("maxAmount:", maxAmount);
    if (maxAmount < 0) {
      setInputAmount(inputAmount);
      setIsBalance(false);
    } else {
      setInputAmount(String(maxAmount));
    }

    console.log("Maximum token amount for swap:", maxAmount);
  };

  return (
    <>
      {sourceToken ? (
        <TokenBalance>
          <TokenChain chain={fromChain} type="from" />
          <Balance>
            <BalanceText>{`Balance: ${sourceToken.balance.toFixed(4)} ${sourceToken.symbol}.`}</BalanceText>
            <MaxButtonText
              onClick={handleMaxButtonClick}
              disabled={
                isNative
                  ? !destinedToken || tokenBalance <= 0 || !enableMax
                  : false || tokenBalance <= 0
              }
              style={{ backgroundColor: "transparent" }}
            >
              Max
            </MaxButtonText>
          </Balance>
        </TokenBalance>
      ) : null}
    </>
  );
};

export const TokenChain = ({
  type,
  chain,
}: {
  type: string;
  chain: BlockchainName | undefined;
}) => {
  const { fromChain, toChain } = useContext(CurrencyContext);

  return (
    <SubChain>
      <ChainName>
        <ChainNameText>
          {fromChain !== undefined && type === "from"
            ? BlockchainInfo[fromChain]?.name + " Chain"
            : toChain !== undefined && BlockchainInfo[toChain]?.name + " Chain"}
        </ChainNameText>
      </ChainName>
    </SubChain>
  );
};
