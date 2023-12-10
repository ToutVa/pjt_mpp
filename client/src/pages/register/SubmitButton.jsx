import React from 'react';
import '../../css/component.css';
import '../../css/login.css';

const SubmitButton = (e) => {
  return (
    <button className='no-drag button submit-button' type={e.type}>
      <div className='button-text'>{e.label}</div>
    </button>
  );
};

export default SubmitButton;
