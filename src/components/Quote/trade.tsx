import {
  SDK,
  WrappedCrossChainTrade,
  WrappedOnChainTradeOrNull,
} from "rubic-sdk";
import { tokenDetails } from "../Input/fromAmount";
import { Itrade } from "../../context/currency";

function filterProvidersWithGasData(trades: WrappedCrossChainTrade[]): any {
  try {
    return trades.filter(
      (tradeEntry: any) => tradeEntry?.trade?.gasData !== null
    );
  } catch (err) {
    console.log(err);
  }
}

const filterWarnProviders = (
  trades: WrappedCrossChainTrade[] | WrappedOnChainTradeOrNull[]
) => {
  try {
    return trades.filter((tradeEntry: any) => tradeEntry.error === undefined);
  } catch (err) {
    console.log(err);
  }
};

function filterProvidersWithGasFeeInfo(
  trades: WrappedOnChainTradeOrNull[]
): any {
  try {
    console.log("AllTrades:", trades);
    return trades.filter(
      (tradeEntry: any) => tradeEntry?.trade?.gasFeeInfo !== null
    );
  } catch (err) {
    console.log(err);
  }
}

const findBestTrade = (
  allTrades: WrappedOnChainTradeOrNull[] | WrappedCrossChainTrade[],
  type: string
) => {
  try {
    console.log("All Trades:", allTrades);

    const warnFreeProviders: any = filterWarnProviders(allTrades);
    console.log("Warn Free AllTrades:", warnFreeProviders);

    if (warnFreeProviders.length == 0) {
      throw Error("Swap Not Feasible : No Routes Available");
    }

    // return warnFreeProviders[0];

    const filteredGasTrades =
      type === "on-chain"
        ? filterProvidersWithGasFeeInfo(
            warnFreeProviders as WrappedOnChainTradeOrNull[]
          )
        : filterProvidersWithGasData(
            warnFreeProviders as WrappedCrossChainTrade[]
          );

    console.log("Providers with gas fees:", filteredGasTrades);

    if (filteredGasTrades.length == 0) {
      return warnFreeProviders[0];
    }

    return filteredGasTrades[0];
  } catch (err) {
    console.log(err);
  }
};

export const tradeCalculation = async (
  fromToken: tokenDetails,
  toToken: tokenDetails,
  amount: string | undefined,
  sdk: SDK | null,
  fromChain: string | undefined,
  toChain: string | undefined,
) => {
  if (sdk) {
    try {
      if (
        fromToken.blockchain !== undefined &&
        fromToken.address !== undefined &&
        toToken.address !== undefined
      ) {
        if (fromChain === toChain) {
          const wrappedTrades = await sdk.onChainManager.calculateTrade(
            { blockchain: fromToken?.blockchain, address: fromToken.address },
            String(amount),
            toToken?.address
          );
          const bestTrade = findBestTrade(wrappedTrades, "on-chain");
          console.log("On-Chain BestTrade", wrappedTrades);
          // setBestTrade(bestTrade);
          // return bestTrade?.trade?.to.tokenAmount.toFormat(8);
          return bestTrade;
        }
      }
      if (
        fromToken.blockchain !== undefined &&
        fromToken.address !== undefined &&
        toToken.address !== undefined &&
        toToken?.blockchain !== undefined
      ) {
        const param = [{ blockchain: fromToken?.blockchain, address: fromToken?.address },
        String(amount),
        { blockchain: toToken?.blockchain, address: toToken?.address }]
        console.log('tradeData before trade', JSON.stringify(param))
        const wrappedTrades = await sdk.crossChainManager.calculateTrade(
          { blockchain: fromToken?.blockchain, address: fromToken?.address },
          String(amount),
          { blockchain: toToken?.blockchain, address: toToken?.address }
        );
        console.log(" Cross-Chain BestTrade", wrappedTrades);
        const bestTrade = findBestTrade(wrappedTrades, "cross-chain");
        console.log(" Cross-Chain BestTrade", bestTrade.trade);
        // setBestTrade(bestTrade);
        // return bestTrade?.trade?.to.tokenAmount.toFormat(8);
        return bestTrade
      }
    } catch (err) {
      console.log(err);

      // Call JS method channel to open error model in Application
    }
  }
};
