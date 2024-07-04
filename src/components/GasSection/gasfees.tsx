import {
  BLOCKCHAIN_NAME,
  CrossChainTrade,
  EvmCrossChainTrade,
  EvmOnChainTrade,
  OnChainTrade,
  Web3Pure,
} from "rubic-sdk";

export const gasFeesCalculation = (
  trade: CrossChainTrade | OnChainTrade
  // setGasFees: (amount: string) => void
) => {
  console.log("Inside gas Fees");
  let gasData = null;
  let gasPrice: any = null;
  if (trade instanceof EvmCrossChainTrade) {
    gasData = trade.gasData;

    if (
      trade.from.blockchain !== BLOCKCHAIN_NAME.ETHEREUM &&
      trade.from.blockchain !== BLOCKCHAIN_NAME.FANTOM
    ) {
      gasPrice = gasData?.gasPrice?.gt(0)
        ? Web3Pure.fromWei(gasData.gasPrice)
        : Web3Pure.fromWei(gasData?.maxFeePerGas || 0);
    } else {
      gasPrice = gasData?.gasPrice?.gt(0)
        ? gasData.gasPrice
        : Web3Pure.fromWei(gasData?.maxFeePerGas || 0);
    }
  } else if (trade instanceof EvmOnChainTrade) {
    gasData = trade.gasFeeInfo;
    gasPrice =
      gasData && gasData.gasPrice && gasData?.gasPrice.gt(0)
        ? gasData.gasPrice
        : gasData?.maxFeePerGas;
  }
  if (
    !gasData ||
    !gasData.gasLimit ||
    gasPrice === null ||
    gasPrice === undefined
  ) {
    return null;
  }
  const gasLimit = gasData?.gasLimit?.multipliedBy(gasPrice);
  // setGasFees(gasLimit.toString());
  console.log("gasLimit:", gasLimit);
  return gasLimit.toString();
};
