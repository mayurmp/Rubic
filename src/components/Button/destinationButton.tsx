import SpringModal from "../Modal/spring";
import { useContext, useState } from "react";
import { DestinationTokenPopup } from "../../Popups/destinationTokenPopup";
import CurrencyContext, { IFiatData } from "../../context/currency";
import { ButtonComponent, ButtonStyle, SVGImage } from "./button.styled";
import { ITokenList } from "../../constants/tokenlist";
import { getChainSymbol } from "../../utils/chains";

const DestinationButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { destinedToken, setDestinedToken, setToChain, setFiatData, fiatData } =
    useContext(CurrencyContext);

  const openModal = () => {
    // setIsModalOpen(true);
    (window as any)?.flutter_inappwebview
      ?.callHandler("tokenSheet", "toToken")
      .then(function (result: any) {
        // print to the console the data coming
        // from the Flutter side.
        if (!result) return;
        const sourceToken: ITokenList = {
          chainId: result["toToken"]?.chainId,
          address: result["toToken"]?.contractAddress
            ? result["toToken"]?.contractAddress
            : "0x0000000000000000000000000000000000000000",
          name: result["toToken"]?.name,
          symbol: result["toToken"]?.symbol,
          decimals: result["toToken"]?.decimal,
          logoURI: result["toToken"]?.logo,
          balance: result["toToken"]?.balance,
          isNative: result["toToken"]?.isNative,
        };
        const fiatValues: IFiatData = {
          ...fiatData!,
          toTokenPrice: result.toTokenPrice.toString(),
        };
        setFiatData(fiatValues);
        setDestinedToken(sourceToken);
        const chainSymbol = getChainSymbol(sourceToken.chainId.toString());
        setToChain(chainSymbol);
        console.log(JSON.stringify(sourceToken));
      });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const getUrl = (destinedToken: ITokenList) => {
    console.log("destinedToken?.address", destinedToken?.address);
    const logoUrl = `${process.env.REACT_APP_TOKEN_IMAGE_BASE_URL}${
      destinedToken?.address === "0x0000000000000000000000000000000000000000"
        ? "native"
        : destinedToken?.address?.toLocaleLowerCase()
    }-${destinedToken.chainId}.png`;
    console.log("destinedToken?.address", logoUrl);
    return logoUrl;
  };
  return (
    <ButtonComponent>
      <ButtonStyle
        color={destinedToken ? "neutral" : "primary"}
        variant={destinedToken ? "soft" : "solid"}
        startDecorator={
          destinedToken ? (
            <SVGImage src={getUrl(destinedToken)} alt="logo"></SVGImage>
          ) : (
            ""
          )
        }
        onClick={openModal}
        endDecorator={
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 9L12 15L6 9"
              stroke={destinedToken ? "black" : "white"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
      >
        {destinedToken !== undefined ? destinedToken.symbol : "Select Token"}
      </ButtonStyle>
      {isModalOpen && (
        <SpringModal showModal={isModalOpen} closeModal={closeModal}>
          <DestinationTokenPopup
            closeModal={closeModal}
          ></DestinationTokenPopup>
        </SpringModal>
      )}
    </ButtonComponent>
  );
};
export default DestinationButton;
