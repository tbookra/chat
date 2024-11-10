// store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import messagesReducer from './features/messagesSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    messages: messagesReducer
  },
});

// Define RootState and AppDispatch types for usage throughout the app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
