import { useEffect, useState } from "react";

/**
 * 토글버튼
 * @param {props}
 * props = {
 *  status : 초기상태값 (def = false)
 *  setFn : 부모의 상태값을 변경 함수, 부모의 상태값을 변경한다.
 * }
 */
const ToggleButton = (props) => {
  const [status, setStatus] = useState(props.status || false);

  return(
    <div className={status? "toggle on" : "toggle off"} onClick={()=>{setStatus(!status); props.setFn(!status)}}>
      <div className="point"/>
    </div>
  );
}

export default ToggleButton;