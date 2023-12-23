// components/RobotDetailsCard.js
import React from 'react';

const RobotDetailsCard = ({ title, value, unit, color }) => {
  return (
    <div className="robot-details-card" style={{ backgroundColor: color }}>
      <h3>{title}</h3>
      <p className="value">
        {value} {unit}
      </p>
    </div>
  );
};

export default RobotDetailsCard;