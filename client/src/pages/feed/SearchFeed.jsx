
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Modal from 'react-modal';

import FeedContent from "./FeedContent";
import PostDragDrop from "pages/post/PostDragDrop";
import SearchBox from "./SearchBox";

import "css/feed.css";
import util from "comm/util";
const CreatePost = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return(
    <>
      <Link className="btn-create-post" onClick={() => {setModalIsOpen(true)}} />
      <Modal className="test" 
             isOpen={modalIsOpen} 
             onRequestClose={() => setModalIsOpen(false)} ariaHideApp={false}>
        <div className="header">
          <div/>
          <div className='title ml20'>새 게시물 만들기</div>
          <div className="close" onClick={()=> {setModalIsOpen(false)}} />
        </div>
        <PostDragDrop />
      </Modal>
    </>
  );
}
const SearchFeed = (props) => {
  const [isEod, setIsEod] = useState(false);
  const param     = useParams();
  const searchOpt = {};
  
  useEffect(()=>{
    if(!util.isEmpty(param)) {
      const params = param.search.split("&");
      params.forEach((e, idx) => {
        let tmp = e.split("=");
        if(tmp[0] === "word")   {searchOpt.searchWord = tmp[1]}
        else if(tmp[0] === "w") {searchOpt.weather = tmp[1]}
        else if(tmp[0] === "s") {searchOpt.season = tmp[1]}
      });
    }

  },[])
  
  return (
    <>
      <div className="feed main-frame"> 
        <div className="left">
          <SearchBox search={searchOpt}/>
        </div>
        <div className="center" id="feed">
          <FeedContent setIsEod={setIsEod} search={searchOpt}/>
          {isEod? <div>EOD </div> : <div></div>}
          <CreatePost />
        </div>
        <div className="right">
          right Side
        </div>
        
      </div>
    </>
  );
};
export default SearchFeed;