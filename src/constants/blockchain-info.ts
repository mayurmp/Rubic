import { BLOCKCHAIN_NAME } from "rubic-sdk";

interface BlockchainInfoItem {
  id: number;
  nativeToken: string;
  name: string;
  logoURI: string;
  balance: number;
}
interface BlockchainInfo {
  [key: string]: BlockchainInfoItem;
}

export const BlockchainInfo: BlockchainInfo = {
  [BLOCKCHAIN_NAME.ETHEREUM]: {
    id: 1,
    name: "Ethereum",
    nativeToken: "ETH",
    logoURI:
      "https://w7.pngwing.com/pngs/268/1013/png-transparent-ethereum-eth-hd-logo-thumbnail.png",
    balance: 1.24,
  },
  [BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN]: {
    id: 56,
    name: "Binance",
    nativeToken: "BNB",
    logoURI:
      "https://w7.pngwing.com/pngs/703/998/png-transparent-binance-binancecoin-blockchain-coin-blockchain-classic-icon-thumbnail.png",
    balance: 2.25,
  },
  [BLOCKCHAIN_NAME.POLYGON]: {
    id: 137,
    name: "Polygon",
    nativeToken: "MATIC",
    logoURI: "https://cryptologos.cc/logos/polygon-matic-logo.png",
    balance: 3.0,
  },
};
