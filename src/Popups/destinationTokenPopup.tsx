import { PopUpHeader } from "./popUpHeader";
import { SubModalContent } from "./popUp.styled";

export const DestinationTokenPopup = ({
  closeModal,
}: {
  closeModal: () => void;
}) => {
  return (
    <SubModalContent>
      <PopUpHeader closeModal={closeModal} tokentype="destined"></PopUpHeader>
    </SubModalContent>
  );
};
