import React, { useEffect, useState } from "react";
  
const PostMap = (props) => {
  const lati = props?.lati;
  const longi = props?.longi;
  const [stateMap , setStateMap] = useState();
  const [stateSop , setStateSop] = useState();

  useEffect(() => {
    const { sop } = window;
    const map = sop.map("map");
    map.setView(sop.utmk(953820, 1953437), 10);
    setStateMap(map);
    setStateSop(sop);

    map.on("click",(e) => {
      setTimeout(() => {  
          var x_coor = e.utmk.x;
          var y_coor = e.utmk.y;
          var html = "<p> 지도클릭 좌표 x :"+x_coor+" , y :"+y_coor+"</p>";
          console.log(html);
      }, 200);
    });
  },[]);

  const testFn = () => {
    stateMap.setView(stateSop.utmk(953820, 1953437), 15);
  }

  return(
    <>
      <div id = "map" />      
      <div onClick={testFn}> asdasd</div>
    </>
  )
};

export default PostMap;
