import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CategoryBarChart = ({ data }) => {
  if (!data || data.length === 0) return null;

  const chartData = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        label: 'Tasks',
        data: data.map((item) => item.count),
        backgroundColor: data.map((item) => item.color || 'rgba(99, 102, 241, 0.8)'),
        borderColor: data.map((item) => item.color || 'rgba(99, 102, 241, 1)'),
        borderWidth: 1,
        borderRadius: 6,
        barThickness: 40,
        maxBarThickness: 50
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.raw} tasks`
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          display: false
        },
        ticks: {
          stepSize: 1,
          font: {
            size: 11
          }
        }
      },
      y: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 12
          }
        }
      }
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Tasks by Category
      </h3>
      <div className="h-64">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default CategoryBarChart;
