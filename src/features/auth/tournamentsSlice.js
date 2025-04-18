import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tournaments: [],
  loading: false,
  error: null,
};

const tournamentsSlice = createSlice({
  name: 'tournaments',
  initialState,
  reducers: {
    setTournaments: (state, action) => {
      state.tournaments = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setTournaments, setLoading, setError } = tournamentsSlice.actions;
export default tournamentsSlice.reducer;