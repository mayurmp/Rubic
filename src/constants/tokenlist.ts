export interface ITokenList {
  chainId: number;
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  logoURI: string;
  balance: number;
  isNative?: boolean
}

export const tokensList = [
  {
    chainId: 1,
    address: "0x0000000000000000000000000000000000000000",
    name: "Ethereum",
    symbol: "ETH",
    decimals: 18,
    logoURI: "https://bscscan.com/token/images/ethereum_32.png",
    balance: 0.000843274299729479894389478937,
  },
  {
    chainId: 1,
    address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    name: "WETH",
    symbol: "WETH",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/2518/thumb/weth.png?1696503332",
    balance: 0,
  },
  {
    chainId: 1,
    address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    name: "USDC",
    symbol: "USDC",
    decimals: 6,
    logoURI:
      "https://assets.coingecko.com/coins/images/6319/thumb/usdc.png?1696506694",
    balance: 1.5,
  },
  {
    chainId: 1,
    address: "0x6b175474e89094c44da98b954eedeac495271d0f",
    name: "Dai",
    symbol: "DAI",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/9956/thumb/Badge_Dai.png?1696509996",
    balance: 3.7,
  },
  {
    chainId: 1,
    address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
    name: "Tether",
    symbol: "USDT",
    decimals: 6,
    logoURI:
      "https://assets.coingecko.com/coins/images/325/thumb/Tether.png?1696501661",
    balance: 4.2,
  },
  {
    name: "BNB Token",
    symbol: "BNB",
    address: "0x0000000000000000000000000000000000000000",
    chainId: 56,
    decimals: 18,
    logoURI: "https://polygonscan.com/token/images/bnb_28_2.png",
    balance: 1,
  },
  {
    name: "WBNB Token",
    symbol: "WBNB",
    address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    chainId: 56,
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/12591/thumb/binance-coin-logo.png?1696512401",
    balance: 0.8,
  },
  {
    chainId: 56,
    address: "0x43bee29430a2dda4bc053dd5669a56efd6e0556a",
    name: "DogeZilla Ai",
    symbol: "DAI",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/29352/thumb/Dogezila_ai_logo.PNG?1696528300",
    balance: 1.3,
  },
  {
    chainId: 56,
    address: "0x4db5a66e937a9f4473fa95b1caf1d1e1d62e29ea",
    name: "Ethereum  Wormhole ",
    symbol: "ETH",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/22990/thumb/ETH_wh_small.png?1696522286",
    balance: 5.5,
  },
  {
    name: "Binance Pegged USD Coin",
    symbol: "USDC",
    address: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
    chainId: 56,
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/35220/thumb/USDC.jpg?1707919050",
    balance: 2.9,
  },
  {
    name: "Uniswap",
    symbol: "UNI",
    address: "0xBf5140A22578168FD562DCcF235E5D43A02ce9B1",
    chainId: 56,
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/12504/thumb/uni.jpg?1696512319",
    balance: 7.1,
  },
  {
    chainId: 137,
    address: "0x0000000000000000000000000000000000000000",
    name: "Matic Token",
    symbol: "MATIC",
    decimals: 18,
    logoURI: "https://assets.polygon.technology/tokenAssets/matic.svg",
    balance: 12.2,
  },
  {
    chainId: 137,
    address: "0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
    name: "Dai - PoS",
    symbol: "DAI",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/9956/thumb/Badge_Dai.png?1696509996",
    balance: 6.8,
  },
  {
    chainId: 137,
    address: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
    name: "USD Coin",
    symbol: "USDC",
    decimals: 6,
    logoURI: "https://polygonscan.com/token/images/usdc_32.png",
    balance: 5.000843274299729479894389478937,
  },
  {
    chainId: 137,
    name: "Wrapped BTC",
    symbol: "WBTC",
    decimals: 8,
    address: "0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
    logoURI: "https://polygonscan.com/token/images/wBTC_32.png",
    balance: 3.3,
  },
  {
    chainId: 137,
    address: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
    name: "Tether USD",
    symbol: "USDT",
    decimals: 6,
    logoURI: "https://polygonscan.com/token/images/tether_32.png",
    balance: 8.9,
  },
];
