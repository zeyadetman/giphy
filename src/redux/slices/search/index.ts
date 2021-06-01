import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchStateInterface {
  searchTerm: string;
}

const initialState: SearchStateInterface = {
  searchTerm: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchTerm: (
      state?: SearchStateInterface,
      action?: PayloadAction<string>,
    ) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { setSearchTerm } = searchSlice.actions;

export default searchSlice.reducer;
