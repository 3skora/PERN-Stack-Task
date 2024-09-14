import UsersGrid from "./features/users/UsersGrid";
import ConfirmDeletionModal from "./components/modals/ConfirmDeletionModal";
import "./App.css";
import UserFormModal from "./features/users/UserFormModal";
import { useAppDispatch } from "./store";
import { setOpenForm } from "./store/formSlice";
import { setOpenModal } from "./store/modalSlice";

const App = () => {
  const dispatch = useAppDispatch();

  const onConfirm = () => {
    console.log("Confirm Delete");
    dispatch(setOpenModal(false));
  };

  const onSave = () => {
    console.log("Saved");
    dispatch(setOpenForm(false));
  };

  return (
    <div>
      <h1>Users</h1>
      <UsersGrid />
      <ConfirmDeletionModal onConfirm={onConfirm} />
      <UserFormModal handleSave={onSave} isSaving={false} />
    </div>
  );
};

export default App;
