import React from 'react';
import { Link } from 'react-router-dom';

const Banner = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold mb-5">Wanna start your task manager today?</h1>
          <Link to={'/dashboard'}>
            <button className="btn btn-primary">Let’s Explore</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
