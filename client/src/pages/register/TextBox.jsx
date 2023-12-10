import React from 'react';
import '../../css/component.css';
import '../../css/login.css';

const TextBox = (e) => {
  return (
    <div className='textBox'>
      <input
        className='input'
        id={e.id}
        type={e.type}
        value={e.value}
        placeholder={e.placeholder}
        onChange={e.onChange}
      />
    </div>
  );
};

export default TextBox;
