// Library imports for React functionality
import React from "react";
import { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// File imports for Redux actions and selectors
import { setChartType } from "../../common/cryptoSlice/cryptoSlice";

// Dropdown component to select chart type (Line, Bar, Horizontal Bar)
const ChartType = () => {
  // Available chart options
  const charts = ["Line Chart", "Bar Chart", "Horizontal Bar Chart"];

  // State to manage dropdown visibility
  const [isOpen, setIsOpen] = useState(false);

  // Redux store state and dispatch
  const chartType = useSelector((state) => state.globalStore.chartType);
  const dispatch = useDispatch();

  // Ref for detecting clicks outside the dropdown to close it
  const ref = useRef();

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

  return (
    <div ref={ref} className="relative">
      {/* Button to toggle dropdown visibility */}
      <button
        className="relative px-4 py-2 rounded bg-light-button dark:bg-dark-button hover:bg-light-button-hover dark:hover:bg-dark-button-hover font-semibold text-sm flex items-center justify-between shadow"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className="px-4">{chartType}</p>
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

      {/* Dropdown list for selecting chart type */}
      <ul
        className={` absolute bg-light-fill dark:bg-dark-fill w-full overflow-y-auto border z-10 top-12 border-black dark:border-white ${
          isOpen ? "max-h-60" : "hidden"
        } `}
      >
        {charts?.map((chart) => (
          <li
            key={chart}
            className={`py-2 px-4 text-sm hover:bg-light-list-hover hover:text-white
          ${chart === chartType && ""}`}
            onClick={() => {
              // Dispatch action to set selected chart type and close the dropdown
              dispatch(setChartType(chart));
              setIsOpen(false);
            }}
          >
            {chart}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Export the component
export default ChartType;
