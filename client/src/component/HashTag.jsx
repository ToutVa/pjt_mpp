import React, { useState } from 'react';
import '../css/layout.css';
import util from "comm/util";

const HashTag = (props) => {
    const [inputHashTag, setInputHashTag] = useState('');

    // onChange 이벤트
    const changeHashTagInput = (e) => {
        setInputHashTag(e.target.value);
    };

    // onKeyUp 이벤트
    // 해시태그를 입력하고 난 후
    const addHashTag = (e) => {
        const allowedCommand = ['Comma', 'Enter', 'Space', 'NumpadEnter'];
        if (!allowedCommand.includes(e.code)) return;

        if (util.isEmpty(e.target.value.trim())) {
            return setInputHashTag('');
        }

        let newHashTag = e.target.value.trim(); // 공백때문에 동일한 단어가 등록되는 현상 막음
        const regExp = /[\{\}\[\]\/?.;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g;
        if (regExp.test(newHashTag)) {
            newHashTag = newHashTag.replace(regExp, '');
        }

        // 콤마(,)로 입력한 경우 콤마도 같이 입력되는 현상 제거
        if (newHashTag.includes(',')) {
            newHashTag = newHashTag.split(',').join('');
        }

        if (util.isEmpty(newHashTag)) return;

        props.setHashTags((prevHashTags) => {
            return [...new Set([...prevHashTags, newHashTag])];
        });

        setInputHashTag('');
    };

    // keyDownHandler 이벤트
    // form 전송되는 버그가 있어 기본동작 막음
    const keyDownHandler = (e) => {
        if (e.code !== 'Enter' && e.code !== 'NumpadEnter') return;
        e.preventDefault();

        const regExp = /^[a-z|A-Z|가-힣|ㄱ-ㅎ|ㅏ-ㅣ|0-9| \t|]+$/g;
        if (!regExp.test(e.target.value)) {
            setInputHashTag('');
        }
    };

    //해시태그 삭제이벤트
    const deleteHashTag = (e) => {
        let idx = e.currentTarget.id.substr(3); //idx 추출
        props.setHashTags((prevHashTags) => {
            let itemArr = [];
            prevHashTags.forEach((item, index)=> {
                if(index !== idx) itemArr.push(item);
            })
            return itemArr;
        });
    }
    
    return (
      <>
        <div className='hashTags'>
            {props.hashTags.length > 0 && props.hashTags.map((hashTag, idx) => {
                                                    return (
                                                        <div key={hashTag} className="tag">
                                                            <span className="tag-nm">{hashTag}</span>
                                                            <span className="close" id={"tag"+idx} onClick={deleteHashTag}>X</span>
                                                        </div>
                                                    );
                                                })
            }

            <input
                value={inputHashTag}
                onChange={changeHashTagInput}
                onKeyUp={addHashTag}
                onKeyDown={keyDownHandler}

                placeholder='#해시태그를 등록해보세요.'
                className='hashTagInput'
            />
        </div>
      </>
    );
  };
  
  export default HashTag;