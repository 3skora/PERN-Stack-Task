import ConfirmDeletionModal from "./ConfirmDeletionModal";
import { useAppSelector } from "../../store";
import { modalState } from "../../store/modalSlice";

type TModalsLookUp = {
  [key in modalState["modalName"]]: JSX.Element;
};

const ModalManager = () => {
  const { modalName, onConfirmDeletion } = useAppSelector((state) => state.modal);

  const modalsLookUp: TModalsLookUp = {
    delete: <ConfirmDeletionModal onConfirm={onConfirmDeletion} />,
  };

  const selectedModal = modalsLookUp[modalName];

  return <>{selectedModal}</>;
};

export default ModalManager;
