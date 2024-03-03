import MyFeedContent from './MyFeedContent';

const MyFeed = () => {
  return (
    <>
      <p className='pin'>내 게시글</p>
      <div className='my-feed'>
        <div className='container-three'>
          <MyFeedContent />
        </div>
      </div>
    </>
  );
};

export default MyFeed;
