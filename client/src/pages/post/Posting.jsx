import React, { forwardRef, useEffect, useState } from 'react';
import axios from 'axios';
import 'css/post.css';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';
import { useRecoilState } from 'recoil';
import { postingFiles } from 'comm/recoil/FileAtom';
import { useNavigate } from 'react-router';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import PostTimeline from 'pages/post/PostTimeline';
import HashTag from 'component/HashTag';
import baseImgUrl from 'assets/icon-file.svg';
import dayjs from 'dayjs';
import Modal from 'react-modal';
import PostMap from './PostMap';
import util from 'comm/util';

let mapConfig = {
  id: 'sgisMap', //맵 ID(한화면에 ID 겹치는 맵 생기면 오류남)
  mode: 'point', //point, view, all     default : all
  lat: 933820, //초기경도
  lng: 1753437, //초기위도
  scale: 0, //지도 줌 레벨
  clickCallback: (e) => {
    //맵 클릭 값 반환 함수
    console.log(e.utmk.x, e.utmk.y); //좌표반환
  },
};

const Posting = forwardRef((props) => {
  // parameter 설정
  const [postingFile] = useRecoilState(postingFiles);
  const navigate = useNavigate();

  const [imgMetaAry, setImgMetaAry] = useState(props.props);
  const [context, setContext] = useState();
  const [filmTime, setFilmTime] = useState();
  const [filmLocation, setFilmLocation] = useState();
  const [filmWeather, setFilmWeather] = useState();
  const [filmSeason, setFilmSeason] = useState();
  const [imgIdx, setImgIdx] = useState(0);

  const rdoWeather = util.makeRaioGroup("weather"); 
  const rdoSeason = util.makeRaioGroup("seasons"); 

  // 화면 로딩시 실행
  useEffect(() => {
    setImgIdx(0);
  }, [postingFile]);

  // imgIdx변경 시 사진변환 이벤트 발생
  useEffect(() => {
    setImgPrev(imgIdx);
  }, [imgIdx]);

  // img변경 로직 callback
  const imgChanger = (e) => {
    const idx = e.target.id.slice(-1);
    setImgIdx(idx);
  };

  const setImgPrev = (idx) => {
    //file reader 생성
    const reader = new FileReader();

    // file reader 설정
    reader.onload = function () {
      let dataURL = reader.result;
      let imgWrap = document.getElementById('preview');
      imgWrap.src = dataURL;
    };

    // 미리보기 설정
    reader.readAsDataURL(postingFile[idx]);

    // 사진정보설정
    const location = document.getElementById('imgLocation');
    location.value = `${imgMetaAry[idx]?.sido_nm} ${imgMetaAry[idx]?.sgg_nm} ${imgMetaAry[idx]?.emdong_nm}`;

    // 계절, 날씨 정보 설정
    const weather = imgMetaAry[idx].weather;
    const seasons = imgMetaAry[idx].seasons;
    rdoWeather.setValue(weather);
    rdoSeason.setValue(seasons);
  };


  // 라디오버튼 
  const weatherClick = (e) => {
    const val = e.target.value;
    imgMetaAry[imgIdx].weather = val;
  }

  const seasonsClick = (e) => {
    const val = e.target.value;
    imgMetaAry[imgIdx].seasons = val;
}

  // data api
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const headers = { 'Content-Type': 'multipart/form-data' };

    formData.append(
      'fileInfo',
      JSON.stringify({
        context,
        filmTime,
        filmLocation,
        filmWeather,
        filmSeason,
      })
    );

    for (let j = 0; j < imgMetaAry.length; j++) {
      formData.append(
        'imgMeta',
        JSON.stringify({
          addr: imgMetaAry[j]?.addr,
          fileName: imgMetaAry[j]?.fileName,
          weather : imgMetaAry[j]?.weather,
          seasons : imgMetaAry[j]?.seasons,
          latitude: imgMetaAry[j]?.latitude,
          longitude: imgMetaAry[j]?.longitude,
          uymkX: imgMetaAry[j]?.uymkX,
          uymkY: imgMetaAry[j]?.uymkY,
        })
      );
    }

    // postingFile은 이미 fileArray 상태인데, image 에 해당 방식으로 추가해야 multer에서 처리해줌;
    for (let key = 0; key < postingFile.length; key++) {
      formData.append('image', postingFile[key]);
    }

    try {
      axios
        .post('/api/post/create', formData, headers)
        .then((res) => {
          console.log(res);
          alert(res.data.message);
          // posting 화면으로 이동
          navigate('/feed');
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      alert(error.response.data.errors);
    }
  };

  // Sgis Map 생성
  const MapMordalButton = (props) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    return (
      <>
        <button
          type='button'
          className='btn-primary wd110'
          onClick={() => {
            setModalIsOpen(true);
          }}
        >
          {props.label}
        </button>
        <Modal
          className='test'
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          ariaHideApp={false}
        >
          <div className='header'>
            <div />
            <div className='title ml20'>위치선택</div>
            <div
              className='close'
              onClick={() => {
                setModalIsOpen(false);
              }}
            />
          </div>
          <PostMap config={mapConfig}  />
          <div className='btn-group mt10'>
            <div className='right mr10'>
              <button
                type='submit'
                className='btn-primary wd110'
                onClick={(param) => {
                  const sgisMap = JSON.parse(localStorage.getItem('sgisMap'));
                  console.log(sgisMap);
                  imgMetaAry[imgIdx] = Object.assign(imgMetaAry[imgIdx], sgisMap);
                  // 사진정보설정
                  const location = document.getElementById('imgLocation');
                  location.value = `${imgMetaAry[imgIdx]?.sido_nm} ${imgMetaAry[imgIdx]?.sgg_nm} ${imgMetaAry[imgIdx]?.emdong_nm}`;
                  setModalIsOpen(false);
                }}
              >
                선택
              </button>
            </div>
          </div>
        </Modal>
      </>
    );
  };


  return (
    <div className='main-frame post'>
      <div className='left'></div>
      <div className='center'>
        <PostTimeline
          files={postingFile}
          propsFunction={imgChanger}
          type='horizon'
        />
        <form
          className='img-contain'
          encType='multipart/form-data'
          onSubmit={handleSubmit}
        >
          <div className='img-wrap'>
            <img
              id='preview'
              src={baseImgUrl}
              alt='이미지'
              className='img-box'
            />
          </div>
          <div className='img-info'>
            <table>
              <thead></thead>
              <tbody>
                <tr>
                  <td>
                    <MapMordalButton label={'지도'} />
                  </td>
                </tr>
                <tr>
                  <td>촬영시간</td>
                  <td>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateTimePicker
                        viewRenderers={{
                          hours: null,
                          minutes: null,
                          seconds: null,
                        }}
                        format='YYYY/MM/DD HH:mm:ss'
                        slotProps={{
                          textField: {
                            size: 'small',
                          },
                        }}
                        defaultValue={dayjs()}
                        minDate={dayjs('2000-01-01')} // minDate 이전 날짜 선택 불가
                        maxDate={dayjs()}
                        value={filmTime}
                        onChange={(newValue) => {
                          setFilmTime(newValue);
                        }}
                      />
                    </LocalizationProvider>
                  </td>
                </tr>
                <tr>
                  <td>위치</td>
                  <td>
                    <input
                      id='imgLocation'
                      type='text'
                      placeholder='사진 촬영한 위치를 입력해주세요'
                    />
                  </td>
                </tr>
                <tr>
                  <td>날씨</td>
                  <td>
                    <input
                      type='radio'
                      id='sun'
                      name='weather'
                      value='sun'
                      onChange={weatherClick}
                    />
                    <label htmlFor='sun' className='icon'></label>
                    <input
                      type='radio'
                      id='cloud'
                      name='weather'
                      value='cloud'
                      onChange={weatherClick}
                    />
                    <label htmlFor='cloud' className='icon'></label>
                    <input
                      type='radio'
                      id='rain'
                      name='weather'
                      value='rain'
                      onChange={weatherClick}
                    />
                    <label htmlFor='rain' className='icon'></label>
                    <input
                      type='radio'
                      id='thunder'
                      name='weather'
                      value='thunder'
                      onChange={weatherClick}
                    />
                    <label htmlFor='thunder' className='icon'>
                      {' '}
                    </label>
                  </td>
                </tr>
                <tr>
                  <td>계절</td>
                  <td>
                    <input
                      type='radio'
                      id='spring'
                      name='seasons'
                      value='spring'
                      onChange={seasonsClick}
                    />
                    <label htmlFor='spring' className='icon'></label>
                    <input
                      type='radio'
                      id='summer'
                      name='seasons'
                      value='summer'
                      onChange={seasonsClick}
                    />
                    <label htmlFor='summer' className='icon'></label>
                    <input
                      type='radio'
                      id='fall'
                      name='seasons'
                      value='fall'
                      onChange={seasonsClick}
                    />
                    <label htmlFor='fall' className='icon'></label>
                    <input
                      type='radio'
                      id='winter'
                      name='seasons'
                      value='winter'
                      onChange={seasonsClick}
                    />
                    <label htmlFor='winter' className='icon'>
                      {' '}
                    </label>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <input
            type='text'
            name='title'
            autoFocus
            placeholder='내용을 입력하세요...'
            onChange={(e) => setContext(e.target.value)}
          />
          <HashTag />
          <div className='btn-group mt20'>
            <div className='left'>
              <Link to='/feed' className='btn-cancel wd70'>
                취소
              </Link>
            </div>
            <div className='right'>
              <button type='submit' className='btn-primary wd110'>
                게시물 등록
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className='right'></div>
    </div>
  );
});

export default Posting;
