import React, { useContext, useEffect, useState } from "react";
import CurrencyContext, { CurrencyContextData } from "../../context/currency";
import { tradeCalculation } from "../Quote/trade";
import RubicSDKContext from "../../context/rubicSdk";
import { InputArea, SubInputComponet } from "./amount.styled";
import { sendToMethodChannel } from "../../utils/methodChannel";
import { BlockchainName } from "rubic-sdk";

interface prop {
  // handleInput: (e: unknown) => void;
  // inputAmount: number | undefined;
  calcTradeVal: (val: number) => void;
}

// ---------------------CODE FOR DEBOUNCING -----------------------------------
// const useDebouncedValue = (inputValue: any, delay: number) => {
//   const [debouncedValue, setDebouncedValue] = useState(inputValue);

//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedValue(inputValue);
//       // setSwapTrade(inputValue);
//     }, delay);

//     return () => {
//       clearTimeout(handler);
//     };
//   }, [inputValue, delay]);

//   return debouncedValue;
// };

export interface tokenDetails {
  blockchain: BlockchainName | undefined;
  address: string | undefined;
}

export const FromInput = () => {
  const {
    inputAmount,
    setInputAmount,
    swapTrade,
    setSwapTrade,
    inProgress,
    setInProgress,
    sourceToken,
    destinedToken,
    swapAmount,
    isBalance,
    setSwapAmount,
    fromChain,
    toChain,
    setIsBalance,
    setBestTrade,
  } = useContext(CurrencyContext);
  const sdk = useContext(RubicSDKContext);
  const [val, setVal] = useState<any>();

  const fromToken: tokenDetails = {
    blockchain: fromChain,
    address: sourceToken?.address,
  };
  const toToken: tokenDetails = {
    blockchain: toChain,
    address: destinedToken?.address,
  };

  // const debounce = (func: Function, delay: number) => {
  //   let context = this;
  //   let timeoutId: NodeJS.Timeout;
  //   return function (...args: any[]) {
  //     clearTimeout(timeoutId);
  //     timeoutId = setTimeout(() => func.apply(context, args), delay);
  //   };
  // };

  // const debouncedHandleChange = debounce((value: string) => {
  //   // setInputAmount(value);
  //   setVal(value);
  // }, 500);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // If the value starts with multiple zeros, keep only one zero
    if (/^0{2,}/.test(value)) {
      value = value.replace(/^0+/, "0");
    }
    setVal(value);
    setInputAmount(value);
    if (sourceToken && sourceToken.balance !== undefined) {
      // return sourceToken.balance;
      if (value >= String(sourceToken.balance)) {
        setIsBalance(false);
      } else {
        setIsBalance(true);
      }
    }
    // debouncedHandleChange(value);
  };

  useEffect(() => {
    let intervalCall: any = null;
    let timeoutId: NodeJS.Timeout;
    const delay = 500; // Adjust delay as needed

    const calculateTrade = () => {
      setInProgress(true);
      tradeCalculation(
        fromToken,
        toToken,
        inputAmount,
        sdk,
        fromChain,
        toChain
      ).then((result) => {
        if (result) {
          setSwapAmount(result.trade?.to.tokenAmount.toFormat(8));
          setBestTrade(result);
          setInProgress(false);
          sendToMethodChannel(result);
        }
      });
    };

    // Initial call
    timeoutId = setTimeout(() => {
      if (inputAmount && sourceToken && destinedToken) {
        calculateTrade();
      }
    }, delay);

    // Set up setInterval for subsequent calls
    intervalCall = setInterval(() => {
      if (inputAmount && sourceToken && destinedToken) {
        calculateTrade();
      }
    }, 30000);

    // Clean up clearInterval
    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalCall);
    };
  }, [inputAmount, sourceToken, destinedToken]);

  return (
    <>
      <SubInputComponet inputAmountExceedsBalance={!isBalance}>
        <InputArea
          // variant="outlined"
          type="number"
          placeholder="Enter Amount"
          onChange={handleChange}
          // readOnly={!sourceToken || !destinedToken}
          value={inputAmount}
          style={{
            textAlign: "right",
          }}
        ></InputArea>
      </SubInputComponet>
    </>
  );
};
