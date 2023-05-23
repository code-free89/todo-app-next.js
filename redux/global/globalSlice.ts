import { createSlice } from '@reduxjs/toolkit';
import { GLOBAL_DATA } from '../../constants/global';

export const globalSlice = createSlice({
  name: 'global',
  initialState: GLOBAL_DATA,
  reducers: {
    updateSearchString: (state, action) => {
      state.searchString = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateSearchString } = globalSlice.actions;

export default globalSlice.reducer;
