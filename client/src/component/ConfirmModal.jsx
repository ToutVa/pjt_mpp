import React from 'react';
import Modal from 'react-modal';
import '../css/layout.css';
import { useRecoilState } from 'recoil';
import { confirmModalState } from 'comm/recoil/PopupAtom';

const ConfirmModal = () => {
  const [modalState, setModalState] = useRecoilState(confirmModalState);
  return (
    <Modal
      style={{
        content: {
          width: modalState.width || 400 + 'px',
          height: modalState.height || 200 + 'px',
          left: 'calc(50% - ' + (modalState.width || 400) / 2 + 'px)',
          top: 'calc(50% - ' + (modalState.height || 200) / 2 + 'px)',
          padding: '0px',
          borderRadius: '20px',
        },
      }}
      isOpen={modalState.msg !== '' ? true : false}
      onRequestClose={() =>
        setModalState({
          msg: '',
        })
      }
      ariaHideApp={false}
    >
      <div className='message-main'>
        {modalState.msg}
        <div className='mt20' style={{ display: 'flex' }}>
          <button
            className='button submit-button'
            style={{
              width: '70px',
              height: '30px',
            }}
            onClick={() => {
              setModalState(true);
            }}
          >
            <div className='button-text'>예</div>
          </button>
          <button
            className='button link-button ml10'
            style={{
              width: '70px',
              height: '30px',
            }}
            onClick={() => setModalState({ msg: '' })}
          >
            <div className='button-text'>아니오</div>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
