import util from "comm/util";
import { useState } from "react";

const BookMarkPopup = () => {

  const [clicked, setClicked] = useState();
  const [bookmarkLst, setBookmarkLst] = useState([{
      title: "먹거리"
    },{
      title: "놀거리"
    },{
      title: "볼거리"
    },
  ]);

  const rdoBookmark = util.makeRaioGroup("bookmark");

  return(<>
    <div>내 북마크 리스트</div>
    <div className="bookmark-list">
        {
          bookmarkLst.map((item, idx) => {
            return(<>
              <input className="hide" key={idx} type='radio' id={'bookmark_'+idx} name='bookmark' value={'bookmark_'+idx} onChange={()=>{setClicked(idx)}} />
              <label htmlFor={'bookmark_'+idx} className='text'>{item.title}</label>
              </>
            )})
        }      
    </div>

    <div className='btn-group mt10'>
      <div className='right mr10'>
        <button
          type='submit'
          className='btn-primary wd110'
          onClick={(param) => {console.log(clicked)}}>
          저장
        </button>
      </div>
    </div>
  </>);
};
export default BookMarkPopup;