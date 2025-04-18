import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useTheme } from '../context/ThemeContext';

const NotFound = () => {
  const { isDark } = useTheme();

  return (
    <div className="text-center py-5">
      <h1 className="display-1">404</h1>
      <h2 className="mb-4">Page Not Found</h2>
      <p className="lead mb-4">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Button
        as={Link}
        to="/"
        variant={isDark ? 'light' : 'dark'}
      >
        Return Home
      </Button>
    </div>
  );
};

export default NotFound;