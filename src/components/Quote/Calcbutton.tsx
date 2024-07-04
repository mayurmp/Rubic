import { useContext, useEffect, useState } from "react";
import {
  BLOCKCHAIN_NAME,
  CrossChainTrade,
  EvmCrossChainTrade,
  Web3Pure,
} from "rubic-sdk";
import RubicSDKContext from "../../context/rubicSdk";
import { dividerClasses } from "@mui/joy";
import BigNumber from "bignumber.js";

export const CalcButton = () => {
  const [value, setValue] = useState<any>(0);
  const [tradeVal, setTradeVal] = useState<any>(0);
  const [quoteVal, setQuoteVal] = useState<any>(0);

  const [showComp, setShowComp] = useState<boolean>(false);
  const sdk = useContext(RubicSDKContext);
  // const [inputAmount] = useContext(CurrencyContext);
  //   const [calculationResult, setCalculationResult] = useState(null);
  const fromToken: any = {
    blockchain: BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN,
    address: "0x0000000000000000000000000000000000000000",
  };
  // const fromAmount: any = 0.001;
  const toToken: any = {
    blockchain: BLOCKCHAIN_NAME.POLYGON,
    address: "0x0000000000000000000000000000000000000000",
  };

  const formatBigNumber = (amount: any) => {
    // Replace this with your actual formatting logic using BigNumber
    // For example:
    return new BigNumber(amount).toFormat();
  };

  const shortenAmount = (amount: string, maxLength: number) => {
    // Replace this with your actual shorten logic
    // For example:
    const strAmount = String(amount);
    return strAmount.length > maxLength
      ? strAmount.substring(0, maxLength) + "..."
      : strAmount;
  };

  const CalculateFee = (amount: any) => {
    const formattedAmount = formatBigNumber(amount);
    const shortenedAmount = shortenAmount(formattedAmount, 8);

  };

  const handleClick = async () => {
    if (sdk) {
      try {
        let gasData: any = null;
        let gasPrice = null;
        const wrappedTrades = await sdk.crossChainManager.calculateTrade(
          { blockchain: fromToken.blockchain, address: fromToken.address },
          String(value),
          { blockchain: toToken.blockchain, address: toToken.address }
        );
        const bestTrade = wrappedTrades[1];

        const protocol_fee =
          bestTrade.trade?.feeInfo.rubicProxy?.fixedFee?.amount;

        CalculateFee(protocol_fee);

        const trade: CrossChainTrade | EvmCrossChainTrade | null =
          bestTrade.trade;
        if (trade instanceof EvmCrossChainTrade) {
        }
        if (trade) {
          if (
            trade.from.blockchain !== BLOCKCHAIN_NAME.ETHEREUM &&
            trade.from.blockchain !== BLOCKCHAIN_NAME.FANTOM
          ) {
            gasPrice =
              gasData?.gasPrice > 0
                ? Web3Pure.fromWei(gasData.gasPrice)
                : Web3Pure.fromWei(gasData?.maxFeePerGas || 0);
          } else {
            gasPrice =
              gasData?.gasPrice > 0
                ? gasData.gasPrice
                : Web3Pure.fromWei(gasData?.maxFeePerGas || 0);
          }
          const gasLimit = gasData?.gasLimit * gasPrice;
        }

        const swapValue = bestTrade.trade?.to.tokenAmount;
        setTradeVal(bestTrade.trade?.to.tokenAmount.toFixed(3));
        setShowComp(true);
        // quoteConversion(value, tradeVal);
      } catch (err) {
      }
    }
  };

  useEffect(() => {
    quoteConversion(value, tradeVal);
  }, [tradeVal]);

  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  const quoteConversion = (value: number, tradeVal: number) => {
    setQuoteVal((tradeVal / value).toFixed(3));
  };
  return (
    <div>
      <button onClick={handleClick}>Calculate</button>
      <input type="text" onChange={handleChange} />
      <input type="text" value={tradeVal} />
      {/* {calculationResult && <p>Calculation result: {calculationResult}</p>} */}
      {showComp && <div> 1 BNB = {quoteVal} MATIC</div>}
    </div>
  );
};
