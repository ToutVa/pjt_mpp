import React, { forwardRef, useEffect, useState, useImperativeHandle} from "react";
  
const PostMap = forwardRef((props, ref) => {
  const config = props?.config;
  /*초기 셋팅값*/
  const lat    = config?.lat     || 953820;    //경도
  const lng    = config?.lng     || 1953437;   //위도
  const mode   = config?.mode    || "all";     //모드
  const id     = config?.id      || mode+"Map";//맵ID
  const points = config?.points  || [];//맵ID
  const scale  = config?.scale   || 8;

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
    console.log('modal => ', lat,lng)
    map.setView(sop.utmk(lat, lng), scale);
    setStateMap(map);
    setStateSop(sop);

    if(mode === "view") {
      map.scrollWheelZoom.disable();  //휠줌 금지
      map.dragging.disable();         //드래그 금지
    } else if (mode === 'point') {
      if(points.length > 0) {         //point JsonArray가 존재하는 경우
        let lineArr =[];
        
        markerList.pop()?.remove();

        
        //마커 배열생성
        points.forEach((item, idx) => {
          let marker = sop.marker([item.uymkX, item.uymkY]);
          markerList.push(marker);
          marker.addTo(map);

          //선 연결 사용여부
          if(config.useLine) lineArr.push([item.uymkX, item.uymkY]);
        });

        if(config.useLine) {
          var polyline = sop.polyline(lineArr, {
            stroke: true,
            color: '#245A5A',
            weight : 3,
            opacity: 1,
            fill: false,
            fillColor:'#245A5A',
            fillOpacity: 0.2,
           });
           
          //  polyline.bindInfoWindow("폴리라인 입니다.");
           polyline.addTo(map);
           map.fitBounds(polyline);
        }
      }else {//없으면 기본값 사용
        markerList.pop()?.remove();
        let marker = sop.marker([lat, lng]);
        markerList.push(marker);
        marker.addTo(map);
      }
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

    map.on("ondblclick", (e) => {
      console.log('db');
    })
  
  },[]);

  const moveMap = (posX, posY, scale) => {
    stateMap.setView(stateSop.utmk(posX, posY));
  }

  return(
    <>
      <div id={id} className="sgis-map"/>      
    </>
  )

});

export default PostMap;
