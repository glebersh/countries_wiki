import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadCountryByName = createAsyncThunk(
  '@@details/loadCountryByName',
  async (name, {
    extra: { client, API }
  }) => {
    return client.get(API.searchByCountry(name))
  });

export const loadNeighborsByBorder = createAsyncThunk(
  '@@details/loadNeighborsByBorders',
  async (borders, {
    extra: { client, API }
  }) => {
    return client.get(API.filterByCode(borders));
  });

const initialState = {
  currentCountry: null,
  neighbors: [],
  status: 'idle',
  error: null,
}

const detailsSlice = createSlice({
  name: '@@details',
  initialState,
  reducers: {
    clearDetails: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCountryByName.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadCountryByName.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.meta.error;
      })
      .addCase(loadCountryByName.fulfilled, (state, action) => {
        state.status = 'idle';
        state.currentCountry = action.payload.data[0];
      })
      .addCase(loadNeighborsByBorder.fulfilled, (state, action) => {
        state.neighbors = action.payload.data.map(country => country.name);
      })
  }
});

export const { clearDetails } = detailsSlice.actions;

export default detailsSlice.reducer;

export const selectCurrentCountry = (state) => state.details.currentCountry;
export const selectDetails = (state) => state.details;
export const selectNeighbors = (state) => state.details.neighbors;
