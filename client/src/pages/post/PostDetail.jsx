import axios from "axios";
import PostItem from "pages/post/PostItem";
import React, { useEffect, useState } from "react";
import PostTimeline from "./PostTimeline";
import TimeLine from "./TimeLine";
import { useParams } from "react-router-dom";

const PostDetail = (match) => {
  const param = useParams();
  const val =  {
    "_id": "65c4af072479c67527f1ddfa",
    "title": "이미지 테스트",
    "filmTime": "2024-02-08T10:36:40.000Z",
    "filmLocation": "가평언저리",
    "filmWeather": "sun",
    "filmSeason": "spring",
    "userEmail": "test1",
    "registDate": "2024/02/08 19:37:59",
    "imgList": [
        {
            "fieldname": "image",
            "originalname": "LYG03204.JPG",
            "encoding": "7bit",
            "mimetype": "image/jpeg",
            "size": 3465047,
            "bucket": "mypin-point",
            "key": "2024/02/08/dbb1563e-b4e3-4af6-83ae-e5730972e6da_LYG03204.JPG",
            "acl": "public-read-write",
            "contentType": "image/jpeg",
            "contentDisposition": null,
            "contentEncoding": null,
            "storageClass": "STANDARD",
            "serverSideEncryption": null,
            "metadata": null,
            "location": "https://mypin-point.s3.ap-northeast-1.amazonaws.com/2024/02/08/dbb1563e-b4e3-4af6-83ae-e5730972e6da_LYG03204.JPG",
            "etag": "\"8f67ca66fcae477d57ac51807dad45ac\"",
            "versionId": "l.369eZzePzRLB2pChqVp04JgTvUUyk7"
        },
        {
            "fieldname": "image",
            "originalname": "LYG03208.JPG",
            "encoding": "7bit",
            "mimetype": "image/jpeg",
            "size": 5473839,
            "bucket": "mypin-point",
            "key": "2024/02/08/f8221a25-0def-4a16-9ab7-0e3932f50038_LYG03208.JPG",
            "acl": "public-read-write",
            "contentType": "image/jpeg",
            "contentDisposition": null,
            "contentEncoding": null,
            "storageClass": "STANDARD",
            "serverSideEncryption": null,
            "metadata": null,
            "location": "https://mypin-point.s3.ap-northeast-1.amazonaws.com/2024/02/08/f8221a25-0def-4a16-9ab7-0e3932f50038_LYG03208.JPG",
            "etag": "\"468be586d26f14be6ea9e68c09d71c57-2\"",
            "versionId": "3CpbWy1BCepldFpBUmL4Df4JI3FXoYmc"
        },
        {
            "fieldname": "image",
            "originalname": "LYG03269.JPG",
            "encoding": "7bit",
            "mimetype": "image/jpeg",
            "size": 4149480,
            "bucket": "mypin-point",
            "key": "2024/02/08/af0bbb69-ed49-4aa9-a026-dcf75b3000e2_LYG03269.JPG",
            "acl": "public-read-write",
            "contentType": "image/jpeg",
            "contentDisposition": null,
            "contentEncoding": null,
            "storageClass": "STANDARD",
            "serverSideEncryption": null,
            "metadata": null,
            "location": "https://mypin-point.s3.ap-northeast-1.amazonaws.com/2024/02/08/af0bbb69-ed49-4aa9-a026-dcf75b3000e2_LYG03269.JPG",
            "etag": "\"351a4146369c168e63050ffd16d113de\"",
            "versionId": "bgszmiWggh7WgHpNvp2XP.z2jPlz23zN"
        },
        {
            "fieldname": "image",
            "originalname": "LYG03283.JPG",
            "encoding": "7bit",
            "mimetype": "image/jpeg",
            "size": 4619489,
            "bucket": "mypin-point",
            "key": "2024/02/08/5bf8e89b-6305-4b6d-9687-a00374919b13_LYG03283.JPG",
            "acl": "public-read-write",
            "contentType": "image/jpeg",
            "contentDisposition": null,
            "contentEncoding": null,
            "storageClass": "STANDARD",
            "serverSideEncryption": null,
            "metadata": null,
            "location": "https://mypin-point.s3.ap-northeast-1.amazonaws.com/2024/02/08/5bf8e89b-6305-4b6d-9687-a00374919b13_LYG03283.JPG",
            "etag": "\"01172b96587ee9c2c46310e208e4adcf\"",
            "versionId": "hlBkd5yzWnB1pdMjnO2Tc4UnpZBgYISz"
        }
    ],
    "__v": 0
  }
  const getPost = () => {
    let loadUrl = '/api/post/post';
    debugger;
    axios.post(loadUrl, {id : param.postId}).then((res) => {
      debugger;
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
      <PostItem content={val}/>
      </div>
      <div className='right'>
        <TimeLine imgList = {val.imgList}/>
      </div>
    </div>
  )
}
export default PostDetail;
