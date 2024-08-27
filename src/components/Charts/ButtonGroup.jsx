// React component rendering buttons for different time intervals (1D, 1W, 1M, 1Y) along with a calendar component.

// Library Imports
import React from "react";
import { useDispatch } from "react-redux";

// Redux action import
import { setIsCustomRange } from "../../common/cryptoSlice/cryptoSlice";

// Component Imports
import Calendar from "./Calendar";

const ButtonGroup = ({ chartDays, setDays, setSelectedValue, selectedValue }) => {
  // Redux dispatch hook
  const dispatch = useDispatch();

  // Function to handle button click and update state
  const handleClick = (value) => {
    setSelectedValue(value);
    setDays(value);
    dispatch(setIsCustomRange(false));
  };

  return (
    <div className="flex md:gap-1 gap-2 flex-wrap">
      <div className="flex flex-wrap md:gap-1 gap-2 pb-1">
        {/* Mapping through time intervals and rendering buttons */}
        {chartDays.map((day) => (
          <button
            key={day.value}
            className={`px-2 py-1 md:px-4 md:py-2 bg-light-button dark:bg-dark-button hover:bg-light-button-hover dark:hover:bg-dark-button-hover font-semibold shadow text-sm rounded outline-none focus:outline-none ${
              selectedValue === day.value
                ? "text-white bg-light-button-selected dark:bg-dark-button-selected hover:bg-light-button-selected-hover dark:hover:bg-dark-button-selected-hover"
                : "bg-light-button dark:bg-dark-button"
            }`}
            onClick={() => handleClick(day.value)}
          >
            {day.label}
          </button>
        ))}
      </div>
      {/* Rendering the Calendar component */}
      <div>
        <Calendar />
      </div>
    </div>
  );
};

export default ButtonGroup;
