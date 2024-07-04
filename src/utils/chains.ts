import { BLOCKCHAIN_NAME } from "rubic-sdk";
export const getChainSymbol = (chain: string) => {
    switch (chain) {
        case '1':
           return BLOCKCHAIN_NAME.ETHEREUM
        case '56':
           return BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN
        case "137":
            return BLOCKCHAIN_NAME.POLYGON
        case "11155111":
            return BLOCKCHAIN_NAME.SEPOLIA
      }
} 