// Importing necessary modules from Redux Toolkit and API configuration.
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../APIs/Api.js";

// Async function to fetch cryptocurrency data using the CoinGecko API.
export const fetchAsyncCoins = createAsyncThunk(
  "coins/fetchAsyncCoins",
  async (term) => {
    const response = await Api.get(
      `coins/markets?vs_currency=${term}&order=market_cap_desc&per_page=20&page=1&sparkline=false`
    );
    return response.data;
  }
);

// Initial state for the coinsSlice.
const initialState = {
  coins: [],
};

// Slice to manage cryptocurrency data in the Redux store.
const coinsSlice = createSlice({
  name: "coins",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handling actions related to fetching cryptocurrency data.
      .addCase(fetchAsyncCoins.pending, (state, action) => {})
      .addCase(fetchAsyncCoins.fulfilled, (state, { payload }) => {
        // Update the state with the fetched cryptocurrency data.
        return { ...state, coins: payload };
      })
      .addCase(fetchAsyncCoins.rejected, (state, action) => {
        console.log("Rejected");
      });
  },
});

// Selector function to get all coins from the Redux store state.
export const getAllCoins = (state) => state.coins.coins;

// Exporting the reducer from the coinsSlice.
export default coinsSlice.reducer;
