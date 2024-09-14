import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../interfaces/user.interfaces";
import { set } from "lodash";

export interface formState {
  openForm: boolean;
  formType: "Add" | "Edit";
  userInputs: IUser;
}

const initialState: formState = {
  openForm: false,
  formType: "Add",
  userInputs: {
    name: "",
    phoneNumber: "",
    city: "",
    email: "",
  },
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setOpenForm(state, action: PayloadAction<boolean>) {
      state.openForm = action.payload;
    },
    setFormType(state, action: PayloadAction<formState["formType"]>) {
      state.formType = action.payload;
    },
    setUserInputs(state, action: PayloadAction<IUser>) {
      state.userInputs = action.payload;
    },
    setUserInputKey(state, action: PayloadAction<{ key: string; newValue: any }>) {
      state.userInputs = set(state.userInputs, action.payload.key, action.payload.newValue);
    },
  },
});

export const { setOpenForm, setFormType, setUserInputs, setUserInputKey } = formSlice.actions;
export default formSlice.reducer;
