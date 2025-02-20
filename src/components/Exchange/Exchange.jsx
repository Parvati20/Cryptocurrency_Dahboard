// React and Redux imports
import React from "react";
import { useState, Fragment } from "react";
import { useSelector } from "react-redux";

// Custom function imports
import { getAllCoins } from "../../common/cryptoSlice/coinsSlice";
import { setPrice_s, setPrice_b } from "../../common/cryptoSlice/cryptoSlice";
import { convertExchangeRates } from "../../common/miscelleneous/exchangeRate";

// Component imports
import DropDown from "./DropDown";

// Exchange component for selecting coins, entering amount, and performing exchange
const Exchange = () => {
  // Redux state for available coins, sell and buy prices
  const coins = useSelector(getAllCoins);
  const [amount, setAmount] = useState("");
  const [exchangeResult, setExchangeResult] = useState("");
  const [error, setError] = useState(null);

  // Sell and buy prices from Redux state
  const sellPrice = useSelector((state) => state.globalStore.price_s);
  const buyPrice = useSelector((state) => state.globalStore.price_b);

  // Handle change in the input amount
  const handleChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue > 2) {
      setError("Amount should be less than 2");
    } else {
      setError(null);
      setAmount(inputValue);
    }
  };

  // Render the component
  return (
    <Fragment>
      <div className="flex items-center justify-between">
        <h1 className="p-4 font-bold">Exchange Coins</h1>
        <p className="font-semibold text-xs pr-12 pt-8 text-light-muted dark:text-dark-muted">
          Enter value
        </p>
      </div>
      <div className="grid grid-cols-6 gap-4 md:gap-2 items-center justify-center px-4 pb-4">
        <h3 className="col-span-1 text-red-500 font-semibold">Sell</h3>
        <div className="relative col-span-3">
          {/* Dropdown for selecting coins to sell */}
          <DropDown coins={coins} setPrice={setPrice_s} search={true} />
        </div>
        <div className=" col-span-2 place-self-center flex-1 py-2 px-2 bg-light-fill dark:bg-dark-fill">
          {/* Input for entering the amount to sell */}
          <input
            type="number"
            min={0.1}
            required
            className=" col-span-2 w-24 flex-1 py-2 px-2 text-xs border-2 bg-light-fill dark:bg-dark-fill border-black dark:border-white "
            placeholder="Amt:"
            value={amount}
            onChange={handleChange}
          />
          {/* Display error message if amount exceeds 2 */}
          {error && (
            <p className="place-self-center text-red-400 font-semibold text-sm">
              {error}
            </p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-6 gap-4 md:gap-2 items-center px-4 pb-4">
        <h3 className="col-span-1 text-green-500 font-semibold">Buy</h3>
        <div className="relative col-span-3">
          {/* Dropdown for selecting coins to buy */}
          <DropDown coins={coins} setPrice={setPrice_b} search={true} />
        </div>
        <p className="col-span-2 place-self-center text-red-400 font-semibold text-sm">
          {isNaN(exchangeResult)
            ? "Select currencies and enter the amount"
            : exchangeResult}{" "}
          {buyPrice?.symbol}
        </p>
      </div>
      <div className="flex items-center justify-center pb-2 pt-4">
        {/* Button for performing the exchange */}
        <button
          className="bg-light-button-selected dark:bg-dark-button-selected hover:bg-light-button-selected-hover dark:hover:bg-dark-button-selected-hover font-semibold hover:text-white"
          onClick={() =>
            setExchangeResult(
              convertExchangeRates(
                sellPrice.current_price,
                buyPrice.current_price,
                amount
              )
            )
          }
        >
          Exchange
        </button>
      </div>
    </Fragment>
  );
};

// Export the component
export default Exchange;
