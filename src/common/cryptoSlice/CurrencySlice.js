// Importing necessary modules from Redux Toolkit and API configuration.
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../APIs/Api.js";

// Async function to fetch a list of supported currencies using the CoinGecko API.
export const fetchAsyncCurrencies = createAsyncThunk(
  "coins/fetchAsyncCurrencies",
  async () => {
    const response = await Api.get(`simple/supported_vs_currencies`);
    return response.data;
  }
);

// Initial state for the currencySlice.
const initialState = {
  data: [],
  loading: false,
  error: null,
};

// Slice to manage supported currency data in the Redux store.
const currencySlice = createSlice({
  name: "currencies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handling actions related to fetching supported currencies.
      .addCase(fetchAsyncCurrencies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAsyncCurrencies.fulfilled, (state, { payload }) => {
        // Update the state with the fetched supported currencies.
        state.data = payload;
        state.loading = false;
      })
      .addCase(fetchAsyncCurrencies.rejected, (state, { error }) => {
        state.status = error;
      });
  },
});

// Exporting actions and the reducer from the currencySlice.
export const {} = currencySlice.actions;
export default currencySlice.reducer;
