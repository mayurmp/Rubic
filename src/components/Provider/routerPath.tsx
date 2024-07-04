import { useContext, useEffect, useState } from "react";
import CurrencyContext from "../../context/currency";
import { StepRoute } from "./routes";
import { RouterPathContainer } from "./index.styled";
import { EvmCrossChainTrade, RubicStep } from "rubic-sdk";

export const RouterPath = () => {
  const {
    fromChain,
    inputAmount,
    toChain,
    swapAmount,
    bestTrade,
    sourceToken,
    destinedToken,
  } = useContext(CurrencyContext);
  const [routemap, setRoutemap] = useState<string>();

  useEffect(() => {
    if (bestTrade?.trade instanceof EvmCrossChainTrade) {
      setRoutemap("cross chain");
    } else {
      setRoutemap("on chain");
    }
  }, [setRoutemap, bestTrade, routemap]);

  class CrossChainTrade {
    protected readonly routePath: RubicStep[];

    constructor(routePath: RubicStep[]) {
      this.routePath = routePath;
    }

    // Method to access routePath
    public getRoutePath(): RubicStep[] {
      return this.routePath;
    }
  }

  function isCrossChainTrade(trade: any): trade is CrossChainTrade {
    return trade instanceof EvmCrossChainTrade;
  }

  return (
    <RouterPathContainer width={329}>
      <StepRoute token={sourceToken} amount={inputAmount} chain={fromChain} />
      {routemap === "cross chain" &&
        isCrossChainTrade(bestTrade?.trade) &&
        bestTrade?.trade
          ?.getTradeInfo()
          .routePath?.map((route: RubicStep, index: number) => {
            return (
              <>
                <StepRoute key={index} route={route} />
              </>
            );
          })}
      {routemap === "on chain" && <StepRoute trade={bestTrade} />}
      <StepRoute token={destinedToken} amount={swapAmount} chain={toChain} />
    </RouterPathContainer>
  );
};
