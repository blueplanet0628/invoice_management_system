// lib/redux/features/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  accessToken: string | null;
  tokenType: string | null;
  email: string | null;
  role: string | null;
  name: string | null;
}

const initialState: AuthState = {
  accessToken: null,
  tokenType: null,
  email: null,
  role: null,
  name: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<AuthState>) => {
      return { ...state, ...action.payload };
    },
    logout: (state) => {
      return { ...initialState };
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
