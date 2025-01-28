"use client";
import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale, // x-axis
  LinearScale, // y-axis
  PointElement,
  Legend,
  Tooltip,
  Filler,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  Filler
);

function ChartLine() {
  // Example data
  const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]; // Months
  const productsSoldData = [100, 120, 90, 150, 200, 180, 210]; // Number of products sold

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Products Sold",
        data: productsSoldData,
        borderColor: "blue",
        borderWidth: 3,
        pointBorderColor: "blue",
        pointBorderWidth: 3,
        fill: true,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, "blue");
          gradient.addColorStop(1, "white");
          return gradient;
        },
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
      },
    },
    responsive: true,
    scales: {
      y: {
        ticks: {
          font: {
            size: 15,
            weight: "bold",
          },
        },
      },
      x: {
        ticks: {
          font: {
            size: 15,
            weight: "bold",
          },
        },
      },
    },
  };

  return (
    <div
      style={{
        width: "100%",
        height: "400px",
        background: "white",
        padding: "0px 20px",
        display: "grid",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        borderRadius: "4px",
        boxShadow:
          "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
      }}
    >
      <Line className="w-full" data={data} options={options} />
    </div>
  );
}

export default ChartLine;