import UsersGrid from "../../features/users/UsersGrid";
import { useAppDispatch } from "../../store";
import { setFormEntity, setFormType, setOpenForm } from "../../store/formSlice";
import { Button } from "@mui/material";

const UsersPage = () => {
  const dispatch = useAppDispatch();

  const onCreateNewUser = () => {
    console.log("create new user");
    dispatch(setOpenForm(true));
    dispatch(setFormType("Add"));
    dispatch(setFormEntity("User"));
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
    </div>
  );
};
export default UsersPage;
