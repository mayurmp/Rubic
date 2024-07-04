import React, { useContext, useEffect, useState } from "react";
import CurrencyContext from "../../context/currency";
import SpringModal from "../Modal/spring";
import {
  ModalBox,
  SelectButtonStyle,
  SelectButtonText,
  Text,
} from "./index.styled";
import { PREVIEW_TRANSACTION } from "../../constants/constant";

const PreviewButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    sourceToken,
    destinedToken,
    inputAmount,
    swapAmount,
    inProgress,
    isBalance,
    bestTrade,
    gasFees,
    fromChain,
    toChain
  } = useContext(CurrencyContext);

  const openModal = async () => {
    ;(window as any)?.flutter_inappwebview?.callHandler('previewTransaction').then(function(result: any) {
          // print to the console the data coming
          // from the Flutter side.
          console.log(result)
      });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // const buttonText = () => {
  //   if (!sourceToken && !destinedToken && !inputAmount) {
  //     return "Select Tokens";
  //   } else if (
  //     // sourceToken?.balance !== undefined &&
  //     // Number(inputAmount) > sourceToken?.balance
  //     !isBalance
  //   ) {
  //     return "Insufficient balance";
  //   } else if (sourceToken && destinedToken && !inputAmount) {
  //     return "Enter Amount";
  //   } else if (inProgress) {
  //     return "Processing";
  //   } else if (swapAmount) {
  //     return "Preview Best Price";
  //   } else {
  //     return "Select Tokens";
  //   }
  // };

  return (
    <>
      <SelectButtonStyle
        onClick={openModal}
        inputAmountExceedsBalance={!isBalance}
        swapAmount={swapAmount}
        inProgress={inProgress}
      >
        <SelectButtonText>
          <Text
            inputAmountExceedsBalance={!isBalance}
            swapAmount={swapAmount}
            inProgress={inProgress}
          >
            {PREVIEW_TRANSACTION}
          </Text>
        </SelectButtonText>
      </SelectButtonStyle>
      {isModalOpen && (
        <SpringModal showModal={isModalOpen} closeModal={closeModal}>
          <ModalBox></ModalBox>
        </SpringModal>
      )}
    </>
  );
};

export default PreviewButton;
