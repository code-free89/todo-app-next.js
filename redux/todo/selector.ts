import { RootState } from '../store';

export const selectToDoData = (state: RootState) => state.todo.data;
