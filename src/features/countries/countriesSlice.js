import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loadCountries = createAsyncThunk(
  '@@countries/loadCountries',
  async (_, {
    extra: { client, API }
  }) => {
    return client.get(API.ALL_COUNTRIES)
  });

const initialState = {
  status: 'idle',
  error: null,
  list: [],
}

const countrySlice = createSlice({
  name: '@@countries',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadCountries.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadCountries.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload || action.meta.error;
      })
      .addCase(loadCountries.fulfilled, (state, action) => {
        state.status = 'received';
        state.list = action.payload.data;
      })
  }
});

export const countryReducer = countrySlice.reducer;


export const selectCountriesInfo = (state) => ({
  status: state.countries.status,
  error: state.countries.error,
  numberOfCountries: state.countries.list.length
})

export const selectAllCountries = (state) => state.countries.list;
export const selectVisibleCountries = (state, { search = '', region = '' }) => {
  return state.countries.list.filter(
    country => (
      country.name.toLowerCase().includes(search.toLowerCase()) && country.region.includes(region)
    )
  )
}
