// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// type AuthState = {
//   token: string | null;
//   role: "Admin" | "ProjectManager" | "Developer" | null;
//   userEmail: string | null;
// };

// const initialState: AuthState = {
//   token: null,
//   role: null,
//   userEmail: null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setAuth(state, action: PayloadAction<{ token: string; role: AuthState["role"]; email?: string }>) {
//       state.token = action.payload.token;
//       state.role = action.payload.role ?? null;
//       state.userEmail = action.payload.email ?? null;
//     },
//     clearAuth(state) {
//       state.token = null;
//       state.role = null;
//       state.userEmail = null;
//     },
//   },
// });

// export const { setAuth, clearAuth } = authSlice.actions;
// export default authSlice.reducer;
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  token: string | null;
  role: "Admin" | "ProjectManager" | "Developer" | null;
  userEmail: string | null;
};

const initialState: AuthState = {
  token: null,
  role: null,
  userEmail: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<{ token: string; role: AuthState["role"]; email?: string }>) {
      state.token = action.payload.token;
      state.role = action.payload.role ?? null;
      state.userEmail = action.payload.email ?? null;
    },
    clearAuth(state) {
      state.token = null;
      state.role = null;
      state.userEmail = null;
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;