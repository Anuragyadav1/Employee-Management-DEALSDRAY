import React from 'react';
import './404Page.css';

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <p>You can go back to the homepage or check the URL for mistakes.</p>
      <a href="/" className="home-link">Go to Homepage</a>
    </div>
  );
};

export default NotFoundPage;
