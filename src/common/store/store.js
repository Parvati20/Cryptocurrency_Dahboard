// Importing necessary modules from Redux Toolkit.
import { configureStore } from "@reduxjs/toolkit";

// Importing reducers from various slices.
import cryptoSliceReducer from "../cryptoSlice/cryptoSlice.js";
import coinsSliceReducer from "../cryptoSlice/coinsSlice.js";
import chartSliceReducer from "../cryptoSlice/chartSlice.js";
import currencySliceReducer from "../cryptoSlice/CurrencySlice.js";

// Configuring the Redux store with combined reducers.
export const store = configureStore({
  reducer: {
    globalStore: cryptoSliceReducer,
    coins: coinsSliceReducer,
    market: chartSliceReducer,
    currencies: currencySliceReducer,
  },
});
