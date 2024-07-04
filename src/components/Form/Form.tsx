import {
  BLOCKCHAIN_NAME,
  BlockchainName,
  CHAIN_TYPE,
  CrossChainTrade,
  OnChainTrade,
  SDK,
  LifiTrade,
  AlgebraTrade,
  OpenOceanTrade,
} from "rubic-sdk";
import React, { useContext, useEffect, useState } from "react";
import TokenSelector from "./TokenSelector";
import AmountInput from "./AmountInput";
import BlockchainSelector from "./BlockchainSelector";
import styles from "./Form.module.scss";
import { tokens } from "../../constants/tokens";
import CalculateBlock from "./CalculateBlock";
import useAsyncEffect from "use-async-effect";
import { configuration } from "../../constants/sdk-config";
import LoginBlock from "./LoginBlock";
import Box from "@mui/joy/Box";
import SwapBlock from "./SwapBlock";
import { Grid } from "@mui/joy";
import TradeCard from "./Card";
import { useAccount } from "wagmi";
import RubicSDKContext from "../../context/rubicSdk";

export interface FormProps {}

const Form = ({}: FormProps) => {
  const [amount, setAmount] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState<string | null>(null);
  const [possibleTrade, setPossibleTrade] = useState<any | null>(null);
  const account = useAccount();
  const sdk = useContext(RubicSDKContext);
  const [fromBlockchain, setFromBlockchain] = useState<BlockchainName>(
    BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN
  );
  const [toBlockchain, setToBlockchain] = useState<BlockchainName>(
    BLOCKCHAIN_NAME.POLYGON
  );

  const [fromFilteredTokens, setFromFilteredTokens] = useState<any>(
    tokens.filter((el) => el.blockchain === fromBlockchain)
  );
  const [toFilteredTokens, setToFilteredTokens] = useState<any>(
    tokens.filter((el) => el.blockchain === toBlockchain)
  );

  const [fromToken, setFromToken] = useState<any | null>(fromFilteredTokens[0]);
  const [toToken, setToToken] = useState<any | null>(toFilteredTokens[0]);

  // const [sdk, setSdk] = useState<SDK | null>(null);

  const enterFrom = (address: string) => {
    const token = tokens.find(
      (el) => el.address === address && el.blockchain === fromBlockchain
    );
    setFromToken(token);
  };

  const enterTo = (address: any) => {
    const token = tokens.find(
      (el) => el.address === address && el.blockchain === toBlockchain
    );
    setToToken(token);
  };

  const enterAmount = (el: any) => {
    const amount = el?.target?.value;
    setAmount(amount);
  };

  const onLogin = (address: string | null) => {
    setAddress(address);
  };

  const selectFromBlockchain = (el: any) => {
    setFromBlockchain(el);
  };

  const selectToBlockchain = (el: any) => {
    setToBlockchain(el);
  };

  const setTradeData = async () => {
    if (sdk) {
      setLoading(true);
      setPossibleTrade([]);
      try {
        if (fromBlockchain === toBlockchain) {
          const wrappedTrades = await sdk.onChainManager.calculateTrade(
            fromToken,
            String(amount),
            toToken
          );
          setPossibleTrade(wrappedTrades);
          // const bestTrade = wrappedTrades.filter(el =>  !(el instanceof LifiTrade) && !(el instanceof AlgebraTrade) && !(el instanceof OpenOceanTrade) && !('error' in el))[0];
          // if (bestTrade instanceof OnChainTrade) {
          //     setTrade(bestTrade as OnChainTrade);
          // }
        } else {
          const wrappedTrades = await sdk.crossChainManager.calculateTrade(
            fromToken,
            String(amount),
            toToken
          );
          setPossibleTrade(wrappedTrades);
          const bestTrade = wrappedTrades[0];
          setTrade(bestTrade.trade);
        }
      } finally {
        setLoading(false);
      }
    }
  };
  const handleTradeFor = async (
    trade: any | undefined | null,
    callBack: () => void
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
          callBack();
        },
        // gasPrice,
      });
    } catch (err) {
      callBack();
      alert(JSON.stringify(err));
    }
  };
  const [trade, setTrade] = useState<CrossChainTrade | OnChainTrade | null>(
    null
  );

  useEffect(() => {
    const filteredTokens = tokens.filter(
      (el) => el.blockchain === fromBlockchain
    );
    setFromFilteredTokens(filteredTokens);
    setFromToken(filteredTokens[0]);
  }, [fromBlockchain]);

  useEffect(() => {
    const filteredTokens = tokens.filter(
      (el) => el.blockchain === toBlockchain
    );
    setToFilteredTokens(filteredTokens);
    setToToken(filteredTokens[0]);
  }, [toBlockchain]);

  useAsyncEffect(async () => {
    // setSdk(await SDK.createSDK(configuration));
    setLoading(false);
  }, []);

  // useAsyncEffect(async () => {
  //     setLoading(true);
  //     try {
  //         await sdk?.updateConfiguration({
  //             ...configuration,
  //             walletProvider: address ? {
  //                 [CHAIN_TYPE.EVM]: {
  //                     core: window.ethereum,
  //                     address
  //                 }
  //             } : undefined,
  //         });
  //     } finally {
  //         setLoading(false);
  //     }
  // }, [address])

  // useAsyncEffect(async () => {
  //     if(!account?.connector?.getProvider || !account.address) return
  //     // setLoading(true);
  //     try {
  //         const provider =  await account.connector.getProvider()
  //         await sdk?.updateConfiguration({
  //             ...configuration,
  //             walletProvider: address ? {
  //                 [CHAIN_TYPE.EVM]: {
  //                     core: (provider as any),
  //                     address: account.address
  //                 }
  //             } : undefined,
  //         });
  //     } finally {
  //         // setLoading(false);
  //     }
  // }, [account])

  useAsyncEffect(async () => {
    if (!account?.connector?.getProvider || !account.address) return;
    // setLoading(true);
    try {
      const provider = await account.connector.getProvider();
      await sdk?.updateWalletProviderCore(CHAIN_TYPE.EVM, {
        core: provider as any,
        address: account.address,
      });
    } finally {
      // setLoading(false);
    }
  }, [account]);

  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ width: 400 }}>
        <form className={styles.form}>
          <LoginBlock onLogin={onLogin} address={address} />
          <div className={styles.formBlock}>
            <BlockchainSelector
              type="from"
              value={fromBlockchain}
              onSelectBlockchain={selectFromBlockchain}
              loading={loading}
            />
            {fromFilteredTokens.length ? (
              <TokenSelector
                tokens={fromFilteredTokens}
                type={"from"}
                onChange={enterFrom}
                loading={loading}
              />
            ) : null}
          </div>
          <div className={styles.formBlock}>
            <BlockchainSelector
              type="to"
              value={toBlockchain}
              onSelectBlockchain={selectToBlockchain}
              loading={loading}
            />
            {toFilteredTokens.length ? (
              <TokenSelector
                tokens={toFilteredTokens}
                type={"to"}
                onChange={enterTo}
                loading={loading}
              />
            ) : null}
          </div>

          <AmountInput
            value={amount}
            onChange={enterAmount}
            loading={loading}
          />

          <CalculateBlock
            amount={amount}
            fromToken={fromToken}
            toToken={toToken}
            onCalculate={setTradeData}
            trade={trade}
            loading={loading}
          />

          <SwapBlock
            trade={trade}
            loading={loading}
            address={address}
            onLoadingChange={setLoading}
          />
        </form>
      </Box>
      <Box sx={{ width: 400 }}>
        <Grid container spacing={2}>
          {possibleTrade &&
            possibleTrade.map((trade: any, index: number) => {
              if (trade?.trade) {
                return (
                  <Grid xs={12}>
                    <TradeCard
                      handleTrade={(callBack) =>
                        handleTradeFor(trade?.trade, callBack)
                      }
                      type={trade?.trade?.type ?? ""}
                      outputAmount={
                        trade?.trade?.to?.tokenAmount?.toNumber().toFixed(4) ??
                        0
                      }
                      outputSymbol={trade?.trade?.to?.symbol ?? 0}
                      protocolFee={
                        trade?.trade?.platformFee?.toNumber().toFixed(2) ?? 0
                      }
                      key={index}
                    ></TradeCard>
                  </Grid>
                );
              } else {
                return null;
              }
            })}
        </Grid>
      </Box>
    </Box>
  );
};

export default Form;
