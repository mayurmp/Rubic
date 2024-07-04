import { PopUpHeader } from "./popUpHeader";
import { SubModalContent } from "./popUp.styled";

export const SourceTokenPopup = ({
  closeModal,
}: {
  closeModal: () => void;
}) => {
  return (
    <>
      <SubModalContent>
        <PopUpHeader closeModal={closeModal} tokentype="source"></PopUpHeader>
      </SubModalContent>
    </>
  );
};
