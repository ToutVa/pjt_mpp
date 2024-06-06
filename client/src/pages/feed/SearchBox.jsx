import { isLoginSelector } from 'comm/recoil/TokenAtom';
import { useEffect, useState } from "react";

import util from "comm/util";
import { useRecoilValue } from 'recoil';
import { Link, useParams } from 'react-router-dom';

const SearchBox = (props)=> {
  const [searchWord, setSearchWord] = useState("");
  const isLogin = useRecoilValue(isLoginSelector);

  const rdoWeather = util.makeRaioGroup("weather"); 
  const rdoSeason = util.makeRaioGroup("seasons"); 

  const [weather, setWeather] = useState("");
  const [season, setSeason] = useState("");


  const param     = useParams();


  useEffect(()=> {
    if(!util.isEmpty(param)) {
      const params = param.search.split("&");
      params.forEach((e, idx) => {
        let tmp = e.split("=");
        
        if(tmp[0] === "word")   {setSearchWord(tmp[1]);}
        else if(tmp[0] === "w") {
          setWeather(tmp[1]);
          rdoWeather.setValue(tmp[1]);
          
        }
        else if(tmp[0] === "s") {
          setSeason(tmp[1]);
          rdoSeason.setValue(tmp[1]);
        }
      });
    }
  },[])
  /*라디오버튼 클릭 이벤트*/
  const weatherClick = (e) => {
    setWeather(e.target.value);
  }

  const seasonsClick = (e) => {
    setSeason(e.target.value);
  }
  
  /*초기화 버튼 클릭 이벤트*/
  const searchOptInit = (e) => {
    rdoWeather.init();
    rdoSeason.init();
    setWeather("")
    setSeason("")
    setSearchWord("");
  }

  /*검색어 입력 핸들러*/
  const onSearchWordHandler = (event) => {
    setSearchWord(event.currentTarget.value);
  }

  return(
    <>
      <div className="search-box">
        <div className="search-word">
          {isLogin ? <input type="text" placeholder="검색할 단어를 입력하세요" onChange={onSearchWordHandler} value={searchWord}/> : <input type="text" disabled="disabled" />}
          <Link to={ util.isEmpty(searchWord) && util.isEmpty(weather) && util.isEmpty(season) 
            ? "/feed"
            : "/feed/word="+searchWord+"&w="+weather+"&s="+season+""}
          className="search"/>
        </div>
        <div className="mt20">
          <div className="h4">검색옵션</div>
          <div>
            <table>
              <tbody>
                <tr>
                  <td className="p0 h5">날씨</td>
                  <td className="p0">
                    <input type='radio' id='sun'     name='weather' onChange={weatherClick} value='sun'/>     <label htmlFor='sun' className='icon'></label>
                    <input type='radio' id='cloud'   name='weather' onChange={weatherClick} value='cloud'/>   <label htmlFor='cloud' className='icon'></label>
                    <input type='radio' id='rain'    name='weather' onChange={weatherClick} value='rain'/>    <label htmlFor='rain' className='icon'></label>
                    <input type='radio' id='thunder' name='weather' onChange={weatherClick} value='thunder'/> <label htmlFor='thunder' className='icon'></label>
                  </td>
                </tr>
                <tr>
                  <td className="p0 h5">계절</td>
                  <td className="p0">
                    <input type='radio' id='spring' name='seasons' onChange={seasonsClick} value='spring'/> <label htmlFor='spring' className='icon'></label>
                    <input type='radio' id='summer' name='seasons' onChange={seasonsClick} value='summer'/> <label htmlFor='summer' className='icon'></label>
                    <input type='radio' id='fall'   name='seasons' onChange={seasonsClick} value='fall'/>   <label htmlFor='fall' className='icon'></label>
                    <input type='radio' id='winter' name='seasons' onChange={seasonsClick} value='winter'/> <label htmlFor='winter' className='icon'></label>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="btn-group mt15">
              <div className="right">
                <button className="btn-cancel wd90" onClick={searchOptInit}>초기화</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchBox;