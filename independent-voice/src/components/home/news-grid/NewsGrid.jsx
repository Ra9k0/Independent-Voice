import React from 'react';
import './news-grid.css';

const NewsGrid = () => {
  return (
    <>
    <div className="flex-container">
      <div className="flex-item big-item">1</div>
      <div className="small-items-container">
        <div className="flex-item small-item">2</div>
        <div className="flex-item small-item">3</div>
        <div className="flex-item small-item">4</div>
        <div className="flex-item small-item">5</div>
      </div>
    </div>
    <div className="flex-bottom-container">
      <div className="flex-item small-item">6</div>
      <div className="flex-item small-item">7</div>
      <div className="flex-item small-item">8</div>
      <div className="flex-item small-item">9</div>
      <div className="flex-item small-item">10</div>
    </div>
  </>   
  );
};

export default NewsGrid;
