import React, { forwardRef, useEffect, useState, useImperativeHandle} from "react";
  
const PostMap = forwardRef((props, ref) => {
  const lati = props?.lati;
  const longi = props?.longi;
  const [stateMap , setStateMap] = useState();
  const [stateSop , setStateSop] = useState();


  useImperativeHandle(ref, () => ({
    // 부모 컴포넌트에서 사용할 함수를 선언
    moveMap
  }));

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

  const moveMap = (posX, posY) => {
    stateMap.setView(stateSop.utmk(posX, posY), 15);
  }
  return(
    <>
      <div id = "map" />      
      <div onClick={testFn}> asdasd</div>
    </>
  )
});

export default PostMap;
