import React from 'react';
import { Line } from 'react-chartjs-2';

const ChartComponent = ({ temp, time }) => {
  const data = {
    labels: time, // Assuming time is an array of labels
    datasets: [
      {
        label: 'Temperature',
        data: temp, // Assuming temp is an array of temperature values
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
};

export default ChartComponent;
