import React, { useState } from 'react';
import { Tab, Tabs, Box } from '@mui/material';
import { Line, Doughnut } from 'react-chartjs-2'; // Use Doughnut instead of Pie
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend, ArcElement);

const AnalyticsPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('daily');
  const [incomePeriod, setIncomePeriod] = useState('weekly');

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
    income: {
      weekly: [5000, 5500, 6000, 6500, 7000, 7500, 8000, 8500, 9000, 9500],
      monthly: [22000, 24000, 26000, 28000, 30000, 32000, 34000, 36000, 38000, 40000],
    },
  };

  const satisfactionData = {
    labels: ['Satisfied', 'Neutral', 'Unsatisfied'],
    datasets: [
      {
        data: [60, 30, 10],
        backgroundColor: ['#36A2EB', '#FFCE56', '#FF5733'],
      },
    ],
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

  const generateIncomeLabels = () => {
    switch (incomePeriod) {
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

  const incomeChartData = () => {
    return {
      labels: generateIncomeLabels(),
      datasets: [
        {
          label: 'Income',
          data: data.income[incomePeriod],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
      ],
    };
  };

  const satisfactionOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.raw}%`, // Show the percentage in the tooltip
        },
      },
    },
    elements: {
      arc: {
        borderWidth: 2,
      },
    },
    responsive: true,
    maintainAspectRatio: false, // Ensure it adapts properly to the parent container
  };

  // Reviews data
  const reviews = [
    { username: "User1", rating: 5, review: "Great experience!" },
    { username: "User2", rating: 4, review: "Very good, but could be better." },
    { username: "User3", rating: 3, review: "It's okay, nothing special." },
    { username: "User4", rating: 2, review: "Not satisfied with the service." },
    { username: "User5", rating: 1, review: "Horrible experience." },
  ];

  const calculateAverageRating = () => {
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (totalRating / reviews.length).toFixed(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:ml-64">

      <div className="bg-gray-300 p-4 mt-0 rounded-lg">
        <div className="h-4">
          <Box sx={{ width: '100%' }}>
            <Tabs value={selectedPeriod} onChange={(e, newValue) => setSelectedPeriod(newValue)} centered>
              <Tab label="Daily" value="daily" />
              <Tab label="Weekly" value="weekly" />
              <Tab label="Monthly" value="monthly" />
            </Tabs>
          </Box>
        </div>
        <h1 className="text-xl font-semibold mb-0">Growth Rate Analytics :</h1>

        {/* Growth Rate Graphs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
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

      {/* Income Rate, Doughnut Chart, and Reviews */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6 mt-5">
        
        {/* Income Rate Graph */}
        <div className="flex flex-col p-4 bg-gray-300 shadow-md rounded-lg">
          <div className="h-4 mb-8">
            <Box sx={{ width: '145%', marginTop: '2rem' }}>
              <Tabs value={incomePeriod} onChange={(e, newValue) => setIncomePeriod(newValue)} centered>
                <Tab label="Weekly" value="weekly" />
                <Tab label="Monthly" value="monthly" />
              </Tabs>
            </Box>
          </div>
          <div className="p-0 mt-1 mb-4">
            <h3 className="text-xl font-medium mb-2">Income Rate :</h3>
            <div className="p-3 ml-1 bg-white shadow-md rounded-lg mt-8">
             <Line data={incomeChartData()} />

            </div>
          </div>
        </div>

        {/* Customer Satisfaction Doughnut Chart */}
        <div className="flex flex-col items-center p-4 bg-white shadow-md rounded-lg mb-0">
          <h3 className="text-xl font-medium mb-2 mt-2">Customer Satisfaction</h3>
          <div className="p-6">
            <div className="relative w-full" style={{ height: '270px' }}>
              <Doughnut data={satisfactionData} options={satisfactionOptions} />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl font-semibold">
                60%
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="p-8 bg-white shadow-md rounded-lg">
          <h3 className="text-xl font-medium mb-2">User Reviews</h3>
          <p className="text-lg mb-4">Average Rating: {calculateAverageRating()} / 5</p>
          <div className="space-y-4">
            {reviews.map((review, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="text-sm font-semibold">{review.username}:</div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < review.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 15l-5.62 3.22 1.08-6.3-4.58-4.47 6.35-.92L10 0l2.67 5.53 6.35.92-4.58 4.47 1.08 6.3L10 15z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                </div>
                <p className="ml-2 text-sm text-gray-600">{review.review}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
