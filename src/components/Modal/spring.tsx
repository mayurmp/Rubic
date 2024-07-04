// Modal.tsx
import React from "react";
import { useSpring, animated } from "react-spring";
import { HomeIndicator } from "../../homeIndicator/HomeIndicator";
import {
  BackgroundOverlay,
  ModalContent,
  ModalWrapper,
  SubModalContent,
} from "./spring.styled";

interface ModalProps {
  showModal: boolean;
  closeModal: () => void;
  children: any;
}

const SpringModal: React.FC<ModalProps> = ({
  showModal,
  closeModal,
  children,
}) => {
  const modalAnimation = useSpring({
    transform: showModal ? "translateY(0%)" : "translateY(100%)",
  });

  return (
    <>
      {showModal && <BackgroundOverlay onClick={closeModal} />}
      <ModalWrapper style={modalAnimation}>
        <ModalContent>
          <SubModalContent>{children}</SubModalContent>
        </ModalContent>
        <HomeIndicator />
      </ModalWrapper>
    </>
  );
};

export default SpringModal;
