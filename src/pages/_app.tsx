import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Web3Context } from "config/Web3Context";
import Web3 from "web3";
import { WagmiProvider } from "wagmi";
import "@rainbow-me/rainbowkit/styles.css";

import {
  ConnectButton,
  getDefaultConfig,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { arbitrum } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const config = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: "8c3fa0027e9be7e3081fc6321e210c05",
  chains: [arbitrum],
  ssr: true,
});
const queryClient = new QueryClient();
export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <Web3Context.Provider value={Web3}>
        <Component {...pageProps} />
      </Web3Context.Provider>
    </WagmiProvider>
  );
}
