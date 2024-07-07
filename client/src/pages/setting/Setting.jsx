import React, { useEffect, useState } from 'react';
import axios from 'axios';
import util from 'comm/util';
import ToggleButton from 'component/ToggleButton';

import useModals from '../../hooks/useModals';
import { modals } from '../../comm/Modals';

/**
 * 셋팅화면
 *
 *
 *
 */
const Setting = () => {
  let titleList; //li의 title속성 값을 보유중인 요소List
  const [info, setInfo] = useState();
  const [privateStatus, setPrivateStatus] = useState(false); //비공개 계정 상태값
  const [introByte, setIntroByte] = useState(0); //비공개 계정 상태값
  const [profileIntro, setProfileIntro] = useState(); //비공개 계정 상태값
  const { openModal } = useModals();
  const fileInput = React.createRef();
  const lgnUser = JSON.parse(localStorage.getItem('userData')).userData.email;

  /*타이틀 온클릭 이벤트(펼치기, 접기)*/
  const titleOnClick = (idx) => {
    for (let i = 0; i < titleList.length; i++) {
      if (i === idx) {
        if (util.hasClass(titleList[i], 'active'))
          util.removeClass(titleList[i], 'active');
        else util.addClass(titleList[i], 'active');
      } else {
        util.removeClass(titleList[i], 'active');
      }
    }
  };

  const getProfile = async () => {
    await axios
      .post('/api/user/myInfo', {id : lgnUser})
      .then((res) => {
        if (res.data.success && res.data.info.length === 1) {
          const myInfo = res.data.info[0];
          setInfo(myInfo);
          setProfileIntro(myInfo.profileIntro);
          const byte = util.getByte(myInfo.profileIntro);
          setIntroByte(byte);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleButtonClick = (e) => {
    fileInput.current.click();
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   const headers = { 'Content-Type': 'multipart/form-data' };

  //   formData.append(
  //     'fileInfo',
  //     JSON.stringify({
  //       context,
  //       filmTime,
  //       filmLocation,
  //       filmWeather,
  //       filmSeason,
  //       hashTags,
  //     })
  //   );

  //   for (let j = 0; j < imgMetaAry.length; j++) {
  //     formData.append(
  //       'imgMeta',
  //       JSON.stringify({
  //         addr: imgMetaAry[j]?.addr,
  //         fileName: imgMetaAry[j]?.fileName,
  //         weather: imgMetaAry[j]?.weather,
  //         seasons: imgMetaAry[j]?.seasons,
  //         latitude: imgMetaAry[j]?.latitude,
  //         longitude: imgMetaAry[j]?.longitude,
  //         uymkX: imgMetaAry[j]?.uymkX,
  //         uymkY: imgMetaAry[j]?.uymkY,
  //       })
  //     );
  //   }

  //   // postingFile은 이미 fileArray 상태인데, image 에 해당 방식으로 추가해야 multer에서 처리해줌;
  //   for (let key = 0; key < postingFile.length; key++) {
  //     formData.append('image', postingFile[key]);
  //   }

  //   try {
  //     axios
  //       .post('/api/post/create', formData, headers)
  //       .then((res) => {
  //         console.log(res);
  //         alert(res.data.message);
  //         // posting 화면으로 이동
  //         navigate('/feed');
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   } catch (error) {
  //     alert(error.response.data.errors);
  //   }
  // };

  /**/
  const handleSetValue = (e) => {
    let byte = util.getByte(e.currentTarget.value);
    setIntroByte(byte);
    setProfileIntro(e.currentTarget.value);

    if (byte > 500) {
      return false;
    }
  };

  const confirmModal = (msg) => {
    openModal(modals.confirmModal, {
      onSubmit: () => {
        try {
          axios
            .post('/api/user/create', { profileIntro: profileIntro })
            .then((res) => {
              console.log(res);
              alert(res.data.message);
            })
            .catch((err) => {
              console.log(err);
            });
        } catch (error) {
          alert(error.response.data.errors);
        }
        return;
      },
      msg: msg,
    });
  };

  useEffect(() => {
    let dropDown = document.getElementById('dropDown');
    let list = dropDown.getElementsByClassName('title');
    titleList = list;
    for (let i = 0; i < list.length; i++) {
      list[i].addEventListener('click', () => {
        titleOnClick(i);
      });
    }
    getProfile();
    // file reader 호출
    const reader = new FileReader();

    // file reader load
    reader.onload = function () {
      // dataurl 생성
      const dataURL = reader.result;
      // dataUrl 을 미리보기에 저장해줌.
      const imgWrap = document.getElementById('preview');
      // src에 경로 복사
      imgWrap.src = dataURL;
    };
  }, []);

  return (
    <>
      <div className='setting main-frame'>
        <div className='left'></div>
        <div className='center'>
          <div className='user-info mt50'>
            <div className='icon'>
              {info?.profilePicture ? (
                <img alt='' src={info?.profilePicture} height='80' width='80' />
              ) : (
                ''
              )}
            </div>

            <div className='identifier'>
              <div className='id'>{info?.email || '계정'}</div>
              <div className='name'>{info?.name || '이름'}</div>
            </div>
            <div className='btn-group'>
              <button
                type='submit'
                className='wd110 btn-primary'
                onClick={handleButtonClick}
              >
                사진변경
              </button>
            </div>
          </div>
          <div>
            <ul id='dropDown' className='drop-down mt40'>
              <li>
                <div className='content'>
                  <div className='h3'>비공개 계정</div>
                  <ToggleButton
                    status={privateStatus}
                    setFn={setPrivateStatus}
                  />
                </div>
              </li>
              <li>
                <div className='title'>소개</div>
                <div className='content'>
                  <div className='mb10 fr'>{introByte} /500 자</div>
                  <textarea
                    className='introSetting'
                    type='text'
                    name='intro'
                    placeholder='자신을 소개해 주세요'
                    value={profileIntro}
                    onChange={handleSetValue}
                  />
                </div>
              </li>
              <li>
                <div className='title'>옵션3</div>
                <div className='content'>옵션3 상세</div>
              </li>
              <li>
                <div className='title'>옵션4</div>
                <div className='content'>옵션4 상세</div>
              </li>
            </ul>
          </div>
          <div className='btn-group'>
            <div className='right'>
              <button
                type='submit'
                className='btn-primary wd100'
                onClick={() => {
                  confirmModal('저장 하시겠습니까?');
                }}
              >
                저장
              </button>
            </div>
          </div>
        </div>
        <div className='right'></div>
      </div>
    </>
  );
};
export default Setting;
