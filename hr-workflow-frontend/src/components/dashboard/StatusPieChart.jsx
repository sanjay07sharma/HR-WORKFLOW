import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { TASK_STATUS_LABELS } from '../../config';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const StatusPieChart = ({ data }) => {
  if (!data) return null;

  const chartData = {
    labels: Object.keys(data).map((key) => TASK_STATUS_LABELS[key] || key),
    datasets: [
      {
        data: Object.values(data),
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',   // blue - new
          'rgba(245, 158, 11, 0.8)',   // yellow - in_progress
          'rgba(34, 197, 94, 0.8)'     // green - done
        ],
        borderColor: [
          'rgba(59, 130, 246, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(34, 197, 94, 1)'
        ],
        borderWidth: 2,
        hoverOffset: 4
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle',
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const value = context.raw;
            const percentage = ((value / total) * 100).toFixed(1);
            return `${context.label}: ${value} (${percentage}%)`;
          }
        }
      }
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Tasks by Status
      </h3>
      <div className="h-64">
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
};

export default StatusPieChart;
