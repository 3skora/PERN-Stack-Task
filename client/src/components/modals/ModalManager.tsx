import ConfirmDeletionModal from "./ConfirmDeletionModal";
import { useAppSelector } from "../../store";
import { modalState } from "../../store/modalSlice";

type TModalsLookUp = {
  [key in modalState["modalName"]]: JSX.Element;
};

const ModalManager = () => {
  const { modalName } = useAppSelector((state) => state.modal);

  const modalsLookUp: TModalsLookUp = {
    delete: <ConfirmDeletionModal />,
  };

  const selectedModal = modalsLookUp[modalName];

  return <>{selectedModal}</>;
};

export default ModalManager;
