// React and Redux imports
import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// Redux actions for managing selected coins
import { setCoinIDs, setSelectedCoins } from "../../common/cryptoSlice/cryptoSlice";

// Component for multi-selection dropdown of coins with checkboxes
const MultiCoinSelectionBtn = ({ coins }) => {
  // State for managing dropdown visibility and search term
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Ref for detecting clicks outside the dropdown to close it
  const ref = useRef();

  // Redux store state and dispatch
  const dispatch = useDispatch();
  const selectedCoins = useSelector((state) => state.globalStore.selectedCoins);
  const coinID = useSelector((state) => state.globalStore.coinIDs);

  // Effect to handle clicks outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Effect to initialize selected coins and coin IDs when the coin list changes
  useEffect(() => {
    dispatch(
      setSelectedCoins(
        coins.filter((coin) => coin.name === "Bitcoin").map((coin) => coin.name)
      )
    );

    dispatch(
      setCoinIDs(
        coins.filter((coin) => coin.name === "Bitcoin").map((coin) => coin.id)
      )
    );
  }, [coins]);

  // Filtered options based on the search term
  const filteredOptions = coins.filter((coin) =>
    coin?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to handle checkbox changes and update selected coins and coin IDs
  const handleCheckboxChange = (option, id) => {
    if (selectedCoins.includes(option)) {
      dispatch(
        setSelectedCoins(
          selectedCoins.filter((selectedOption) => selectedOption !== option)
        )
      );
      dispatch(setCoinIDs(coinID.filter((selectedID) => selectedID !== id)));
    } else if (selectedCoins.length < 2) {
      dispatch(setSelectedCoins([...selectedCoins, option]));
      dispatch(setCoinIDs([...coinID, id]));
    }
  };

  // Render the component
  return (
    <div ref={ref} className={"relative"}>
      {/* Button to toggle dropdown visibility */}
      <button
        className="min-w-full px-8 py-2 rounded-lg sm:w-full bg-light-button dark:bg-dark-button hover:bg-light-button-hover dark:hover:bg-dark-button-hover font-semibold text-sm flex items-center
         justify-between shadow-lg focus:outline-none"
        onClick={() => setIsOpen((prevState) => !prevState)}
      >
        <p>
          {selectedCoins.length > 0 ? selectedCoins.join(", ") : "Cryptocurrency"}
        </p>
        <span>
          <svg
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`${isOpen ? "-rotate-180" : ""}`}
          >
            {/* Arrow icon for indicating dropdown direction */}
            <path
              d="M6.1018 8C5.02785 8 4.45387 9.2649 5.16108 10.0731L10.6829 16.3838C11.3801 17.1806 12.6197 17.1806 13.3169 16.3838L18.8388 10.0731C19.5459 9.2649 18.972 8 17.898 8H6.1018Z"
              fill="#000"
            />
          </svg>
        </span>
      </button>

      {/* Dropdown with checkboxes for selecting coins */}
      {isOpen && (
        <div className="absolute h-60 overflow-auto border border-black dark:border-white left-0 z-30 mt-2 py-2 w-full flex flex-col rounded-md bg-light-fill dark:bg-dark-fill shadow-xl">
          {/* Search input for filtering options */}
          <input
            className={`bg-light-fill dark:bg-dark-fill p-2 outline-none border-b border-black dark:border-white `}
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search coins..."
          />

          {/* List of checkboxes for each coin option */}
          {filteredOptions.map((coin) => (
            <label
              className={`w-full py-2 text-sm leading-5 text-left focus:outline-none hover:bg-light-list-hover transition duration-150 ease-in-out ${
                selectedCoins.includes(coin?.name) || selectedCoins.length >= 2
                  ? "text-gray-500 cursor-not-allowed"
                  : ""
              }`}
              key={coin?.id}
            >
              <input
                className="mx-4 text-sm"
                type="checkbox"
                disabled={
                  selectedCoins.length >= 2 &&
                  !selectedCoins.includes(coin?.name)
                }
                checked={selectedCoins.includes(coin?.name)}
                onChange={() => handleCheckboxChange(coin?.name, coin?.id)}
                onClick={() => {
                  setSearchTerm("");
                }}
              />
              {coin?.name}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

// Export the component
export default MultiCoinSelectionBtn;
