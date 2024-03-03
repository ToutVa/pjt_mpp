import 'css/myPage.css';

const Profile = () => {
  return (
    <div className='profile'>
      <div className='info'>
        <div className='picture' />
        <div>
          게시글
          <br />4
        </div>
        <div>
          팔로워
          <br />
          33.4k
        </div>
        <div>
          팔로우
          <br />
          192
        </div>
      </div>
      <div>
        <span className='name'>킹왕짱내계정</span>
      </div>
      <div>소개글을 입력하세요.</div>
    </div>
  );
};

export default Profile;
