import React, { useContext, useEffect, useState } from "react";
import CurrencyContext, { IFiatData } from "../context/currency";
import { BLOCKCHAIN_NAME } from "rubic-sdk";
import { ITokenList, tokensList } from "../constants/tokenlist";
import {
  All,
  AllText,
  AvailableChain,
  AvailableChainText,
  Chain,
  ChainContainer,
  ChainLogo,
  ChainName,
  Chainmap,
  CurrencyItem,
  CurrencyMap,
  PopUpHeaderMain,
  PopupContain,
  SelectTokenText,
  Selector,
  SubAvailableChainText,
  SubPopupContain,
  SubPopupHeader,
  SubTokenLogo,
  Token,
  TokenLogo,
  TokenText,
  ViewAll,
  ViewAllText,
} from "./popUp.styled";

interface PopUpHeader {
  closeModal: () => void;
  tokentype: string;
}

export const PopUpHeader = ({ closeModal, tokentype }: PopUpHeader) => {
  const currencies = ["ETH", "MATIC", "BNB"];
  const chains = ["Ethereum", "Polygon", "Binance", "Sepholia"];
  const [selected, setSelected] = useState<string>("");
  const {
    setSourceToken,
    setDestinedToken,
    setFromChain,
    setToChain,
    fiatData,
    setFiatData,
    setWalletBalance,
  } = useContext(CurrencyContext);
  const [mapTokens, setMapToken] = useState<ITokenList[]>();

  const handleClick = (currency: ITokenList) => {
    if (tokentype === "source") {
      setSourceToken(currency);

      // -----Testing Purpose (start)------

      // setFiatData({
      //   ...fiatData!,
      //   fromTokenPrice: "340",
      //   fromNativeTokenPrice: "500",
      // });
      // setWalletBalance("0.678543");

      // -----Testing Purpose (end)------
    } else {
      // -----Testing Purpose (start)------

      // const fiatValues: IFiatData = {
      //   ...fiatData!,
      //   toTokenPrice: "250",
      // };
      // setFiatData(fiatValues);

      // -----Testing Purpose (end)------
      setDestinedToken(currency);
    }
    closeModal();
  };

  const handleChain = (chain: string) => {
    let token: ITokenList[] = [];
    switch (chain) {
      case "Ethereum":
        token = tokensList.filter((ele) => ele.chainId == 1);
        tokentype === "source"
          ? setFromChain(BLOCKCHAIN_NAME.ETHEREUM)
          : setToChain(BLOCKCHAIN_NAME.ETHEREUM);
        break;
      case "Polygon":
        token = tokensList.filter((ele) => ele.chainId == 137);
        tokentype === "source"
          ? setFromChain(BLOCKCHAIN_NAME.POLYGON)
          : setToChain(BLOCKCHAIN_NAME.POLYGON);
        break;
      case "Binance":
        token = tokensList.filter((ele) => ele.chainId == 56);
        tokentype === "source"
          ? setFromChain(BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN)
          : setToChain(BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN);
        break;
      case "Sepholia":
        tokentype === "source"
          ? setFromChain(BLOCKCHAIN_NAME.SEPOLIA)
          : setToChain(BLOCKCHAIN_NAME.SEPOLIA);
        break;
    }
    setMapToken(token);
    setSelected(chain); // Update the selected chain
  };
  const setTokenList = (isChain: string) => {};
  return (
    <PopUpHeaderMain>
      <SubPopupHeader />
      <SelectTokenText>Select Token</SelectTokenText>
      <PopupContain>
        <SubPopupContain>
          <AvailableChain>
            <AvailableChainText>
              <SubAvailableChainText>Available Chain</SubAvailableChainText>
            </AvailableChainText>
            <ViewAll>
              <ViewAllText>View All</ViewAllText>
            </ViewAll>
          </AvailableChain>
          <Selector>
            <All>
              <AllText>All</AllText>
            </All>
            <Token>
              <TokenLogo>
                <SubTokenLogo>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="Group">
                      <path
                        id="Vector"
                        d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
                        fill="#627EEA"
                      />
                      <g id="Group 22070">
                        <path
                          id="Vector_2"
                          d="M11.9453 3V9.6525L17.5681 12.165L11.9453 3Z"
                          fill="white"
                          fill-opacity="0.602"
                        />
                        <path
                          id="Vector_3"
                          d="M11.9516 3L6.32812 12.165L11.9516 9.6525V3Z"
                          fill="white"
                        />
                        <path
                          id="Vector_4"
                          d="M11.9453 16.476V20.9963L17.5718 13.212L11.9453 16.476Z"
                          fill="white"
                          fill-opacity="0.602"
                        />
                        <path
                          id="Vector_5"
                          d="M11.9516 20.9963V16.4753L6.32812 13.212L11.9516 20.9963Z"
                          fill="white"
                        />
                        <path
                          id="Vector_6"
                          d="M11.9453 15.4299L17.5681 12.1652L11.9453 9.65417V15.4299Z"
                          fill="white"
                          fill-opacity="0.2"
                        />
                        <path
                          id="Vector_7"
                          d="M6.32812 12.1652L11.9516 15.4299V9.65417L6.32812 12.1652Z"
                          fill="white"
                          fill-opacity="0.602"
                        />
                      </g>
                    </g>
                  </svg>
                </SubTokenLogo>
              </TokenLogo>
              <TokenText>Ethereum</TokenText>
            </Token>
            <Chain>
              <ChainLogo></ChainLogo>
              <ChainName></ChainName>
            </Chain>
          </Selector>
        </SubPopupContain>
        <ChainContainer>
          {chains.map((chain, index) => (
            <Chainmap
              selected={selected === chain} // Check if the current chain is selected
              key={index}
              onClick={() => handleChain(chain)}
            >
              {chain}
            </Chainmap>
          ))}
        </ChainContainer>
        {mapTokens && (
          <CurrencyMap>
            {mapTokens.map((currency: ITokenList, index: any) => (
              <CurrencyItem key={index} onClick={() => handleClick(currency)}>
                {currency.symbol}
              </CurrencyItem>
            ))}
          </CurrencyMap>
        )}
      </PopupContain>
    </PopUpHeaderMain>
  );
};
