import React, { forwardRef, useEffect, useState, useImperativeHandle} from "react";
  
const PostMap = forwardRef((props, ref) => {
  const config = props?.config;
  /*초기 셋팅값*/
  const lat   = config?.lat     || 953820;    //경도
  const lng   = config?.lng     || 1953437;   //위도
  const mode  = config?.mode    || "all";     //모드
  const id    = config?.id      || mode+"Map";//맵ID


  const scaleDef = 11;     //화면 이동시 스케일 기본값
  const [stateMap , setStateMap] = useState();
  const [stateSop , setStateSop] = useState();


  let markerList=[];

  const controllConfig = {
    "view" : {
      ollehTileLayer: false,
      scale: false, // 축척 컨트롤
      panControl: false, // 지도 이동 컨트롤
      zoomSliderControl: false, //줌 컨트롤
      measureControl: false, // 측정 컨트롤 (면적, 길이)
      attributionControl: false // 지도속성 컨트롤
    },
    "point" : {
      ollehTileLayer: false,
      scale: true, // 축척 컨트롤
      panControl: false, // 지도 이동 컨트롤
      zoomSliderControl: true, //줌 컨트롤
      measureControl: false, // 측정 컨트롤 (면적, 길이)
      attributionControl: false // 지도속성 컨트롤
    },
    "all" : {},
  }
  //부모컴포넌트 핸들러
  useImperativeHandle(ref, () => ({
    // 부모 컴포넌트에서 사용할 함수
    moveMap
  }));

  useEffect(() => {
    const { sop } = window;
    const map = sop.map(id, controllConfig[mode]);
    map.setView(sop.utmk(lat, lng), 10);
    setStateMap(map);
    setStateSop(sop);

    if(mode === "view") {
      map.scrollWheelZoom.disable();
      map.dragging.disable();
    }

    map.on("click",(e) => {
      setTimeout(() => {
        if(config?.clickCallback != null) {
          config.clickCallback(e);
        }
        if(mode==="point") {
          /*마커 생성*/
          let marker = sop.marker([e.utmk.x, e.utmk.y]);

          markerList.pop()?.remove();
          markerList.push(marker);

          /*마커 렌더링 및 화면이동*/
          marker.addTo(map);
          map.setView(sop.utmk(e.utmk.x, e.utmk.y));
        }
      }, 50);
    });
  
  },[]);

  const moveMap = (posX, posY, scale) => {
    debugger;
    stateMap.setView(stateSop.utmk(posX, posY), scale?scale:scaleDef);
  }

  return(
    <>
      <div id={id} className="sgis-map"/>      
    </>
  )

});

export default PostMap;
