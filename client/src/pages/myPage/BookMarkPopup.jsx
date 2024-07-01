import util from 'comm/util';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { isLoginSelector } from 'comm/recoil/TokenAtom';

import useModals from '../../hooks/useModals';
import { modals } from '../../comm/Modals';
import Modal from 'react-modal';
import BookMarkLstPopup from './BookMarkLstPopup';
import TextBox from 'pages/register/TextBox';

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

  const [bookmarkLst, setBookmarkLst] = useState([]);
  const [bookmarkTitle, setBookmarkTitle] = useState();
  const [networking, setNetworking] = useState(false);
  const [idx, setIdx] = useState(0);

  // init
  useEffect(() => {
    getUsrBookmark();
  }, []);

  useEffect(() => {
    console.log(idx);
    if (rdoBookmark.list.length > 1) rdoBookmark.list[idx].click();
  }, [bookmarkLst]);

  // userBookmark 가져오기
  const getUsrBookmark = async () => {
    const loadUrl = '/api/bookmark/getUsrBookmark';
    setNetworking(true);
    await axios
      .post(loadUrl, { _postId: props.props.content._id })
      .then((res) => {
        const data = res.data;
        console.log(data);
        if (data.success) {
          setBookmarkLst(data.bookmark);
        }
        setNetworking(false);

        data.bookmark.forEach((val,idx) => {if (data.selectedBookmark[1]._bookmarkTypeId === val._id) {
          setIdx(idx);
        }});
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
      _bookmarkTypeId: bookmarkTitleId,
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

  const fnNewBookmarkGrp = (e) => {
    if (!isLogin) alertModal('로그인을 해주세요.');

    let bookmarkUrl = '/api/bookmark/createBookMarkType';

    const data = {
      bookmarkTitle: bookmarkTitle,
    };

    if (util.isEmpty(bookmarkTitle)) {
      return;
    } else {
      let sameChk = false; //동일한 북마크목록 존재여부
      bookmarkLst.map((item, idx) => {
        if (item.bookmarkTitle === bookmarkTitle) {
          sameChk = !sameChk;
        }
      });

      if (sameChk) {
        console.log('동일한 북마크 존재!');
      } else {
        try {
          axios
            .post(bookmarkUrl, data)
            .then((res) => {
              console.log(res, '북마크 추가 성공');
              setBookmarkTitle('');
              getUsrBookmark();
            })
            .catch((err) => {
              console.log(err, '북마크 추가 실패 ㅠㅠ');
            });
        } catch (err) {
          alert(err.response.data.message);
        }
      }
    }
  };

  return (
    <>
      <div className='ml15 mt15 h4'>내 북마크 리스트</div>
      <div className={'bookmark-list ' + (networking ? 'networking' : '')}>
        <div>
          <div className='h5 w150'>새 북마크 그룹 추가</div>
          <div className='input-form single mt15 mb25'>
            <input
              className='w250 mr20'
              type='text'
              placeholder='북마크 명 입력'
              onChange={(e) => {
                setBookmarkTitle(e.target.value);
              }}
              value={bookmarkTitle}
            />
            <div className='btn-group'>
              <div className='right mr10'>
                <button
                  type='submit'
                  className='btn-primary wd110'
                  onClick={fnNewBookmarkGrp}
                >
                  추가
                </button>
              </div>
            </div>
          </div>
          <hr />
        </div>

        <div className='list'>
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
