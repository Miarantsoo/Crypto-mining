import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { IResult } from "../../types/results";

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface BarChartProps {
  data: IResult[];
  color?: string;
}

const GenericBarChart: React.FC<BarChartProps> = ({ data, color = "#1C32C4" }) => {
  const chartData = {
    labels: data.map((item) => item.nom),
    datasets: [
      {
        label: "Valeur",
        data: data.map((item) => item.valeur),
        backgroundColor: color,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        titleFont: {
          family: "Space Grotesk", // Custom font
        },
        bodyFont: {
          family: "Space Grotesk", // Custom font
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            family: "Space Grotesk", // Custom font
          },
          color: "#333333", // Tailwind text-dark equivalent
        },
      },
      x: {
        ticks: {
          font: {
            family: "Space Grotesk", // Custom font
          },
          color: "#333333", // Tailwind text-dark equivalent
        },
      },
    },
  };

  return (
    <div className="bg-transparent py-5 px-5">
      <div className="text-dark font-body" style={{ height: "300px" }}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default GenericBarChart;
