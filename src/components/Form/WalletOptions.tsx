import * as React from "react";
import { Connector, useConnect } from "wagmi";

export function WalletOptions() {
  const { connectors, connect } = useConnect();

  return (
    <div>
      {connectors.map((connector) => {
        connector.getProvider().then((provider: any) => {
          provider?.on("display_uri", (uri: string) => {
            console.log(uri)
          });
        });
        return (
          <button key={connector.uid} onClick={() => connect({ connector })}>
            {connector.name}
          </button>
        );
      })}
    </div>
  );
}
