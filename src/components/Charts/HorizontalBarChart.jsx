// React and Chart.js library imports
import React from "react";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";

// Chart.js components for registration
import {
  BarElement,
  LinearScale,
  PointElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  Tooltip,
} from "chart.js";

// Register necessary Chart.js components
ChartJS.register(
  BarElement,
  LinearScale,
  PointElement,
  CategoryScale,
  Legend,
  Tooltip
);

// Component for rendering a horizontal bar chart based on selected chart type
const HorizontalBarChart = ({ data, options }) => {
  // Retrieve the selected chart type from global state
  const chartType = useSelector((state) => state.globalStore.chartType);
  
  return (
    <div
      style={{
        position: "relative",
        width: "99%",
        height: "400px",
        marginTop: "1rem",
      }}>
      {/* Render the horizontal bar chart if the selected chart type is "Horizontal Bar Chart" */}
      {chartType === "Horizontal Bar Chart" ? (
        <Bar data={data} options={options} />
      ) : null}
    </div>
  );
};

// Export the component
export default HorizontalBarChart;
