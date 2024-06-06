import util from 'comm/util';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { isLoginSelector } from 'comm/recoil/TokenAtom';

import useModals from '../../hooks/useModals';
import { modals } from '../../comm/Modals';
import TextBox from 'pages/register/TextBox';

const BookMarkLstPopup = (props) => {
  const { openModal } = useModals();
  const isLogin = useRecoilValue(isLoginSelector);
  const alertModal = (msg) => {
    openModal(modals.alertModal, {
      msg: msg,
    });
  };
  const [bookmarkTitle, setBookmarkTitle] = useState();

  // init
  useEffect(() => {}, []);

  // bookmark 형태 변경
  const fnChangeBookmark = (e) => {
    if (!isLogin) alertModal('로그인을 해주세요.');

    let bookmarkUrl = '/api/bookmark/createBookMarkType';

    const data = {
      bookmarkTitle: bookmarkTitle,
    };

    try {
      axios
        .post(bookmarkUrl, data)
        .then((res) => {
          modals.openModal(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <>
      <div>북마크 리스트 추가</div>

      <div className='btn-group mt10'>
        <TextBox
          id='inputId'
          type='text'
          placeholder='북마크 명 입력'
          onChange={(e) => {
            setBookmarkTitle(e.target.value);
          }}
        />
        <div className='right mr10'>
          <button
            type='submit'
            className='btn-primary wd110'
            onClick={fnChangeBookmark}
          >
            추가
          </button>
        </div>
      </div>
    </>
  );
};
export default BookMarkLstPopup;
