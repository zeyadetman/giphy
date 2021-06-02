import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthStateInterface {
  user: string;
}

const initialState: AuthStateInterface = {
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state?: AuthStateInterface, action?: PayloadAction<any>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
