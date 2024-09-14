import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { TextField, Typography } from "@mui/material";
import { IUser } from "../../interfaces/user.interfaces";
import { useAppDispatch, useAppSelector } from "../../store";
import { setOpenForm, setUserInputKey, setUserInputs, userInputsInitialState } from "../../store/formSlice";
import { useCreateUserMutation, useEditUserMutation } from "../../api/userApi";

const UserFormModal = () => {
  const dispatch = useAppDispatch();

  const [createUser, { isLoading: isCreateLoading }] = useCreateUserMutation();
  const [editUser, { isLoading: isEditLoading }] = useEditUserMutation();

  const { openForm, formType, userInputs } = useAppSelector((state) => state.form);
  console.log("🚀 ~ file: UserFormModal.tsx:21 ~ userInputs:", userInputs);

  const isSaving = isCreateLoading || isEditLoading;

  const onClose = () => {
    dispatch(setOpenForm(false));
    dispatch(setUserInputs(userInputsInitialState));
  };
  const onSave = () => {
    console.log("Save");
    if (formType === "Add") {
      createUser(userInputs);
    } else {
      console.log("Edit");
      editUser({ id: 2, ...userInputs });
    }

    onClose();
  };

  const handleOnChange = (key: keyof IUser, newValue: any) => {
    dispatch(setUserInputKey({ key, newValue }));
  };

  return (
    <Dialog open={openForm} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle className="pl-4">
        <div className="flex items-center">
          <Typography variant="h6" className="font-semibold">
            {formType} User
          </Typography>
        </div>
      </DialogTitle>

      <DialogContent dividers>
        <TextField
          label="Name"
          autoComplete="off"
          fullWidth
          required
          sx={{ mb: 2 }}
          value={userInputs.name}
          onChange={(e) => handleOnChange(`name`, e.target.value)}
        />
        <TextField
          label="Email"
          autoComplete="off"
          fullWidth
          required
          sx={{ mb: 2 }}
          value={userInputs.email}
          onChange={(e) => handleOnChange(`email`, e.target.value)}
        />
        <TextField
          label="Phone Number"
          autoComplete="off"
          fullWidth
          required
          sx={{ mb: 2 }}
          value={userInputs.phoneNumber}
          onChange={(e) => handleOnChange(`phoneNumber`, e.target.value)}
        />
        <TextField
          label="City"
          autoComplete="off"
          fullWidth
          required
          sx={{ mb: 2 }}
          value={userInputs.city}
          onChange={(e) => handleOnChange(`city`, e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="error" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" onClick={onSave} disabled={isSaving}>
          {isSaving ? "saving..." : "save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserFormModal;
