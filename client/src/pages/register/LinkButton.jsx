import React from 'react';
import '../../css/component.css';
import '../../css/register.css';
import { Link } from 'react-router-dom';

const LinkButton = (e) => {
  return (
    <div>
      <Link
        to={e.link}
        className='no-drag button link-button links button-text'
        style={{
          'width': e.width || 300 + 'px',
          'height': e.height || 30 + 'px',
        }}
        onClick={() => {
          e.onClick();
        }}
      >
        {e.label}
      </Link>
    </div>
  );
};

export default LinkButton;
