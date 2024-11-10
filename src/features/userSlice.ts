// features/auth/authSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { User } from '../types/generalTypes';

interface UserState {
  user: User;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = {...action.payload};
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
