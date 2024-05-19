import util from "comm/util";
import { useState } from "react";

const SearchBox = ()=> {
  const [searchWord, setSearchWord] = useState("");


  const rdoWeather = util.makeRaioGroup("weather"); 
  const rdoSeason = util.makeRaioGroup("seasons"); 

  const [weather, setWeather] = useState("");
  const [season, setSeason] = useState("");


  
  
  /*라디오버튼 클릭 이벤트*/
  const weatherClick = (e) => {
    const val = e.target.value;
  }

  const seasonsClick = (e) => {
    const val = e.target.value;
  }
  
  /*초기화 버튼 클릭 이벤트*/
  const searchOptInit = (e) => {
    rdoWeather.init();
    rdoSeason.init();
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
          <input type="text" placeholder="검색할" onChange={onSearchWordHandler} value={searchWord}/>
          <button className="search"/>
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