import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store";
import { setOnConfirmDeletion, setOpenModal } from "../../store/modalSlice";

interface ConfirmDeletionModalProps {
  onConfirm: () => void;
}

const ConfirmDeletionModal: React.FC<ConfirmDeletionModalProps> = ({ onConfirm }) => {
  const dispatch = useAppDispatch();
  const { openModal, label, onConfirmDeletion } = useAppSelector((state) => state.modal);

  const onClose = () => {
    dispatch(setOpenModal(false));
    dispatch(setOnConfirmDeletion(() => {}));
  };
  return (
    <Dialog open={openModal} onClose={onClose}>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        <DialogContentText>{label || "Are you sure you want to delete this item?"}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Box>
          <Button variant="contained" sx={{ ml: 1 }} onClick={() => onConfirm()} color="primary">
            Confirm
          </Button>
          <Button variant="contained" sx={{ ml: 1 }} onClick={onClose} color="error">
            Cancel
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeletionModal;
