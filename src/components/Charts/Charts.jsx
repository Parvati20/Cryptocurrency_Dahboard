// Library and file imports
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Function imports for fetching, filtering, and styling data
import {
  clearData,
  fetchAsyncHistoricData,
} from "../../common/cryptoSlice/chartSlice";
import { getAllCoins } from "../../common/cryptoSlice/coinsSlice";
import { compactNumbers } from "../../common/miscelleneous/compactNumbers";
import { filteredData } from "../../common/miscelleneous/filterData";
import { getRandomColor } from "../../common/miscelleneous/randomColor";

// Component imports
import ButtonGroup from "./ButtonGroup";
import ChartCanvas from "./ChartCanvas";
import HorizontalBarChart from "./HorizontalBarChart";
import ChartType from "./ChartType";
import MultiCoinSelectionBtn from "./MultiCoinSelectionBtn";
import { chartDays } from "./days";

// Main component for rendering charts based on selected coins, date ranges, and chart type
const Charts = () => {
  const dispatch = useDispatch();
  const [days, setDays] = useState(1);
  const [selectedValue, setSelectedValue] = useState(null);

  // Redux store state variables
  const currency = useSelector((state) => state.globalStore.currency);
  const symbol = useSelector((state) => state.globalStore.symbol);
  const isCustomRange = useSelector((state) => state.globalStore.isCustomRange);
  const chartType = useSelector((state) => state.globalStore.chartType);
  const coinIDs = useSelector((state) => state.globalStore.coinIDs);
  const marketCapData = useSelector((state) => state.market.data);
  const loading = useSelector((state) => state.market.loading);

  // Function to fetch historical data based on selected parameters
  const fetchData = () => {
    if (coinIDs.length > 0) {
      coinIDs.forEach((id) => {
        dispatch(fetchAsyncHistoricData({ id, currency, days }));
      });
    }
  };

  // Effect to fetch data when currency, coinIDs, or days change
  useEffect(() => {
    if (!isCustomRange) {
      fetchData();
      dispatch(clearData());
    }
  }, [currency, coinIDs, days]);

  // Redux selector to get all available coins
  const coins = useSelector(getAllCoins);

  // Filtered data for the selected coin
  const cdata = coinIDs.length > 0 && marketCapData[coinIDs[0]]
    ? filteredData(marketCapData[coinIDs[0]])
    : [];

  // Debugging statements
  console.log('marketCapData:', marketCapData);
  console.log('coinIDs:', coinIDs);
  console.log('cdata:', cdata);

  // Loading indicator
  if (loading) {
    return <div className="h-[260px] text-center p-4">Loading...</div>;
  }

  // Labels for the chart based on the selected date range
  const labels = cdata.map((data) => {
    let date = new Date(data[0]);
    let time =
      date.getHours() > 12
        ? `${date.getHours() - 12} PM`
        : `${date.getHours()} AM`;
    return days === 1
      ? time
      : date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  });

  // Datasets for the chart based on selected coins
  const datasets = Object.keys(marketCapData || {}).map((id) => ({
    label: id,
    data: (filteredData(marketCapData[id]) || []).map((datum) => datum[1]),
    fill: false,
    borderColor: getRandomColor(),
    tension: 0.1,
    pointColor: getRandomColor(),
    backgroundColor: getRandomColor(),
    hitRadius: 20,
    hoverRadius: 5,
  }));

  // Chart data object
  const data = {
    labels: labels,
    datasets: datasets,
  };

  // Chart scale options for normal and horizontal bar charts
  const normalChartScale = {
    y: {
      ticks: {
        callback: function (value, index, ticks) {
          return `${symbol}` + compactNumbers(value);
        },
        maxTicksLimit: 7,
        grid: {
          borderWidth: 2,
          borderDash: [5, 5],
          borderDashOffset: 2,
        },
      },
    },
  };

  const horizontalBarChartScale = {
    x: {
      ticks: {
        callback: function (value, index, ticks) {
          return `${symbol}` + compactNumbers(value);
        },
        maxTicksLimit: 7,
        grid: {
          borderWidth: 2,
          borderDash: [5, 5],
          borderDashOffset: 2,
        },
      },
    },
  };

  // Chart options
  const options = {
    indexAxis: chartType === "Horizontal Bar Chart" ? 'y' : 'x',
    interaction: {
      intersect: false,
      mode: "index",
    },
    aspectRatio: 2,
    responsive: true,
    maintainAspectRatio: false,
    scales: chartType === "Horizontal Bar Chart" ? horizontalBarChartScale : normalChartScale,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += `${symbol}` + compactNumbers(context.parsed.y);
            }
            return label;
          },
        },
      },
      title: {
        display: true,
        text: "Charts Canvas",
      },
      datalabels: {
        display: false,
      },
      legend: {
        position: "top",
        fullWidth: false,
        labels: {
          color: "#5C5C5C",
          usePointStyle: true,
          font: {
            size: 12,
            weight: "bold",
          },
        },
      },
    },
  };

  // Render the component
  return (
    <Fragment>
      {marketCapData && (
        <div className="bg-light-fill dark:bg-dark-fill rounded-lg">
          <div className="flex justify-around pt-4 flex-wrap gap-1">
            <ButtonGroup
              chartDays={chartDays}
              setDays={setDays}
              setSelectedValue={setSelectedValue}
              selectedValue={selectedValue}
            />
            <div className="flex gap-2 items-center justify-center flex-wrap">
              <MultiCoinSelectionBtn coins={coins} />
              <ChartType />
            </div>
          </div>
          <ChartCanvas data={data} options={options} />
        </div>
      )}
    </Fragment>
  );
};

// Export the component
export default Charts;
