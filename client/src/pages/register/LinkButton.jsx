import React from 'react';
import '../../css/component.css';
import '../../css/login.css';
import { Link } from 'react-router-dom';

const LinkButton = (e) => {
  return (
    <div className='no-drag button link-button'>
      <Link to={e.link} className='links button-text'>
        {e.label}
      </Link>
    </div>
  );
};

export default LinkButton;
