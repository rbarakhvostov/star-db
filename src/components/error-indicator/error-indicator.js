import React from 'react';
import './error-indicator.css';
import icon from './death-star.png';

const ErrorIndicator = () => {
  return (
    <div className='error-indicator'>
      <img src={icon} alt='error-icon'/>
      <p className='boom'>BOOM!</p>
      <p>
        something has gone terribly wrong
      </p>
      <p>
        (but we've already sent droids to fix it)
      </p>
    </div>
  );
}

export default ErrorIndicator;
