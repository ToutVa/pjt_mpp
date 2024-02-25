import React, { useEffect, useState } from "react";
  
const PostMap = (props) => {
  const lati = props?.lati;
  const longi = props?.longi;
  
  useEffect(() => {
    debugger;
    const { sop } = window;
    const map = sop.map("map");
    map.setView(sop.utmk(953820, 1953437), 10);
    //map.dragging.disable();           //드래그 불가
    //map.scrollWheelZoom.disable();    //zoomin zoomout 불가

    map.on("click",function(e) {
        setTimeout(function() {  
            var x_coor = e.utmk.x;
            var y_coor = e.utmk.y;
            var html = "<p> 지도클릭 좌표 x :"+x_coor+" , y :"+y_coor+"</p>";
            console.log(html);
        }, 200);
       });

  },[]);

  return(
    <div id = "map" />      
  )
};

export default PostMap;
