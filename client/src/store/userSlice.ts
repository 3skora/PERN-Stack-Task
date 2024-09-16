import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserRecord } from "../interfaces/user.interfaces";

export interface userState {
  matchedClient: IUserRecord | undefined;
  matchedHelper: IUserRecord | undefined;
}

const initialState: userState = {
  matchedClient: undefined,
  matchedHelper: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setMatchedClient(state, action: PayloadAction<userState["matchedClient"]>) {
      state.matchedClient = action.payload;
    },
    setMatchedHelper(state, action: PayloadAction<userState["matchedHelper"]>) {
      state.matchedHelper = action.payload;
    },
  },
});

export const { setMatchedClient, setMatchedHelper } = userSlice.actions;
export default userSlice.reducer;
