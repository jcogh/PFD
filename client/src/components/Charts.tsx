import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

interface ChartProps {
  data: number[];
  labels?: string[];
}

interface BarChartProps extends ChartProps {
  colors: string[];
}

interface LineChartProps extends ChartProps {
  color: string;
}

export const BarChart: React.FC<BarChartProps> = ({ data, labels, colors }) => {
  const chartData = {
    labels: labels || data.map((_, index) => `Item ${index + 1}`),
    datasets: [{
      data,
      backgroundColor: colors,
      borderColor: colors,
      borderWidth: 1,
    }],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: '#c0caf5' },
        grid: { color: '#3a3c4c' },
      },
      x: {
        ticks: { color: '#c0caf5' },
        grid: { color: '#3a3c4c' },
      },
    },
    plugins: {
      legend: { display: false },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export const LineChart: React.FC<LineChartProps> = ({ data, labels, color }) => {
  const chartData = {
    labels: labels || data.map((_, index) => `Point ${index + 1}`),
    datasets: [{
      data,
      borderColor: color,
      backgroundColor: 'rgba(122, 162, 247, 0.1)',
      tension: 0.1,
    }],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: '#c0caf5' },
        grid: { color: '#3a3c4c' },
      },
      x: {
        ticks: { color: '#c0caf5' },
        grid: { color: '#3a3c4c' },
      },
    },
    plugins: {
      legend: { display: false },
    },
  };

  return <Line data={chartData} options={options} />;
};
