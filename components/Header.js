import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HeaderComponent = () => {
  const [navigationPaths, setNavigationPaths] = useState({
    home: '/',
    meetings: '/meetings',
    about: '/about',
    contact: '/contact',
  });
  const [navigationError, setNavigationError] = useState('');

  useEffect(() => {
    try {
      setNavigationPaths({
        ...navigationPaths,
      });
    } catch (error) {
      setNavigationError('Failed to load navigation paths');
      console.error(error);
    }
  }, []);

  if (navigationError) {
    return <header>Error loading navigation</header>;
  }

  return (
    <header>
      <nav>
        <ul>
          {Object.entries(navigationPaths).map(([pathKey, pathValue]) => (
            <li key={pathKey}>
              <Link to={pathValue}>{pathKey.charAt(0).toUpperCase() + pathKey.slice(1)}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default HeaderComponent;