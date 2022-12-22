import { createSlice, configureStore } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { isLoggedin: false },
  reducers: {
    login(state) {
      state.isLoggedin = true;
    },
    logout (state, action) {

      state.isLoggedin = action.payload;
      
    },
  },
});

export const authActions = authSlice.actions;




export const store = configureStore({
  reducer: authSlice.reducer,
});
