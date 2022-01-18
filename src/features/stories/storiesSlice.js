import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  storyIds: [],
  stories: [],
  status: 'idle',
  error: null,
};

const storiesSlice = createSlice({
  name: 'stories',
  initialState,
});

export default storiesSlice.reducer;
