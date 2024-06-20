import React from 'react';
import '../CSS/adminCard.css'; 

interface CardProps {
  path: string;
  label: string;
}

const Card: React.FC<CardProps> = ({ path, label}) => {
  return (
    <div className="card">
      <a href={path} className="card-link">
       
        <h3>{label}</h3>
      </a>
    </div>
  );
};

export default Card;
