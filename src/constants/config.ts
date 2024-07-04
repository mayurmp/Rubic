import { http, createConfig } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors'


const projectId = 'b9d84930ea1c28fe169a1d4cd3775f92'
// @ts-ignore
export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [
    // injected(),
    walletConnect({ projectId, showQrModal: false}),
    // metaMask(),
    // safe(),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})