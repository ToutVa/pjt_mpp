import React from 'react';
import Modal from 'react-modal';
import '../css/layout.css';

const ConfirmModal = ({ onSubmit, onClose, msg, wid, hei }) => {
  const handleClickSubmit = () => {
    onSubmit();
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
        <div className='mt20' style={{ display: 'flex' }}>
          <button
            className='button submit-button'
            style={{
              width: '70px',
              height: '30px',
            }}
            onClick={handleClickSubmit}
          >
            <div className='button-text'>예</div>
          </button>
          <button
            className='button link-button ml10'
            style={{
              width: '70px',
              height: '30px',
            }}
            onClick={handleClickCancel}
          >
            <div className='button-text'>아니오</div>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
