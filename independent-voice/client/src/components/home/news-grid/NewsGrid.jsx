import React from 'react';
import './news-grid.css';
import { Link } from 'react-router-dom';

const NewsGrid = () => {
  return (
    <>
    <div className="flex-container">
      <div className="flex-item big-item">1</div>
      <div className="small-items-container">
        <Link to='/Details/c4a3a739-92e8-411e-bc9b-11e5387a2f0f' className="flex-item small-item">2</Link>
        <a className="flex-item small-item">3</a>
        <a className="flex-item small-item">4</a>
        <a className="flex-item small-item">5</a>
      </div>
    </div>
    <div className="flex-bottom-container">
      <a className="flex-item small-item">6</a>
      <a className="flex-item small-item">7</a>
      <a className="flex-item small-item">8</a>
      <a className="flex-item small-item">9</a>
      <a className="flex-item small-item">10</a>
    </div>
  </>   
  );
};

export default NewsGrid;
