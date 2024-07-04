import { useEffect, useCallback, useContext } from "react";
import { Connector, useConnect, useDisconnect } from "wagmi";
import { getMobileOperatingSystem } from "../../utils/useragent";
import CurrencyContext from "../../context/currency";

const Header = () => {
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect()
  const { resetState } = useContext(CurrencyContext)
  const openBestWalletUrl = useCallback(
    (url: string, bestWalletConnectorUri: string) => {
      if (url) {
        // setTimeout(() => {
        //   window.open(bestWalletUrl + bestWalletConnectorUri)
        // })
        const now = new Date().valueOf();
        setTimeout(function () {
          if (new Date().valueOf() - now > 100) return;
          const linkElement = document.createElement("a");
          document.body.appendChild(linkElement);
          linkElement.style.visibility = "hidden";
          linkElement.href = url;
          if (getMobileOperatingSystem() === "android") {
            linkElement.target = "_blank";
          }
          linkElement.click();
          document.body.removeChild(linkElement);
        }, 50);
        (window as Window).location =
          process.env?.REACT_APP_BEST_WALLET_GENRIC_CONNECTOR +
          bestWalletConnectorUri;
      }
    },
    []
  );
  const connectWallet = () => {
    if (connectors.length > 0) {
      connectors.forEach((connector) => {
        connector.getProvider().then((provider: any) => {
          provider?.on("display_uri", (WalletUri: string) => {
            if(!process.env.REACT_APP_BEST_WALLET_BEST_DEX_CONNECTOR) return
            const url: string = `${process.env.REACT_APP_BEST_WALLET_BEST_DEX_CONNECTOR}${WalletUri}`
            ;(window as any)?.flutter_inappwebview?.callHandler('requestWalletSession', url).then(function(result: any) {
              
              // print to the console the data coming
              // from the Flutter side.
            });
          });
        });
      });
    }
    connect({ connector: connectors[0] });
  }
  useEffect(() => {
    connectWallet()
  }, [connectors]);

  useEffect(() => {
    const onDisconnectHandler = function () {
      console.log('disconnectWallet')
      disconnect({connector: connectors[0]}, { onSuccess: () => {
        connectWallet()
        resetState()
      }})
    };
    ;window.addEventListener("disconnectWallet", onDisconnectHandler);
    return () => {
      ;window.removeEventListener("disconnectWallet", onDisconnectHandler);
    }
  },[disconnect])
  return <></>;
};

export default Header;
