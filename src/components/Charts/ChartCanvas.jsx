// Component dynamically renders either a line chart or bar chart based on selected options, defaulting to line chart.
import React from "react";

// Import necessary chart components from react-chartjs-2 and custom HorizontalBarChart
import { Bar, Line } from "react-chartjs-2";
import HorizontalBarChart from "./HorizontalBarChart";

// Import Chart.js components for registration
import {
  BarElement, 
  CategoryScale, 
  Chart as ChartJS, 
  Legend, 
  LineElement, 
  LinearScale, 
  PointElement, 
  Tooltip } 
  from "chart.js";

// Import Redux hook for accessing global state
import { useSelector } from "react-redux";

// Register Chart.js components
ChartJS.register(
  BarElement, 
  LineElement, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  Legend, 
  Tooltip
  );

// Functional component rendering chart based on global store's selected chart type
const ChartCanvas = ({ data, options }) => {
  const chartType = useSelector((state) => state.globalStore.chartType);

  return (
    <div
      style={{
        position: "relative",
        width: "99%",
        height: "400px",
        marginTop: "1rem",
      }}>
      {chartType === "Bar Chart" ? (
        <Bar data={data} options={options} />
      ) : chartType === "Line Chart" ? (
        <Line data={data} options={options} /> 
      ) : (
        chartType === "Horizontal Bar Chart" ? (
          <HorizontalBarChart data={data} options={options} />
        ) : null
      )}
    </div>
  );
};

export default ChartCanvas;
