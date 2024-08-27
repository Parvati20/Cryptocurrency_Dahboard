// Creating a Redux slice for global store state related to cryptocurrency settings.
import { createSlice } from "@reduxjs/toolkit";

// Initial state for the global crypto store.
const initialState = {
  currency: "USD",
  symbol: "$",
  price_s: "0",
  price_b: "0",
  price_symbol: "",
  days: 365,
  chartType: "Line Chart",
  selectedCoins: [],
  coinIDs: [],
  toDate: "",
  fromDate: "",
  isCustomRange: false,
};

// Slice to manage global crypto store state.
export const cryptoSlice = createSlice({
  name: "globalStore",
  initialState,
  reducers: {
    // Reducers to update specific properties in the global crypto store.
    setCurrency: (state, action) => {
      state.currency = action.payload;
    },
    setSymbol: (state, action) => {
      state.symbol = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload;
    },
    setPrice_s: (state, action) => {
      state.price_s = action.payload;
    },
    setPrice_b: (state, action) => {
      state.price_b = action.payload;
    },
    setPrice_symbol: (state, action) => {
      state.price_symbol = action.payload;
    },
    setDays: (state, action) => {
      state.days = action.payload;
    },
    setChartType: (state, action) => {
      state.chartType = action.payload;
    },
    setSelectedCoins: (state, action) => {
      state.selectedCoins = action.payload;
    },
    setCoinIDs: (state, action) => {
      state.coinIDs = action.payload;
    },
    setToDate: (state, action) => {
      state.toDate = action.payload;
    },
    setFromDate: (state, action) => {
      state.fromDate = action.payload;
    },
    setIsCustomRange: (state, action) => {
      state.isCustomRange = action.payload;
    },
  },
});

// Exporting individual action creators and the reducer from the cryptoSlice.
export const {
  setCurrency,
  setSymbol,
  setPrice_b,
  setPrice_s,
  setPrice_symbol,
  setDays,
  setChartType,
  setSelectedCoins,
  setCoinIDs,
  setToDate,
  setFromDate,
  setIsCustomRange,
} = cryptoSlice.actions;
export default cryptoSlice.reducer;
