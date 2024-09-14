import UserFormModal from "../../features/users/UserFormModal";
import { useAppSelector } from "../../store";
import { formState } from "../../store/formSlice";

type TFormsLookUp = {
  [key in formState["formEntity"]]: JSX.Element;
};

const FormManager = () => {
  const { formEntity } = useAppSelector((state) => state.form);

  const formsLookUp: TFormsLookUp = {
    User: <UserFormModal />,
  };

  const selectedForm = formsLookUp[formEntity];

  return <>{selectedForm}</>;
};

export default FormManager;
