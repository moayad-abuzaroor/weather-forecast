import React, { useRef, useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register the required modules
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const HourlyForecastChart = ({ hourlyData }) => {
  const chartRef = useRef(null);
  const [gradient, setGradient] = useState(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.canvas.getContext("2d");

      // Create a gradient color fill
      const newGradient = ctx.createLinearGradient(0, 0, 0, 400);
      newGradient.addColorStop(0, "rgba(255, 165, 0, 0.8)"); // Start color
      newGradient.addColorStop(1, "rgba(255, 165, 0, 0)");   // End color
      setGradient(newGradient);
    }
  }, []);

  if (!hourlyData.length) return null;

  const labels = hourlyData.map((hour) => hour.time);
  const temps = hourlyData.map((hour) => hour.temp);

  const data = {
    labels,
    datasets: [
      {
        label: "Temperature (°C)",
        data: temps,
        borderColor: "orange",
        backgroundColor: gradient, // Use the gradient
        fill: true,
        tension: 0.4, // Smooth lines
        pointRadius: 5, // Larger points
        pointHoverRadius: 8, // Hover effect
        pointBackgroundColor: "white", // Circle color
        pointBorderColor: "orange",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.7)", // Dark tooltip
        titleColor: "white",
        bodyColor: "white",
        borderWidth: 1,
        borderColor: "orange",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Time",
          color: "orange",
          font: {
            size: 14,
            weight: "bold",
          },
        },
        ticks: {
          color: "gray",
        },
      },
      y: {
        title: {
          display: true,
          text: "Temperature (°C)",
          color: "orange",
          font: {
            size: 14,
            weight: "bold",
          },
        },
        ticks: {
          color: "gray",
          stepSize: 5,
        },
        grid: {
          color: "rgba(255, 165, 0, 0.2)", // Light orange grid
        },
      },
    },
  };

  return (
    <div style={{ height: "300px", marginTop: "20px" }}>
      <Line ref={chartRef} data={data} options={options} />
    </div>
  );
};

export default HourlyForecastChart;
