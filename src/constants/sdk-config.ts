import { BLOCKCHAIN_NAME, Configuration } from "rubic-sdk";

export const configuration: Configuration = {
  rpcProviders: {
    [BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN]: {
      rpcList: [
        "https://icy-shy-violet.bsc.quiknode.pro/e8951961034e14e936ab8745c7f351656e51f9ac/",
        "https://rpc.ankr.com/bsc",
      ],
      // mainRpcTimeout: 8000
    },
    [BLOCKCHAIN_NAME.POLYGON]: {
      rpcList: [
        "https://omniscient-ancient-bush.matic.quiknode.pro/0d13b4dd5d84c3062fb64ec87602922f18e2c59c/",
        "https://polygon.llamarpc.com",
      ],
      // mainRpcTimeout: 8000
    },
    [BLOCKCHAIN_NAME.ETHEREUM]: {
      rpcList: [
        "https://rpc.ankr.com/eth/cdb5678d9797006c10fa86c3ea17d7f3f1ead96554d393fa427112462e891eca",
        "https://go.getblock.io/1830a5cccc564b28902ba9bbccfadf14",
        "https://eth.llamarpc.com",
        "https://rpc.ankr.com/eth",
      ],
    },
  },
};
