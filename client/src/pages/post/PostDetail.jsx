import axios from "axios";
import PostItem from "pages/post/PostItem";
import React, { useEffect, useState } from "react";
import util from "comm/util";
import TimeLine from "./TimeLine";
import { useParams } from "react-router-dom";

const PostDetail = (match) => {
  const param = useParams();
  const [item, setItem] = useState();
  const [imgList, setImgList] = useState();

  const getPost = async () => {
    let loadUrl = '/api/post/getPostDtl';
    await axios.post(loadUrl, {id : param.postId}).then((res) => {
      if(res.data.success) {
        setItem(res.data.post[0]);
        setImgList(res.data.post[0].imgList);
      }
    }).catch((err) => {
      console.log(err);
    });
  }
  
  useEffect(() => {
    getPost();
  },[]);

  return(
    <div className='main-frame post'>
      <div className='left'></div>
      <div className='center' id="post">
      {util.isEmpty(item) ? <></>  : <PostItem content={item}/>}
      </div>
      <div className='right'>
      {util.isEmpty(imgList) ? <></>  : <TimeLine imgList = {imgList}/>}
      </div>
    </div>
  )
}
export default PostDetail;
