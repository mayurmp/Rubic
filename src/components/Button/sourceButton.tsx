import SpringModal from "../Modal/spring";
import { useContext, useState } from "react";
import { SourceTokenPopup } from "../../Popups/sourceTokenPopup";
import CurrencyContext from "../../context/currency";
import { ButtonComponent, ButtonStyle, SVGImage } from "./button.styled";
import { ITokenList } from "../../constants/tokenlist";
import { getChainSymbol } from "../../utils/chains";
const SourceButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    sourceToken,
    setSourceToken,
    setFromChain,
    setFiatData,
    fiatData,
    setWalletBalance,
  } = useContext(CurrencyContext);
  const openModal = () => {
    // setIsModalOpen(true);
    (window as any)?.flutter_inappwebview
      ?.callHandler("tokenSheet", "fromToken")
      .then(function (result: any) {
        // print to the console the data coming
        // from the Flutter side.
        if (!result) return;
        const sourceToken: ITokenList = {
          chainId: result["fromToken"]?.chainId,
          address: result["fromToken"]?.contractAddress
            ? result["fromToken"]?.contractAddress
            : "0x0000000000000000000000000000000000000000",
          name: result["fromToken"]?.name,
          symbol: result["fromToken"]?.symbol,
          decimals: result["fromToken"]?.decimal,
          logoURI: result["fromToken"]?.logo,
          balance: result["fromToken"]?.balance,
          isNative: result["fromToken"]?.isNative,
        };
        setFiatData({
          ...fiatData!,
          fromTokenPrice: result?.fromTokenPrice?.toString(),
          fromNativeTokenPrice: result?.fromNativeTokenPrice?.toString(),
        });
        setWalletBalance(result.fromNativeTokenBalance);
        setSourceToken(sourceToken);
        const chainSymbol = getChainSymbol(sourceToken.chainId.toString());
        setFromChain(chainSymbol);
        console.log("result", JSON.stringify(result));
        console.log("sourceToken", JSON.stringify(sourceToken));
      });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const getUrl = (sourceToken: ITokenList) => {
    const logoUrl = `${process.env.REACT_APP_TOKEN_IMAGE_BASE_URL}${
      sourceToken?.address === "0x0000000000000000000000000000000000000000"
        ? "native"
        : sourceToken?.address?.toLocaleLowerCase()
    }-${sourceToken.chainId}.png`;
    // '${appEnvironment.imageBaseUrl}'
    //     '${isNativeToken ? 'native' : contractAddress.toLowerCase()}-'
    //     '$chainId.png'
    console.log("URL log", logoUrl);
    return logoUrl;
  };
  return (
    <ButtonComponent>
      <ButtonStyle
        color={sourceToken ? "neutral" : "primary"}
        variant={sourceToken ? "soft" : "solid"}
        startDecorator={
          sourceToken ? (
            <SVGImage src={getUrl(sourceToken)} alt="logo"></SVGImage>
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
              stroke={sourceToken ? "black" : "white"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
      >
        {sourceToken !== undefined ? sourceToken.symbol : "Select Token"}
      </ButtonStyle>
      {isModalOpen && (
        <SpringModal showModal={isModalOpen} closeModal={closeModal}>
          <SourceTokenPopup closeModal={closeModal}></SourceTokenPopup>
        </SpringModal>
      )}
    </ButtonComponent>
  );
};

export default SourceButton;
