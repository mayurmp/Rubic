import { createContext, useState } from "react";
import {
  BlockchainName,
  WrappedCrossChainTrade,
  WrappedOnChainTradeOrNull,
} from "rubic-sdk";
import { CrossChainTrade, OnChainTrade } from "rubic-sdk";
import { ITokenList } from "../constants/tokenlist";

export interface CurrencyContextData {
  inputAmount: string | undefined;
  setInputAmount: (amount: string | undefined) => void;
  swapAmount: string | undefined;
  setSwapAmount: (amount: string | undefined) => void;
  sourceToken: ITokenList | undefined;
  setSourceToken: (token: ITokenList | undefined) => void;
  destinedToken: ITokenList | undefined;
  setDestinedToken: (token: ITokenList | undefined) => void;
  swapTrade: any;
  setSwapTrade: (trade: any | null) => void;
  gasFees: string | null;
  setGasFees: (data: string | null) => void;
  inProgress: boolean;
  setInProgress: (progress: boolean) => void;
  fromChain: BlockchainName | undefined;
  setFromChain: (chain: BlockchainName | undefined) => void;
  toChain: BlockchainName | undefined;
  setToChain: (chain: BlockchainName | undefined) => void;
  isBalance: boolean;
  setIsBalance: (balance: boolean) => void;
  bestTrade: WrappedOnChainTradeOrNull | WrappedCrossChainTrade | null;
  setBestTrade: (
    data: WrappedOnChainTradeOrNull | WrappedCrossChainTrade
  ) => void;
  fiatData: IFiatData | null;
  setFiatData: (fiatData: IFiatData) => void;
  resetState: () => void;
  walletBalance: string | null;
  setWalletBalance: (walletAddress: string) => void;
}

export interface Itrade {
  trade: CrossChainTrade | OnChainTrade | null;
  tradeType: string;
}

export interface IFiatData {
  fromTokenPrice: string;
  toTokenPrice: string;
  fromNativeTokenPrice: string;
  currencyInfo: {
    name: string,
    symbol: string,
    abb: string,
  }
}
export const initialSate = {
  inputAmount: "",
  setInputAmount: () => {},
  swapAmount: "",
  setSwapAmount: () => {},
  sourceToken: undefined,
  setSourceToken: () => {},
  destinedToken: undefined,
  setDestinedToken: () => {},
  swapTrade: null,
  setSwapTrade: () => {},
  gasFees: "",
  setGasFees: () => {},
  inProgress: false,
  setInProgress: () => {},
  fromChain: undefined,
  setFromChain: () => {},
  toChain: undefined,
  setToChain: () => {},
  isBalance: true,
  setIsBalance: () => {},
  bestTrade: null,
  setBestTrade: () => {},
  fiatData: null,
  setFiatData: () => {},
  resetState: () => {},
  walletBalance: null,
  setWalletBalance: () => {},
};
const defaultCurrencyContextData: CurrencyContextData = initialSate;

const CurrencyContext = createContext<CurrencyContextData>(
  defaultCurrencyContextData
);

export const CurrencyContextProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [inputAmount, setInputAmount] = useState<string | undefined>();
  const [swapAmount, setSwapAmount] = useState<string>();
  const [sourceToken, setSourceToken] = useState<ITokenList>();
  const [destinedToken, setDestinedToken] = useState<ITokenList | undefined>();
  const [swapTrade, setSwapTrade] = useState<any>(null);
  const [gasFees, setGasFees] = useState<string | null>("");
  const [inProgress, setInProgress] = useState<boolean>(false);
  const [fromChain, setFromChain] = useState<BlockchainName | undefined>();
  const [toChain, setToChain] = useState<BlockchainName | undefined>();
  const [isBalance, setIsBalance] = useState<boolean>(true);
  const [bestTrade, setBestTrade] = useState<
    WrappedOnChainTradeOrNull | WrappedCrossChainTrade | null
  >(null);
  const [fiatData, setFiatData] = useState<IFiatData | null>(null);
  const [walletBalance, setWalletBalance] = useState<string | null>(null);
  const resetState = () => {
    setInputAmount(undefined);
    setSwapAmount("");
    setSourceToken(undefined);
    setDestinedToken(undefined);
    setSwapTrade(null);
    setGasFees(null);
    setInProgress(false);
    setFromChain(undefined);
    setIsBalance(true);
    setBestTrade(null);
    setFiatData(null);
    setWalletBalance(null);
  };
  const contextValue: CurrencyContextData = {
    inputAmount,
    setInputAmount,
    swapAmount,
    setSwapAmount,
    sourceToken,
    setSourceToken,
    destinedToken,
    setDestinedToken,
    swapTrade,
    setSwapTrade,
    gasFees,
    setGasFees,
    inProgress,
    setInProgress,
    fromChain,
    setFromChain,
    toChain,
    setToChain,
    isBalance,
    setIsBalance,
    bestTrade,
    setBestTrade,
    fiatData,
    setFiatData,
    resetState,
    walletBalance,
    setWalletBalance,
  };

  return (
    <CurrencyContext.Provider value={contextValue}>
      {children}
    </CurrencyContext.Provider>
  );
};

export default CurrencyContext;
