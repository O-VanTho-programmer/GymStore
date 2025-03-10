"use client";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  Filler,
} from "chart.js";
import axios from "axios";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip, Filler);

function ChartLine({ transaction }) {
  const [revenue, setRevenue] = useState(0);
  const [productsSold, setProductsSold] = useState(0);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (transaction.length > 0) {
      processChartData();
    }

    const fetchRevenueAndSold = async () => {
      try {
        const start_date = selectedMonth
          ? `${selectedYear}-${String(selectedMonth).padStart(2, "0")}-01`
          : `${selectedYear}-01-01`;
        const end_date = selectedMonth
          ? `${selectedYear}-${String(selectedMonth).padStart(2, "0")}-31`
          : `${selectedYear}-12-31`;

        const res = await axios.get(`http://localhost:5000/api/get_revenue_and_sold`,{
          params: {
            start_date,
            end_date,
          }
        });

        setRevenue(res.data.total_revenue);
        setProductsSold(res.data.total_sold);
      } catch (err) {
        console.log(err);
      }
    }

    fetchRevenueAndSold();

  }, [transaction, selectedYear, selectedMonth]);

  const processChartData = () => {
    let filteredTransactions = transaction.map((t) => ({
      ...t,
      create_date: t.create_date.split("/").reverse().join("-"),
    }));

    let labels = [];
    let salesData = [];

    if (selectedMonth !== null) {
      labels = Array.from({ length: 31 }, (_, i) => `${i + 1}`);
      salesData = Array(31).fill(0);

      filteredTransactions
        .filter((t) => t.create_date.startsWith(`${selectedYear}-${String(selectedMonth).padStart(2, "0")}`))
        .forEach((t) => {
          const day = parseInt(t.create_date.split("-")[2]);
          salesData[day - 1] += parseFloat(t.price);
        });
    } else {
      // **Yearly View: Sales per month**
      labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      salesData = Array(12).fill(0);

      filteredTransactions
        .filter((t) => t.create_date.startsWith(`${selectedYear}`))
        .forEach((t) => {
          const month = parseInt(t.create_date.split("-")[1]) - 1;
          salesData[month] += parseFloat(t.price);
        });
    }

    setChartData({
      labels,
      datasets: [
        {
          label: selectedMonth !== null ? `Sales in ${selectedYear}-${selectedMonth}` : `Sales in ${selectedYear}`,
          data: salesData,
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
    });
  };

  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value));
    setSelectedMonth(null);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value === "all" ? null : parseInt(e.target.value));
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
    <div className='w-full flex flex-wrap lg:flex-nowrap gap-4'>
      <div className='flex flex-col items-center gap-4 w-full lg:w-1/5'>
        <div className='flex-col flex items-center p-4 border border-gray-300 bg-white shadow-md rounded-md w-full'>
          <h3 className='text-lg font-semibold'>Revenue</h3>
          <span className='text-lg md:text-xl lg:text-2xl text-green-600 h-full flex items-center justify-center text-center whitespace-normal md:whitespace-nowrap'>{revenue ? `${revenue}.000 vnd` : '0 vnd'}</span>
        </div>

        <div className='flex flex-col items-center p-4 border border-gray-300 bg-white shadow-md rounded-md w-full'>
          <h3 className='text-lg font-semibold whitespace-normal md:whitespace-nowrap'>Products sold</h3>
          <span className='text-lg md:text-xl lg:text-2xl text-blue-600 h-full flex items-center text-center'>{productsSold ? productsSold : 0}</span>
        </div>
      </div>
      <div className='w-full lg:w-4/5'>
        <div className="p-5 bg-white rounded-lg shadow-lg">
          {/* Filters */}
          <div className="flex gap-4 mb-4">
            <select value={selectedYear} onChange={handleYearChange} className="p-2 border rounded">
              {Array.from({ length: 5 }, (_, i) => (
                <option key={i} value={new Date().getFullYear() - i}>
                  {new Date().getFullYear() - i}
                </option>
              ))}
            </select>

            <select value={selectedMonth || "all"} onChange={handleMonthChange} className="p-2 border rounded">
              <option value="all">All Year</option>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {new Date(0, i).toLocaleString("en", { month: "long" })}
                </option>
              ))}
            </select>
          </div>

          {/* Chart */}
          <div style={{ width: "100%", height: "400px" }}>
            {chartData ? <Line data={chartData} options={options} /> : <p>Loading chart...</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChartLine;
