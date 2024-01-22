import FeedItem from './FeedItem';
import 'css/feed.css';
import { useSetRecoilState } from 'recoil';
import { loginModalState } from 'comm/recoil/PopupAtom';

const Feed = () => {
  const setLoginModalState = useSetRecoilState(loginModalState);
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
        <div className='center'>
          <FeedItem content='1' key={0} />
          <FeedItem content='1' key={1} />
          <FeedItem content='1' key={2} />
          <FeedItem content='1' key={3} />
          <FeedItem content='1' key={4} />
          <FeedItem content='1' key={5} />
          <FeedItem content='1' key={6} />
          {/* <FeedContent /> */}
        </div>
        <div className='right'>right Side</div>
      </div>
    </>
  );
};
export default Feed;
