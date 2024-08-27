import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

// Registering necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const PieChart = ({ data, labels }) => {
  // Data configuration for the pie chart
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "$",
        data: data,
        backgroundColor: ["gray", "blue", "green"],
        borderWidth: 1,
        hoverOffset: 8,
      },
    ],
  };

  // Options configuration for the pie chart
  const options = {
    aspectRatio: 2,
    plugins: {
      // Legend configuration
      legend: {
        position: "right",
        fullWidth: false,
        labels: {
          color: "#5c5c5c",
          padding: 20,
          usePointStyle: true,
          font: {
            size: 12,
            weight: "bold",
          },
        },
      },
      // Data labels configuration
      datalabels: {
        align: "center",
        color: "#FFF",
        font: {
          size: 18,
          weight: "bold",
        },
        formatter: (value, context) => {
          return "$" + value;
        },
      },
    },
  };

  // Plugins configuration for the pie chart
  const plugins = {
    plugins: [ChartDataLabels],
  };

  return (
    // Container for the pie chart
    <div className="pl-5 flex items-center justify-center pt-4 pb-4 w-[350px]">
      {/* Pie chart component */}
      <Pie data={chartData} options={options} plugins={plugins}></Pie>
    </div>
  );
};

export default PieChart;
