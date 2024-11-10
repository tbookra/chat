import { createSlice } from "@reduxjs/toolkit";
import { Message } from "../types/generalTypes";
import { makeId, setDate } from "../utils/utilFunctions";

interface messagesState {
  [key: string]: Message[];
}

const initialState: messagesState = {};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setMessages: (state, action) => {
      const messageObj: Message = {
        text: action.payload.message,
        textId: makeId(8),
        timestamp: setDate(),
        sender: action.payload.sender,
        watched:true
      };
      if (!state[action.payload.room]) {
        state[action.payload.room] = [messageObj];
      } else {
        state[action.payload.room] = [
          ...state[action.payload.room],
          messageObj,
        ];
      }
    },
    
  },
});

export const { setMessages } = messagesSlice.actions;
export default messagesSlice.reducer;
