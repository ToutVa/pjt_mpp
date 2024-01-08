import React from 'react';
import '../../css/component.css';
import '../../css/register.css';

const TextBox = (e) => {
  return (
    <div
      className='textBox'
      style={{
        'width': e.width || 300 + 'px',
        'height': e.height || 30 + 'px',
      }}
    >
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
