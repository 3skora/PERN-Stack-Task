import UsersGrid from "../../features/users/UsersGrid";
import ConfirmDeletionModal from "../../components/modals/ConfirmDeletionModal";
import UserFormModal from "../../features/users/UserFormModal";
import { useAppDispatch, useAppSelector } from "../../store";
import { setFormEntity, setFormType, setOpenForm } from "../../store/formSlice";
import { setOpenModal } from "../../store/modalSlice";
import { Button } from "@mui/material";
import { useDeleteUserMutation } from "../../api/userApi";
const UsersPage = () => {
  const dispatch = useAppDispatch();

  const [deleteUser, { isLoading }] = useDeleteUserMutation();
  const { selectedUserId } = useAppSelector((state) => state.form);

  const onCreateNewUser = () => {
    console.log("create new user");
    dispatch(setOpenForm(true));
    dispatch(setFormType("Add"));
    dispatch(setFormEntity("User"));
  };

  const onConfirm = () => {
    console.log("Confirm Delete");
    selectedUserId && deleteUser(selectedUserId);
    dispatch(setOpenModal(false));
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <h1 style={{ flexGrow: 1, textAlign: "center" }}>Users Management</h1>
        <div>
          <Button variant="contained" onClick={onCreateNewUser}>
            Create New User
          </Button>
        </div>
      </div>
      <UsersGrid />
      <ConfirmDeletionModal onConfirm={onConfirm} />
      <UserFormModal />
    </div>
  );
};
export default UsersPage;
