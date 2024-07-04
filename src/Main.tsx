import React, { FC, useEffect } from "react";
import "./main.scss";
import { CssVarsProvider } from "@mui/joy/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { config } from "./constants/config";
import { WalletOptions } from "./components/Form/WalletOptions";
import { Swap } from "./pages/swap";
import { RubicContextProvider } from "./context/rubicSdk";
import { bootstrapTheme } from "./theme/theme";
import Header from "./components/Header";
import { CurrencyContextProvider } from "./context/currency";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Swap/>,
  },
]);

const queryClient = new QueryClient();

export const Main: FC = () => {
  return (
    <CssVarsProvider theme={bootstrapTheme}>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RubicContextProvider>
            <CurrencyContextProvider>
              <>
                <Header></Header>
                {/* <WalletOptions></WalletOptions> */}
                <RouterProvider router={router} />
              </>
            </CurrencyContextProvider>
          </RubicContextProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </CssVarsProvider>
  );
};
