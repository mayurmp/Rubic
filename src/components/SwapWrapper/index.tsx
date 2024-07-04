import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { PayText } from "./payText";
import { Container } from "./sourceContainer";
import { GetText } from "./getText";
import { MiddleLine } from "../MiddleLine/line";
import { DestinationContainer } from "./destinationContainer";
import { BLOCKCHAIN_NAME, CHAIN_TYPE } from "rubic-sdk";
import CurrencyContext from "../../context/currency";
import RubicSDKContext from "../../context/rubicSdk";
import { ITokenList } from "../../constants/tokenlist";
import { palette } from "../../theme/theme";
import { useAccount } from "wagmi";
import useAsyncEffect from "use-async-effect";
import { BlockchainInfo } from "../../constants/blockchain-info";
// import { SourceAmount } from "../Input/sourceAmount";
// import { SourceContainer } from "./destinatioContainer";

const SwapWrapperStyle = styled.div`
  width: 100%;
  // height: 318px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  border-radius: 16px;
  border: 1px solid ${palette.customPallet.borderColor};
  background-color: ${palette.customPallet.backGroundColorDark};
  // z-index: 1;
`;

const SubContainerUp = styled.div`
  // height: 111px;
  width: calc(100% - 32px);
  padding: 20px 16px 20px 16px;
  // border: 1px solid red;
  // margin-bottom: 16px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
  border-radius: 16px 16px 0px 0px;
`;
const SubContainerDown = styled.div`
  width: calc(100% - 32px);
  padding: 20px 16px 20px 16px;
  display: flex;
  padding: 20px 16px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
  border-radius: 16px 16px 0px 0px;
`;
export const SwapWrapper = () => {
  // const [tradeValue, setTradeValue] = useState<any>();
  const {
    inputAmount,
    swapTrade,
    setSwapTrade,
    swapAmount,
    setSwapAmount,
    sourceToken,
    destinedToken,
    gasFees,
    fromChain,
    toChain,
    isBalance,
    setIsBalance,
    bestTrade,
    fiatData,
    setFiatData,
    setSourceToken,
    setDestinedToken,
  } = useContext(CurrencyContext);

  const sdk = useContext(RubicSDKContext);
  const account = useAccount();
  const [loading, setLoading] = useState(false);

  if (!inputAmount) {
    setSwapAmount("");
  }

  const handleTradeFor = async (
    trade: any | undefined | null
    // callBack: () => void
  ) => {
    try {
      if (!trade) return;
      // const blockchainAdapter = Injector.web3PublicService.getWeb3Public(trade.from.blockchain)
      // const gasPrice = await blockchainAdapter.getGasPrice()
      const isApproved = (await trade?.needApprove()) || false;
      if (
        !isApproved &&
        trade?.from.address !== "0x0000000000000000000000000000000000000000"
      ) {
        const tx = {
          onTransactionHash: () => {
            alert(`Approve transaction was sent.`);
          },
          // gasPrice,
        };
        const approveResult = await trade?.approve(tx);
      }
      const result = await trade?.swap({
        onConfirm: (hash: string) => {
          alert(`Swap transaction ${hash} was sent.`);
          // callBack();
        },
        // gasPrice,
      });
    } catch (err) {
      // callBack();
      alert(JSON.stringify(err));
    }
  };

  useEffect(() => {
    const onFromSelectHandler = function (Token: any) {
      // Token data sent will have following parameters:
      // id: '',// String id of database with token-master id.
      // contractAddress: '',// String token contract address
      // name: '',// String token name
      // symbol: '',// String token symbol
      // decimal: 0,// int Number of decimals in the token
      // chainId: '0',// String chain id of the token contract
      // order: 0,// int priority order of token visibility in list
      // isHidden: true, // bool to hide token from list
      // isFeaturedToken: true, // bool to mark a token is featured
      // balance: 0,// double balance of token holding for the wallet
      // possibleSpam: true,// bool value from backend via moralis
      // isDetected: false,// bool to mark if user got the token imported due to having balance.
      // infoChip: null,// to show a info for the token if any
      // onramperInfo: null,// buy token info
      // buyProvider: null,// enum to decide which vendor would process the buy order.

      const sourceToken: ITokenList = {
        chainId: Token?.chainId,
        address: Token?.contractAddress,
        name: Token?.name,
        symbol: Token?.symbol,
        decimals: Token?.decimal,
        logoURI: Token?.logo,
        balance: Token?.balance,
      };
      setSourceToken(sourceToken);
      // (window as any)?.flutter_inappwebview?.callHandler('handlerFoo')
      //   .then(function(result: ITokenList) {
      //     // print to the console the data coming
      //     // from the Flutter side.
      //     console.log(JSON.stringify(result));
      //     (window as any)?.flutter_inappwebview
      //       .callHandler('handlerFooWithArgs', 1, true, ['bar', 5], {foo: 'baz'}, result);
      // });
    };
    const onDestinationSelectHandler = function (Token: any) {
      const destinationToken: ITokenList = {
        chainId: Token?.chainId,
        address: Token?.contractAddress,
        name: Token?.name,
        symbol: Token?.symbol,
        decimals: Token?.decimal,
        logoURI: Token?.logo,
        balance: Token?.balance,
      };
      setDestinedToken(destinationToken);
    };
    window.addEventListener("fromTokenSelection", onFromSelectHandler);
    window.addEventListener("fromTokenSelection", onDestinationSelectHandler);
    return () => {
      window.removeEventListener("fromTokenSelection", onFromSelectHandler);
      window.removeEventListener(
        "fromTokenSelection",
        onDestinationSelectHandler
      );
    };
  }, []);

  console.log("Address is", account.address);

  useEffect(() => {
    window.addEventListener(
      "latestCurrencyData",
      (event: any) => {
        console.log("Data refreshed");
        console.log(JSON.stringify(event.detail));
        const fromTokenPrice = event.detail["fromTokenPrice"];
        const toTokenPrice = event.detail["toTokenPrice"];
        const fromNativeTokenPrice = event.detail["fromNativeTokenPrice"];
        const userCurrency = event.detail["userCurrency"];
        console.log('{ fromTokenPrice, toTokenPrice, fromNativeTokenPrice }', { fromTokenPrice, toTokenPrice, fromNativeTokenPrice })
        setFiatData({ fromTokenPrice, toTokenPrice, fromNativeTokenPrice, currencyInfo: userCurrency});
      },
      false
    );
  }, []);

  useAsyncEffect(async () => {
    const protocolFee = (
      bestTrade?.trade?.feeInfo?.rubicProxy?.fixedFee?.amount ?? 0
    ).toString();
    const isCrossChain = fromChain !== toChain
    const tradeMap = {
      crossChainSwap: isCrossChain,
      approvalRequired: await bestTrade?.trade?.needApprove(),
      swapData: {
        fromToken: inputAmount,
        toToken: swapAmount,
        gasFee: gasFees,
        protocolFee : protocolFee,
        priceImpact : bestTrade?.trade?.getTradeInfo().priceImpact,
        minimumToToken : bestTrade?.trade?.toTokenAmountMin,
        slippage : bestTrade?.trade?.getTradeInfo().slippage,
        time : '6',
      }
    }
      ;(window as any)?.flutter_inappwebview?.callHandler('previewTransactionData', tradeMap).then(function(result: any) {
            // print to the console the data coming
            // from the Flutter side.
            console.log(result)
      });
  }, [bestTrade]);

  useAsyncEffect(async () => {
    if (!account?.connector?.getProvider || !account.address) {
      console.log("Please connect", account?.connector?.getProvider);
      return;
    }
    // setLoading(true);
    try {
      const provider = await account.connector.getProvider();
      console.log("provider", provider);
      console.log(
        "Void",
        sdk?.updateWalletProviderCore(CHAIN_TYPE.EVM, {
          core: provider as any,
          address: account.address,
        })
      );
      // console.log("Value: ", value);
      setLoading(true);
    } finally {
      // setLoading(false);
    }
  }, [account, loading, setLoading]);


  useEffect(() => {
    if (
      sourceToken?.balance !== undefined &&
      Number(inputAmount) > sourceToken?.balance
    ) {
      setIsBalance(false);
    } else {
      setIsBalance(true);
    }
  }, [sourceToken, destinedToken, fromChain, toChain, inputAmount]);
  
  return (
    <SwapWrapperStyle>
      <SubContainerUp>
        <PayText />
        <Container />
      </SubContainerUp>
      <MiddleLine></MiddleLine>
      <SubContainerDown>
        <GetText></GetText>
        <DestinationContainer />
      </SubContainerDown>
      {/* <CalcButton /> */}
    </SwapWrapperStyle>
  );
};
