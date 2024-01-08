import React from 'react';
import '../../css/component.css';
import '../../css/register.css';

const SubmitButton = (e) => {
  return (
    <button
      className='no-drag button submit-button'
      style={{
        width: e.width || 300 + 'px',
        height: e.height || 30 + 'px',
      }}
      type={e.type}
    >
      <div className='button-text'>{e.label}</div>
    </button>
  );
};

export default SubmitButton;
