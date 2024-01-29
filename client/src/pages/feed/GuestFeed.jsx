import { useState } from 'react';
import FeedContent from './FeedContent';
import 'css/feed.css';
import { useSetRecoilState } from 'recoil';
import { loginModalState } from 'comm/recoil/PopupAtom';

const Feed = () => {
  const setLoginModalState = useSetRecoilState(loginModalState);
  const [isEod, setIsEod] = useState(false);

  return (
    <>
      <div className='feed main-frame'>
        <div className='left'>
          <div className='side'>
            <div
              className='un-login'
              onClick={() => {
                setLoginModalState(true);
              }}
            >
              <label>로그인을 해주세요.</label>
            </div>
          </div>
        </div>
        <div className='center' id='feed'>
          <FeedContent setIsEod={setIsEod} />
          {isEod ? <div>EOD </div> : <div></div>}
        </div>
        <div className='right'>right Side</div>
      </div>
    </>
  );
};
export default Feed;
