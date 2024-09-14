import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { TextField, Typography } from "@mui/material";
import React from "react";
import { IUser } from "../../interfaces/user.interfaces";
import { useAppDispatch, useAppSelector } from "../../store";
import { setOpenForm, setUserInputKey } from "../../store/formSlice";

interface UserFormModalProps {
  handleSave: () => void;
  isSaving: boolean;
}

const UserFormModal: React.FC<UserFormModalProps> = ({ handleSave, isSaving }) => {
  const dispatch = useAppDispatch();
  const { openForm, formType, userInputs } = useAppSelector((state) => state.form);

  const onClose = () => {
    dispatch(setOpenForm(false));
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
        <Button variant="contained" onClick={handleSave} disabled={isSaving}>
          {isSaving ? "saving..." : "save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserFormModal;
