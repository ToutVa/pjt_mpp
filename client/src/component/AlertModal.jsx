import React from 'react';
import Modal from 'react-modal';
import '../css/layout.css';

const AlertModal = ({ onSubmit, onClose, msg, wid, hei }) => {
  const handleClickSubmit = () => {
    if (onSubmit === undefined) {
      onClose();
    } else {
      onSubmit();
    }
  };

  const handleClickCancel = () => {
    onClose();
  };

  return (
    <Modal
      isOpen
      style={{
        content: {
          width: wid || 400 + 'px',
          height: hei || 200 + 'px',
          left: 'calc(50% - ' + (wid || 400) / 2 + 'px)',
          top: 'calc(50% - ' + (hei || 200) / 2 + 'px)',
          padding: '0px',
          borderRadius: '20px',
        },
      }}
      onRequestClose={handleClickCancel}
    >
      <div className='message-main'>
        {msg}
        <button
          className='button submit-button mt20'
          style={{
            width: '70px',
            height: '30px',
          }}
          onClick={handleClickSubmit}
        >
          <div className='button-text'>확인</div>
        </button>
      </div>
    </Modal>
  );
};

export default AlertModal;
