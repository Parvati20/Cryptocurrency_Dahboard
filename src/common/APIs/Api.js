// Import the Axios library for making HTTP requests.
import axios from "axios";

// Create and export an Axios instance with a base URL set to the CoinGecko API endpoint.
export default axios.create({
  baseURL: "https://api.coingecko.com/api/v3/",
});

