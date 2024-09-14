import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../interfaces/user.interfaces";
import { set } from "lodash";

export const userInputsInitialState: IUser = {
  name: "",
  phoneNumber: "",
  city: "",
  email: "",
};
export interface formState {
  openForm: boolean;
  formType: "Add" | "Edit";
  formEntity: "User";
  userInputs: IUser;
  selectedUserId: number | undefined;
}

const initialState: formState = {
  openForm: false,
  formType: "Add",
  formEntity: "User",
  userInputs: userInputsInitialState,
  selectedUserId: undefined,
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
    setFormEntity(state, action: PayloadAction<formState["formEntity"]>) {
      state.formEntity = action.payload;
    },
    setUserInputs(state, action: PayloadAction<IUser>) {
      state.userInputs = action.payload;
    },
    setUserInputKey(state, action: PayloadAction<{ key: string; newValue: any }>) {
      state.userInputs = set(state.userInputs, action.payload.key, action.payload.newValue);
    },
    setSelectedUserId(state, action: PayloadAction<number | undefined>) {
      state.selectedUserId = action.payload;
    },
  },
});

export const { setOpenForm, setFormType, setFormEntity, setUserInputs, setUserInputKey, setSelectedUserId } =
  formSlice.actions;
export default formSlice.reducer;
