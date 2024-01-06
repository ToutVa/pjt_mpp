import React, { useEffect, useState } from 'react';
import 'css/post.css';
import axios from 'axios';
import baseImgUrl from 'assets/icon-file.svg';
import { useLocation } from 'react-router';
import PostTimeline from 'pages/post/PostTimeline';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Posting = (props) => {
  // parameter 설정
  const location = useLocation();
  const selectFiles = { ...location.state.files };

  const [files, setFiles] = useState();
  const [title, setTitle] = useState();
  const [filmTime, setFilmTime] = useState();
  const [filmLocation, setFilmLocation] = useState();
  const [filmWeather, setFilmWeather] = useState();
  const [filmSeason, setFilmSeason] = useState();

  const userEmail = JSON.parse(window.localStorage.getItem('userData')).userData
    .email;
  const registDate = new Date().toLocaleString();

  // 화면 로딩시 실행
  useEffect(() => {
    console.log(selectFiles);
    setFiles(selectFiles);

    // file reader설정
    var reader = new FileReader();

    reader.onload = function () {
      var dataURL = reader.result;
      var imgWrap = document.getElementById('preview');
      imgWrap.src = dataURL;
    };

    // 미리보기 설정
    reader.readAsDataURL(selectFiles[0]);
  }, []);

  // data api
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const headers = { 'Content-Type': 'multipart/form-data' };

    // fileupload multi array로 변경해봤는데 실패함 
    let fileAry = [];
    for (let key in selectFiles) {
      fileAry.push(selectFiles[key]);
    }

    console.log(fileAry);

    // fileAry[0] 으로 진행해도 안됨 오? 
    formData.append("file", selectFiles[0]);
    formData.append(
      'fileInfo',
      JSON.stringify({
        title,
        filmTime,
        filmLocation,
        filmWeather,
        filmSeason,
        userEmail,
        registDate,
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
    }
  };

  const imgChanger = (e) => {
    const idx = e.target.id.slice(-1);

    // file reader설정
    var reader = new FileReader();

    reader.onload = function () {
      var dataURL = reader.result;
      var imgWrap = document.getElementById('preview');
      imgWrap.src = dataURL;
    };

    // 미리보기 설정
    reader.readAsDataURL(selectFiles[idx]);
  };

  return (
    <div className='main-frame post'>
      <div className='left'></div>
      <div className='center'>
        <PostTimeline files={files} propsFunction={imgChanger} />
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
                    <DatePicker
                      dateFormat='yyyy년 MM월 dd일 a hh시'
                      dateFormatCalendar='yyyy년 MM월'
                      locale='ko'
                      showTimeSelect
                      timeFormat='HH:mm'
                      timeIntervals={60}
                      timeCaption='촬영시간'
                      placeholderText='사진 촬영한 시간을 입력해주세요'
                      selected={filmTime}
                      onChange={(data) => setFilmTime(data)}
                    />
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
              <button type='submit' className='btn-cancel wd70'>
                취소
              </button>
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
