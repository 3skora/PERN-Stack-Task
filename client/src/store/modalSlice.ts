import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface modalState {
  openModal: boolean;
  label?: string;
  modalName: "delete";
  onConfirmDeletion: () => void;
}

const initialState: modalState = {
  openModal: false,
  label: undefined,
  modalName: "delete",
  onConfirmDeletion: () => {},
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setOpenModal(state, action: PayloadAction<boolean>) {
      state.openModal = action.payload;
    },
    setOnConfirmDeletion(state, action: PayloadAction<modalState["onConfirmDeletion"]>) {
      state.onConfirmDeletion = action.payload;
    },
  },
});

export const { setOpenModal, setOnConfirmDeletion } = modalSlice.actions;
export default modalSlice.reducer;
