import "../styles/globals.css";
import type { AppProps } from "next/app";

import { WagmiConfig, createClient, chain } from "wagmi";
import { ConnectKitProvider, getDefaultClient } from "connectkit";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const alchemyId = process.env.ALCHEMY_ID;

const chains = [
  chain.polygon,
];

const client = createClient(
  getDefaultClient({
    appName: "ConsenseBank",
    alchemyId,
    chains,
  })
);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider>
        <Component {...pageProps} />
        <ToastContainer />
        <div id="app-modal-root" />
      </ConnectKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
