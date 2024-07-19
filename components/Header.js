import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [paths, setPaths] = useState({
    home: '/',
    meetings: '/meetings',
    about: '/about',
    contact: '/contact',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      setPaths({
        ...paths,
      });
    } catch (e) {
      setError('Failed to load navigation paths');
      console.error(e);
    }
  }, []);

  if (error) {
    return <header>Error loading navigation</header>;
  }

  return (
    <header>
      <nav>
        <ul>
          {Object.entries(paths).map(([key, value]) => (
            <li key={key}>
              <Link to={value}>{key.charAt(0).toUpperCase() + key.slice(1)}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;