import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <h1>Welcome to "What Are You Doing Now?"</h1>
      <p>Start logging your activities!</p>
      <div className="home-buttons">
        <Link to="/log" className="btn">Log Activity</Link>
        <Link to="/history" className="btn">View History</Link>
      </div>
    </div>
  );
};

export default Home;