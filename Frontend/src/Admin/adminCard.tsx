import React from 'react';
import '../CSS/adminCard.css'; // Import styles for the card

interface CardProps {
  path: string;
  label: string;
  icon: React.ComponentType<any>; // Icon component type
}

const Card: React.FC<CardProps> = ({ path, label, icon }) => {
  return (
    <div className="card">
      <a href={path} className="card-link">
        {icon && <icon className="card-icon" />}
        <h3>{label}</h3>
      </a>
    </div>
  );
};

export default Card;
