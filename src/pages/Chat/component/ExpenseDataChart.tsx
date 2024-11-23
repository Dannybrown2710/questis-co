import React from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

// HTML Legend Plugin
const htmlLegendPlugin = {
  id: "htmlLegend",
  afterUpdate(chart, args, options) {
    const ul = getOrCreateLegendList(chart, options.containerID);
    const chartData = options.mockChartData; // Access mockChartData from options

    // Remove old legend items
    while (ul.firstChild) {
      ul.firstChild.remove();
    }

    // Reuse the built-in legendItems generator
    const items = chart.options.plugins.legend.labels.generateLabels(chart);

    items.forEach((item, index) => {
      const li = document.createElement("li");
      li.style.alignItems = "center";
      li.style.cursor = "pointer";
      li.style.display = "flex";
      li.style.flexDirection = "row";
      li.style.justifyContent = "space-between";
      li.style.marginBottom = "2px";
      li.style.width = "100%";
      li.style.fontWeight = "600";
      li.onclick = () => {
        chart.setDatasetVisibility(
          item.datasetIndex,
          !chart.isDatasetVisible(item.datasetIndex)
        );
        chart.update();
      };

      // Color box
      const boxSpan = document.createElement("span");
      boxSpan.style.background = item.fillStyle;
      boxSpan.style.borderColor = item.strokeStyle;
      boxSpan.style.display = "inline-block";
      boxSpan.style.flexShrink = "0";
      boxSpan.style.height = "12px";
      boxSpan.style.marginRight = "8px";
      boxSpan.style.width = "12px";
      boxSpan.style.borderRadius = "50%";

      // Text (Label and Value)
      const textContainer = document.createElement("div");
      textContainer.style.display = "flex";
      textContainer.style.justifyContent = "space-between";
      textContainer.style.width = "100%";

      const label = document.createElement("span");
      label.style.color = item.fontColor;
      label.style.textDecoration = item.hidden ? "line-through" : "";
      label.style.fontSize = "14px";
      label.style.fontWeight = "500";
      label.style.color = "#333";
      label.textContent = item.text.toUpperCase();

      const value = document.createElement("span");
      value.style.fontSize = "14px";
      value.style.marginLeft = "auto";
      value.style.fontWeight = "500";
      value.textContent = `$${chartData[index].data[0]}`; // Use dataset value here

      textContainer.appendChild(label);
      textContainer.appendChild(value);

      li.appendChild(boxSpan);
      li.appendChild(textContainer);
      ul.appendChild(li);
    });
  },
};

const getOrCreateLegendList = (chart, id) => {
  const legendContainer: any = document.getElementById(id);
  let listContainer = legendContainer.querySelector("ul");

  if (!listContainer) {
    listContainer = document.createElement("ul");
    listContainer.style.display = "block"; // Ensure items are displayed vertically
    listContainer.style.margin = "0";
    listContainer.style.padding = "0";
    listContainer.style.listStyle = "none"; // Remove default list styling

    legendContainer.appendChild(listContainer);
  }

  return listContainer;
};

function ChatChartData({ mockChartData }) {
  console.log({ mockChartData });
  const chartData = {
    labels: [""],
    datasets: mockChartData,
  };

  const chartOptions: ChartOptions<"bar"> = {
    indexAxis: "y",
    scales: {
      x: { stacked: true, grid: { display: false }, ticks: { display: false } },
      y: { stacked: true, grid: { display: false }, ticks: { display: false } },
    },
    plugins: {
      legend: { display: false }, // Disable the default legend
      //@ts-ignore
      htmlLegend: { containerID: "legend-container", mockChartData }, // Pass mockChartData here
      tooltip: { enabled: false },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div>
      <p>
        Absolutely! Based on my research, a 5-day trip to Ireland would be
        roughly $1,900.
      </p>

      {/* Chart */}
      <div className="mt-4">
        <div className="w-full h-7">
          <Bar
            data={chartData}
            options={chartOptions}
            plugins={[htmlLegendPlugin]}
          />
        </div>
      </div>

      {/* Custom Legend */}
      <div id="legend-container" className="mt-4"></div>
    </div>
  );
}

export default ChatChartData;
