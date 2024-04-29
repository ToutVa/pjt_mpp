import 'css/setting.css';

const SettingMain = () => {
  return (
    <div className="main-frame setting">
      <div className="left"></div>
      <div className="center">
        <div className='profile'>
          <div className='info'>
            <div className='picture' />
            <div>
              <span className='id'>ec_jung</span><br/>
              <span className='name'>정의창</span>
            </div>
          </div>
          <div className='btn-group'>
            <div className='right'>
              <button type='submit' className='btn-primary wd110'>
                사진 변경
              </button>
            </div>
          </div>
        </div>




        <div className = 'privateSetting'>
          <h3>비공개 계정</h3>
          <div>토글버튼plz..</div>
        </div>
        구분선 plz..
        <div className = 'introSetting'>
          <h3>소개</h3>
          <textarea
            type='text'
            name='intro'
            placeholder="소개"
          ></textarea>
        </div>
        <div className='btn-group'>
          <div className='right'>
            <button type='submit' className='btn-primary wd100'>
              저장
            </button>
          </div>
        </div>
      </div>
      
      <div className="right"></div>
    </div>
  );
};

export default SettingMain;