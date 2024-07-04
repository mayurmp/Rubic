import React, { useState } from "react";
import SpringModal from "../Modal/spring";
import {
  CustomGreyText,
  PopUpComponent,
  SubHeading,
  SubPopUpComponent,
} from "./heading.styled";

export const Heading = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const settingSVG = "images/svg/setting.svg";

  const openModal = () => {
    (window as any)?.flutter_inappwebview?.callHandler('settingsSheet').then(function(result: any) {
    });
    // setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <SubHeading>
        <CustomGreyText>Exchange your tokens</CustomGreyText>
        <img src={settingSVG} alt="setting_svg" onClick={openModal} />

        {/* To open Modal from bottom of the screen */}
        {isModalOpen && (
          <SpringModal showModal={isModalOpen} closeModal={closeModal}>
            <PopUpComponent>
              <SubPopUpComponent></SubPopUpComponent>
            </PopUpComponent>
          </SpringModal>
        )}
      </SubHeading>
    </>
  );
};
