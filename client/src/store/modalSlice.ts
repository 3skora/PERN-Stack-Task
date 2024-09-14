import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface modalState {
  openModal: boolean;
  label?: string;
  modalName: "delete" | "feedback";
}

const initialState: modalState = {
  openModal: false,
  label: undefined,
  modalName: "delete",
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setOpenModal(state, action: PayloadAction<boolean>) {
      state.openModal = action.payload;
    },
  },
});

export const { setOpenModal } = modalSlice.actions;
export default modalSlice.reducer;
