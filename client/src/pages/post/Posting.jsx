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
  // const { state } = useLocation();
  const navigate = useNavigate();

  console.log('props', props.props);

  const [imgMetaAry, setImgMetaAry] = useState(props.props);
  const [context, setContext] = useState();
  const [filmTime, setFilmTime] = useState();
  const [filmLocation, setFilmLocation] = useState();
  const [filmWeather, setFilmWeather] = useState();
  const [filmSeason, setFilmSeason] = useState();
  const [imgIdx = 0, setImgIdx] = useState();
  const [accessToken, setAccessToken] = useState();

  console.log('imgMetaAry', imgMetaAry);
  console.log('accessToken', accessToken);
  // 화면 로딩시 실행
  useEffect(() => {
    axios
      .get(
        `https://sgisapi.kostat.go.kr/OpenAPI3/auth/authentication.json?consumer_key=${process.env.REACT_APP_SGIS_CONSUMER_KEY}&consumer_secret=${process.env.REACT_APP_SGIS_SECRET_KEY}`
      )
      .then((res) => {
        setAccessToken(res.data.result.accessToken);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [imgMetaAry]);

  // imgIdx변경 시 사진변환 이벤트 발생
  useEffect(() => {
    setImgMeta();
  }, [accessToken]);

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

    console.log(imgMetaAry);

    // 사진정보설정
    const location = document.getElementById('imgLocation');
    location.value = imgMetaAry[idx]?.addr;
  };

  const setImgMeta = (e) => {
    const { sop } = window;
    // imgMetaAry 값 추가
    // imgMetaAry[0].uymkX = utmkXY.x;

    imgMetaAry.forEach((val, idx) => {
      // 경도, 위도;
      const latitude = val?.latitude;
      const longitude = val?.longitude;

      // 위도경도값이 존재할 경우
      if (latitude && longitude) {
        // 모달 위도경도값 반환
        const utmkXY = new sop.LatLng(latitude, longitude);

        // sgis 모달 경도위도 설정
        mapConfig.lat = utmkXY.x;
        mapConfig.lng = utmkXY.y;

        // imgMeta에 경도위도 설정
        imgMetaAry[idx].uymkX = utmkXY.x;
        imgMetaAry[idx].uymkY = utmkXY.y;

        axios
          .get(
            `https://sgisapi.kostat.go.kr/OpenAPI3/personal/findcodeinsmallarea.json?x_coor=${utmkXY.x}&y_coor=${utmkXY.y}&accessToken=${accessToken}`
          )
          .then((res) => {
            const addr = res.data.result;
            imgMetaAry[
              idx
            ].addr = `${addr.sido_nm} ${addr.sgg_nm} ${addr.emdong_nm}`;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

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
          ariaHideApp={false}>
          <div className="header">
            <div/>
            <div className='title ml20'>위치선택</div>
            <div className="close" onClick={()=> {setModalIsOpen(false)}} />
          </div>
          <PostMap config={mapConfig} />
          <div className='btn-group mt10'>
            <div className='right mr10'>
              <button type='submit' className='btn-primary wd110'>선택</button>
            </div>
          </div>
        </Modal>
      </>
    );
  };

  return (
    <div className='post'>
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
                      onChange={(e) =>
                        (imgMetaAry[imgIdx].location = e.target.value)
                      }
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
                      onChange={(e) => setFilmWeather(e.target.value)}
                    />
                    <label htmlFor='sun' className='icon'></label>
                    <input
                      type='radio'
                      id='cloud'
                      name='weather'
                      value='cloud'
                      onChange={(e) => setFilmWeather(e.target.value)}
                    />
                    <label htmlFor='cloud' className='icon'></label>
                    <input
                      type='radio'
                      id='rain'
                      name='weather'
                      value='rain'
                      onChange={(e) => setFilmWeather(e.target.value)}
                    />
                    <label htmlFor='rain' className='icon'></label>
                    <input
                      type='radio'
                      id='thunder'
                      name='weather'
                      value='thunder'
                      onChange={(e) => setFilmWeather(e.target.value)}
                    />
                    <label htmlFor='thunder' className='icon'>
                      {' '}
                    </label>
                  </td>
                </tr>
                <tr>
                  <td>계절</td>
                  <td>
                    <input type='radio'
                      id='spring'
                      name='seasons'
                      value='spring'
                      onChange={(e) => setFilmSeason(e.target.value)}
                    />
                    <label htmlFor='spring' className='icon'></label>
                    <input
                      type='radio'
                      id='summer'
                      name='seasons'
                      value='summer'
                      onChange={(e) => setFilmSeason(e.target.value)}
                    />
                    <label htmlFor='summer' className='icon'></label>
                    <input
                      type='radio'
                      id='fall'
                      name='seasons'
                      value='fall'
                      onChange={(e) => setFilmSeason(e.target.value)}
                    />
                    <label htmlFor='fall' className='icon'></label>
                    <input
                      type='radio'
                      id='winter'
                      name='seasons'
                      value='winter'
                      onChange={(e) => setFilmSeason(e.target.value)}
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
          <div id='map' className='map'></div>

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
    </div>
  );
});

export default Posting;
