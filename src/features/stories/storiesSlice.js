import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const BASE_URL = 'https://hacker-news.firebaseio.com/v0';

async function getJson(endpoint) {
  const headers = { 'Content-Type': 'application/json' };

  const config = {
    headers,
  };

  let data;
  try {
    const response = await fetch(endpoint, config);
    data = await response.json();

    if (response.ok) {
      return data;
    }
    throw new Error(response.statusText);
  } catch (error) {
    return Promise.reject(error.message ? error.message : data);
  }
}

export const fetchTopStoryIds = createAsyncThunk(
  'stories/fetchTopStoryIds',
  async () => {
    const storyIds = await getJson(`${BASE_URL}/topstories.json`);
    return storyIds;
  }
);

export const fetchTopStories = createAsyncThunk(
  'stories/fetchTopStories',
  async (storyIds) => {
    const fetchStories = storyIds.map((storyId) =>
      getJson(`${BASE_URL}/item/${storyId}.json`)
    );

    const stories = await Promise.all(fetchStories);

    return stories;
  }
);

export const fetchComments = createAsyncThunk(
  'stories/fetchComments',
  async (commentIds, { dispatch }) => {
    dispatch(resetComments());

    const fetchComments = commentIds.map((commentId) =>
      getJson(`${BASE_URL}/item/${commentId}.json`)
    );

    const comments = await Promise.all(fetchComments);

    return comments;
  }
);

const initialState = {
  storyIds: [],
  stories: [],
  comments: [],
  status: 'idle',
  error: null,
};

const storiesSlice = createSlice({
  name: 'stories',
  initialState,
  reducers: {
    resetComments: (state) => {
      state.comments = [];
    },
  },
  extraReducers: function (builder) {
    builder
      .addCase(fetchTopStoryIds.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTopStoryIds.fulfilled, (state, action) => {
        state.storyIds = action.payload;
      })
      .addCase(fetchTopStoryIds.rejected, (state, { error }) => {
        state.status = 'failed';
        state.error = error.message;
      })
      .addCase(fetchTopStories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTopStories.fulfilled, (state, action) => {
        state.status = 'complete';
        state.stories = state.stories.concat(action.payload);
      })
      .addCase(fetchTopStories.rejected, (state, { error }) => {
        state.status = 'failed';
        state.error = error.message;
      })
      .addCase(fetchComments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments = state.comments.concat(action.payload);
      })
      .addCase(fetchComments.rejected, (state, { error }) => {
        state.status = 'failed';
        state.error = error.message;
      });
  },
});

export default storiesSlice.reducer;

export const { resetComments } = storiesSlice.actions;

export const selectStoryByID = (state, storyId) =>
  state.stories.stories.find((story) => story.id === storyId);
