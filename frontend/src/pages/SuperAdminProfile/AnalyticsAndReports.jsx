import React, { useState } from 'react';
import { Tab, Tabs, Box } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const AnalyticsPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('daily');

  const data = {
    daily: {
      institutes: [10, 15, 18, 25, 30, 35, 40, 45, 50, 55],
      teachers: [50, 60, 70, 85, 90, 100, 110, 120, 130, 140],
      students: [200, 220, 250, 280, 300, 320, 340, 360, 380, 400],
    },
    weekly: {
      institutes: [70, 75, 85, 95, 110, 120, 130, 140, 150, 160],
      teachers: [350, 380, 400, 440, 500, 550, 600, 650, 700, 750],
      students: [1400, 1500, 1600, 1700, 1800, 1900, 2000, 2100, 2200, 2300],
    },
    monthly: {
      institutes: [300, 350, 400, 450, 500, 550, 600, 650, 700, 750],
      teachers: [1500, 1600, 1700, 1800, 2000, 2200, 2400, 2600, 2800, 3000],
      students: [6000, 6500, 7000, 7500, 8000, 8500, 9000, 9500, 10000, 10500],
    },
  };

  // Generate labels based on the selected period
  const generateLabels = () => {
    switch (selectedPeriod) {
      case 'daily':
        return ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7', 'Day 8', 'Day 9', 'Day 10'];
      case 'weekly':
        return ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8', 'Week 9', 'Week 10'];
      case 'monthly':
        return ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6', 'Month 7', 'Month 8', 'Month 9', 'Month 10'];
      default:
        return [];
    }
  };

  const chartData = (type) => {
    return {
      labels: generateLabels(),
      datasets: [
        {
          label: `${type.charAt(0).toUpperCase() + type.slice(1)} Growth`,
          data: data[selectedPeriod][type],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
      ],
    };
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:ml-64">
      <h1 className="text-2xl font-semibold mb-6">Growth Rate Analytics</h1>
      
      <Box sx={{ width: '100%' }}>
        <Tabs value={selectedPeriod} onChange={(e, newValue) => setSelectedPeriod(newValue)} centered>
          <Tab label="Daily" value="daily" />
          <Tab label="Weekly" value="weekly" />
          <Tab label="Monthly" value="monthly" />
        </Tabs>
      </Box>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="p-4 bg-white shadow-md rounded-lg">
          <h3 className="text-xl font-medium mb-2">Institutes</h3>
          <Line data={chartData('institutes')} />
        </div>

        <div className="p-4 bg-white shadow-md rounded-lg">
          <h3 className="text-xl font-medium mb-2">Teachers</h3>
          <Line data={chartData('teachers')} />
        </div>

        <div className="p-4 bg-white shadow-md rounded-lg">
          <h3 className="text-xl font-medium mb-2">Students</h3>
          <Line data={chartData('students')} />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
