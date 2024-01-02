export function isPhone(data) {
    let ret = false;

    const regPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
    ret = regPhone.test(data);

    return ret;
}

export function isEmail(data) {
    let ret = false;

    const regEmail = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    ret = regEmail.test(data);

    return ret;
}

/**
 * dateFormat 
 * @param date 날짜(YYYYMMDD) 형식
 * @param formatter 반환시킬 포멧형식
 * @returns String
 */
export function dateFormat(date, formatter) {
    let rtn="";

    if(formatter ==="YYYY/MM/DD") {

    }

    return rtn;
}


/**
 * toggleClass 
 * @param ele element 객체
 * @param classNm toggle 시킬 class
 * @returns String
 */
export function toggleClass(ele, classNm) {
    if(ele.className.indexOf(classNm) < 0) {
        ele.className = ele.className + " " + classNm;
    }else {
        ele.className = ele.className + " " + classNm;
    }
}

/**
 * addClass 
 * @param ele element 객체
 * @param classNm 추가할 class
 * @returns String
 */
export function addClass(ele, classNm) {
    if(ele.className.indexOf(classNm) < 0) {
        ele.className = ele.className + " " + classNm;
    }
}

/**
 * removeClass 
 * @param ele element 객체
 * @param classNm 지울 class
 * @returns String
 */
export function removeClass(ele, classNm) {
    if(ele !== null) {
        if(ele.className.indexOf(classNm) > -1) {
            ele.className = ele.className.replaceAll(" "+classNm, "")
                                         .replaceAll(classNm, "");
        }
    }
}