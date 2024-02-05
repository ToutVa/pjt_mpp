import React, { useEffect, useState } from 'react';
import 'css/post.css';
import axios from 'axios';
import baseImgUrl from 'assets/icon-file.svg';
import { useLocation } from 'react-router';
import PostTimeline from 'pages/post/PostTimeline';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { postingFiles } from 'comm/recoil/FileAtom';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import AWS from 'aws-sdk';
import * as CONSTS from '../../config/env';

const Posting = (props) => {
  // parameter 설정
  const [postingFile, setPostingFile] = useRecoilState(postingFiles);

  const [files, setFiles] = useState();
  const [title, setTitle] = useState();
  const [filmTime, setFilmTime] = useState();
  const [filmLocation, setFilmLocation] = useState();
  const [filmWeather, setFilmWeather] = useState();
  const [filmSeason, setFilmSeason] = useState();

  AWS.config.update ({
    region : CONSTS.ENV.S3_BUCKET_REGION,
    accessKeyId : CONSTS.ENV.S3_BUCKET_ACCESS_KEY,
    secretAccessKey : CONSTS.ENV.S3_BUCKET_SECRET_KEY
  });

  // 화면 로딩시 실행
  useEffect(() => {
    console.log("postingFile=>", postingFile);
    //file reader설정
    const reader = new FileReader();

    reader.onload = function () {
      let dataURL = reader.result;
      let imgWrap = document.getElementById('preview');
      imgWrap.src = dataURL;
    };

    // 미리보기 설정
    reader.readAsDataURL(postingFile[0]);
  }, []);

  // data api
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const headers = { 'Content-Type': 'multipart/form-data' };

    // fileupload multi array로 변경해봤는데 실패함 
    let fileAry = [];
    for (let key = 0; key < postingFile.length; key++) {
      fileAry.push(postingFile[key]);
    }

    console.log(AWS);
    console.log(postingFile);

    const body = {
      name : 'client/2024/test.png',
      type : fileAry[0].type
    };

    // 1단계 singed url 가져오기 
    axios.post(`api/post/getFileUrl`, body)
          .then((res) => {
          console.log(res);
            axios.put(res.data.url, fileAry[0])
                 .then((res) => {
                  console.log('res succ>>', res);
                 })
                 .catch((err) => {
                  console.log('res err =>>>', err);
                 });
          })
          .catch((err) => {
          console.log(err);
          });
    /**
    const upload = new AWS.S3.ManagedUpload({
      params : {
        ACL: 'public-read',
        Bucket: CONSTS.ENV.S3_BUCKET_NAME, // 버킷 이름
        Key: "upload/123.png", // 유저 아이디
        Body: fileAry[0], // 파일 객체

      }
    })
    const promise = upload.promise();
    promise.then(alert('sycc'));

    */

    // fileAry[0] 으로 진행해도 안됨 오? 
    /**
    formData.append("file", postingFile[0]);
    formData.append(
      'fileInfo',
      JSON.stringify({
        title,
        filmTime,
        filmLocation,
        filmWeather,
        filmSeason
      })
    );

    try {
      axios
        .post('/api/post/create', formData, headers)
        .then((res) => {
          console.log(res);
          alert(res.data.message);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      alert(error.response.data.errors);
    }*/
  };

  // img변경 로직 callback
  const imgChanger = (e) => {
    const idx = e.target.id.slice(-1);

    // file reader설정
    const reader = new FileReader();

     reader.onload = function () {
       let dataURL = reader.result;
       let imgWrap = document.getElementById('preview');
       imgWrap.src = dataURL;
     };
 
     // 미리보기 설정 
     reader.readAsDataURL(postingFile[idx]);

  }

  return (
    <div className='main-frame post'>
      <div className='left'></div>
      <div className='center'>
        <PostTimeline files={postingFile} propsFunction={imgChanger} />
        <form className='img-contain' encType='multipart/form-data' onSubmit={handleSubmit}>
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
                    제목
                  </td>
                  <td>
                    <input
                      type='text'
                      name='title'
                      autoFocus
                      placeholder='제목을 입력해주세요'
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>촬영시간</td>
                  <td>
                    {/* <DatePicker
                      dateFormat='yyyy년 MM월 dd일 a hh시'
                      dateFormatCalendar='yyyy년 MM월'
                      showTimeSelect
                      timeFormat='HH:mm'
                      timeIntervals={1}
                      timeCaption='촬영시간'
                      placeholderText='사진 촬영한 시간을 입력해주세요'
                      houldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
                      formatWeekDay={(nameOfDay) => nameOfDay.substring(0, 1)}
                      minDate={new Date('2000-01-01')} // minDate 이전 날짜 선택 불가
                      maxDate={new Date()} // maxDate 이후 날짜 선택 불가
                      selected={filmTime}
                      onChange={(data) => setFilmTime(data)}
                    /> */}
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
                      type='text'
                      placeholder='사진 촬영한 위치를 입력해주세요'
                      onChange={(e) => setFilmLocation(e.target.value)}
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
                    <input
                      type='radio'
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
          <div className='map'>지도영역</div>
          <input type='text' placeholder='#태그' />
          <div className='btn-group mt20'>
            <div className='left'>
              <Link to="/feed" className='btn-cancel wd70'>
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
};

export default Posting;
