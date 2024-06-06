import util from 'comm/util';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { isLoginSelector } from 'comm/recoil/TokenAtom';

import useModals from '../../hooks/useModals';
import { modals } from '../../comm/Modals';
import Modal from 'react-modal';
import BookMarkLstPopup from './BookMarkLstPopup';

const BookMarkPopup = (props) => {
  const { openModal } = useModals();
  const isLogin = useRecoilValue(isLoginSelector);
  const alertModal = (msg) => {
    openModal(modals.alertModal, {
      msg: msg,
    });
  };

  const [clicked, setClicked] = useState(0);
  const rdoBookmark = util.makeRaioGroup('bookmark');

  const [bookmarkLst, setBookmarkLst] = useState([
    
  ]);

  // init
  useEffect(() => {
    getUsrBookmark();
  }, []);

  // userBookmark 가져오기
  const getUsrBookmark = async () => {
    const loadUrl = '/api/bookmark/getUsrBookmark';
    await axios
      .post(loadUrl)
      .then((res) => {
        const data = res.data;
        console.log(data);
        if (data.success) {
          setBookmarkLst(data.bookmark);
        }
      })
      .catch(
        (err) => {
          console.log(err);
        },
        [bookmarkLst]
      );
  };

  // bookmark 형태 변경
  const fnChangeBookmark = (e) => {
    if (!isLogin) alertModal('로그인을 해주세요.');
    
    debugger;
    const bookmarkTitleId = bookmarkLst[clicked]?._id;

    const btnId = `btnBookmark${props.props.content._id}`;
    const btnRes = document.getElementById(btnId);

    let bookmarkUrl = '';

    if (btnRes.className === 'bookmark') {
      bookmarkUrl = '/api/bookmark/delete';
    } else {
      bookmarkUrl = '/api/bookmark/create';
    }

    const _postId = props.props.content._id;
    const data = {
      _postId: _postId,
      _bookmarkTypeId : bookmarkTitleId
    };

    try {
      axios
        .post(bookmarkUrl, data)
        .then((res) => {
          if (btnRes.className === 'bookmark') {
            btnRes.className = 'unbookmark';
          } else {
            btnRes.className = 'bookmark';
          }

          // const AlertModal = ({ onSubmit, onClose, msg, wid, hei })
          const opt = {
            msg: 'res.data.message',
          };

          util.alert(opt);
          // return(<AlertModal msg="res.data.message" />);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  //북마크 클릭
  const BookMarkLstModalButton = (e) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    return (
      <>
        <button
          type='button'
          id = {'btnBookmarkLst'}
          className={''}
          onClick={() => {
            setModalIsOpen(true);
          }}
          
        >
          {'새 리스트 만들기'}
        </button>
        <Modal
          className='test'
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          ariaHideApp={false}
        >
          <div className='header'>
            <div />
            <div className='title ml20'>북마크 만들기</div>
            <div
              className='close'
              onClick={() => {
                setModalIsOpen(false);
              }}
            />
          </div>
          <BookMarkLstPopup props={props}  />
          <div className='btn-group mt10'>
            <div className='right mr10'>
              {/* <button
                type='submit'
                className='btn-primary wd110'
                onClick={(param) => {
                  setModalIsOpen(false);
                }}
              >
                저장
              </button> */}
            </div>
          </div>
        </Modal>
      </>
    );

  };

  return (
    <>
      <div>내 북마크 리스트</div>
      <div className='bookmark-list'>
        <BookMarkLstModalButton/>
        {bookmarkLst.map((item, idx) => {
          return (
            <>
              <input
                className='hide'
                key={idx}
                type='radio'
                id={'bookmark_' + idx}
                name='bookmark'
                value={item._id}
                onChange={() => {
                  setClicked(idx);
                }}
              />
              <label htmlFor={'bookmark_' + idx} className='text'>
                {item.bookmarkTitle}
              </label>
            </>
          );
        })}
      </div>

      <div className='btn-group mt10'>
        <div className='right mr10'>
          
          <button
            type='submit'
            className='btn-primary wd110'
            onClick={fnChangeBookmark}
          >
            저장
          </button>
        </div>
      </div>
    </>
  );
};
export default BookMarkPopup;
