import React from 'react';
import Modal from 'react-modal';
import '../css/layout.css';
import { useRecoilState } from 'recoil';
import { alertModalState } from 'comm/recoil/PopupAtom';

const AlertModal = () => {
  const [modalState, setModalState] = useRecoilState(alertModalState);
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
        <button
          className='button submit-button mt20'
          style={{
            width: '70px',
            height: '30px',
          }}
          onClick={() =>
            setModalState({
              msg: '',
            })
          }
        >
          <div className='button-text'>확인</div>
        </button>
      </div>
    </Modal>
  );
};

export default AlertModal;
