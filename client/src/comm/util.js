import AlertModal from "component/AlertModal";

/**
 * 공통함수 JS
 * 
 * import 선언
 * import util from "comm/util";
 * 
 */
const util = {
    isPhone : (data) => {
        let ret = false;
    
        const regPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
        ret = regPhone.test(data);
    
        return ret;
    },
    
    isEmail : (data) => {
        let ret = false;
    
        const regEmail = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
        ret = regEmail.test(data);
    
        return ret;
    },
    
    /**
     * dateFormat 
     * @param date 날짜(YYYYMMDD) 형식
     * @param formatter 반환시킬 포멧형식
     * @returns String
     */
    dateFormat : (date, formatter) => {
        let rtn="";
    
        if(formatter ==="YYYY/MM/DD") {
    
        }
    
        return rtn;
    },
    
    
    /**
     * toggleClass 
     * @param ele element 객체
     * @param classNm toggle 시킬 class
     * @returns String
     */
    toggleClass : (ele, classNm) => {
        if(ele.className.indexOf(classNm) < 0) {
            ele.className = ele.className + " " + classNm;
        }else {
            ele.className = ele.className + " " + classNm;
        }
    },
    
    /**
     * hasClass 
     * @param ele element 객체
     * @param classNm 확인할 class명
     * @returns boolean
     */
    hasClass : (ele, classNm) => {
        if(ele.className.indexOf(classNm) < 0) {
            return false;
        }else {
            return true;
        }
    },
        
    /**
     * addClass 
     * @param ele element 객체
     * @param classNm 추가할 class
     * @returns String
     */
    addClass : (ele, classNm) => {
        if(ele.className.indexOf(classNm) < 0) {
            ele.className = ele.className + " " + classNm;
        }
    },
    
    /**
     * removeClass 
     * @param ele element 객체
     * @param classNm 지울 class
     * @returns String
     */
    removeClass : (ele, classNm) => {
        if(ele !== null) {
            if(ele.className.indexOf(classNm) > -1) {
                ele.className = ele.className.replaceAll(" "+classNm, "")
                                             .replaceAll(classNm, "");
            }
        }
    },
    
    /**
     * scrollTop
     * @param pos 이동할 위치 값(top : 세로위치, left: 가로위치)
     * @param type 스크롤 효과속성
     */
    scrollTop : (pos = {top:0, left:0}, type = "instant") => {
        window.scrollTo({top: pos.top,
                         left: pos.left,
                         behavior:pos.type});
    },
    
    /**
     * isEmpty
     * 객체가 비어있는지 체크 후 값 반환
     * @param object 객체
     * @returns boolean
     */
    isEmpty : (object) => {
        if(object === undefined
        || object === null
        || object === ""
        || object.length === 0
        || Object.keys(object).length === 0) {
            return true;
        }else {
            return false;
        }
    },

    /**
     * getByte
     * 문자열의 바이트 수 체크
     * @param str 체크할 문자열
     * @returns int 바이트의 정수값
     */
    getByte : (str="") => {
        let totalByte =0;
        for(var i =0; i < str.length; i++) {
            var currentByte = str.charCodeAt(i);
            if(currentByte > 128){
            	totalByte += 2;
            }else {
            	totalByte++;
            }
        }

        return totalByte;
    },

    /**
     * makeRaioGroup
     * 라디오 컨트롤 객체 생성
     * @param radioName 라디오의 name
     * @return class radioGroup
     */
    makeRaioGroup : (radioName) => {
        let radioLst = document.getElementsByName(radioName);
        const radioGroup = {
            list        : radioLst,
            init        : () => {
                radioLst.forEach((item, idx)=> {
                    item.checked = false;
                });
            },
            setValue    : (val) => {
                radioLst.forEach((item, idx)=> {
                    if(item.value === val) {
                        item.checked = true;
                    }else {
                        item.checked = false;
                    }
                });
            },
            getValue    : () => {
                radioLst.forEach((item, idx)=> {
                    if(item.checked) {
                        return item.value;
                    }
                });
            },
            getAllVlaue : () => {
                let valueList = []
                radioLst.forEach((item, idx)=> {
                    valueList.push(item.value);
                });
                return valueList;
            },
        }
        return radioGroup;
    },

    getLocation : () => {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                const now = new Date();
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                    resolve({
                        err: 0,
                        time: now.toLocaleTimeString(),
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        });
                    },
                    (err) => {
                    resolve({
                        err: -1,
                        latitude: -1,
                        longitude: -1,
                    });
                },
                { enableHighAccuracy: true, maximumAge: 2000, timeout: 5000 }
                );
            } else {
                reject({ error: -2, latitude: -1, longitude: -1 });
            }
        });
    },

    /**
     * alert
     * 알림창을 모달로 출력
     * @param opt 옵션으로 사용될 값
     * @return html
     */
    alert : (opt) => {
        debugger;


         // const AlertModal = ({ onSubmit, onClose, msg, wid, hei })
         return(<AlertModal msg="res.data.message" />);
    }
}
export default util;
