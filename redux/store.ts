import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todo/todoSlice';
import globalReducer from './global/globalSlice';

const store = configureStore({
  reducer: {
    todo: todoReducer,
    global: globalReducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
