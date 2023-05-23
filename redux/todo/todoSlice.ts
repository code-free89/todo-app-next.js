import { createSlice } from '@reduxjs/toolkit';
import initialData from '../../constants/mockdata';
import { ITodoCard } from '../../models/todo';

export const todoSlice = createSlice({
  name: 'todo',
  initialState: { data: initialData },
  reducers: {
    addBoard: (state, action) => {
      const boardTitle = action.payload;
      state.data.boards = {
        ...state.data.boards,
        [boardTitle]: {
          id: boardTitle,
          title: boardTitle,
          cardIds: [],
        },
      };
      state.data.boardOrder = [...state.data.boardOrder, boardTitle];
    },
    addCard: (state, action) => {
      const cardId = Math.random().toString();
      state.data.cards = {
        ...state.data.cards,
        [cardId]: {
          id: cardId,
          description: action.payload.description,
          options: action.payload.options,
          title: action.payload.title,
        },
      };
      state.data.boards = {
        ...state.data.boards,
        [action.payload.boardId]: {
          ...state.data.boards[action.payload.boardId],
          cardIds: [
            ...state.data.boards[action.payload.boardId].cardIds,
            cardId,
          ],
        },
      };
    },
    updateCard: (state, action) => {
      console.log('action.payload =>', action.payload);
      state.data.cards = {
        ...state.data.cards,
        [action.payload.cardId]: {
          id: action.payload.cardId,
          description: action.payload.description,
          title: action.payload.title,
          options: [...action.payload.options],
        },
      };
    },
    updateBoardOrder: (state, action) => {
      state.data.boardOrder = [...action.payload];
    },
    updateBoard: (state, action) => {
      state.data.boards = JSON.parse(JSON.stringify(action.payload));
    },
  },
});

// Action creators are generated for each case reducer function
export const { addBoard, updateBoardOrder, updateBoard, addCard, updateCard } =
  todoSlice.actions;

export default todoSlice.reducer;
