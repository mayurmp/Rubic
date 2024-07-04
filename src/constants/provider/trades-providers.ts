import { TradeProvider } from '../../models/trade-provider';
import { ProviderInfo } from '../../models/provider-info';
import { ON_CHAIN_PROVIDERS } from '../../constants/provider/on-chain-providers';
import { BRIDGE_PROVIDERS } from '../../constants/provider/bridge-providers';

export const TRADES_PROVIDERS: Record<TradeProvider, ProviderInfo> = {
  ...ON_CHAIN_PROVIDERS,
  ...BRIDGE_PROVIDERS
};
