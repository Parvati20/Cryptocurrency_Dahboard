// Importing necessary modules from Redux Toolkit and API configuration.
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../APIs/Api.js";

// Async functions to fetch historical data using the CoinGecko API.
export const fetchAsyncHistoricData = createAsyncThunk(
  "market/fetchAsyncHistoricData",
  async (params, thunkAPI) => {
    const { id, currency, days } = params;
    try {
      const response = await Api.get(`coins/${id}/market_chart`, {
        params: {
          vs_currency: currency,
          days,
        },
      });
      return response.data.market_caps;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchAsyncHistoricDataRange = createAsyncThunk(
  "market/fetchAsyncHistoricDataRange",
  async (params, thunkAPI) => {
    const { id, currency, from, to } = params;
    try {
      const response = await Api.get(`coins/${id}/market_chart/range`, {
        params: {
          vs_currency: currency,
          from,
          to,
        },
      });
      return response.data.market_caps;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Slice to manage chart data in the Redux store.
const chartSlice = createSlice({
  name: "market",
  initialState: {
    data: {},
    loading: false,
    error: null,
  },
  reducers: {
    // Reducer to clear chart data in the Redux store.
    clearData: (state) => {
      return {
        ...state,
        data: {},
        error: null,
        loading: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // Handling actions related to fetching historical data.
      .addCase(fetchAsyncHistoricData.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchAsyncHistoricData.fulfilled, (state, action) => {
        state.data[action.meta.arg.id] = action.payload;
        state.loading = false;
      })
      .addCase(fetchAsyncHistoricData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handling actions related to fetching historical data within a specific range.
      .addCase(fetchAsyncHistoricDataRange.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchAsyncHistoricDataRange.fulfilled, (state, action) => {
        state.data[action.meta.arg.id] = action.payload;
        state.loading = false;
      })
      .addCase(fetchAsyncHistoricDataRange.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Exporting actions and the reducer from the chartSlice.
export const { clearData } = chartSlice.actions;
export default chartSlice.reducer;
