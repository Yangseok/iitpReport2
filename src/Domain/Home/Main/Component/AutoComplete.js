import React, { useEffect, useState } from 'react';
import * as Hangul from 'hangul-js';
import ic_search from 'Assets/Images/ic_search.png';
import Button from 'Domain/Home/Common/Componet/Button';

export default function AutoComplete() {
  const tempData = [
    {text: 'aaa 건전지'},
    {text: 'aaa 베이커리'},
    {text: 'aaa 티셔츠'},
    {text: '기업명', agency: true},
  ];
  const [data, setData] = useState([]);
  const [listData, setListData] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [searchFocus, setSearchFocus] = useState(false);

  const onSearchKeyUp = (e) => {
    const value = e.target.value;
    const hangulValue = Hangul.disassemble(value).join(''); // ㄺ=>ㄹㄱ
    const tempArr = [];
    
    if (value === '') {
      return setListData([]);
    }

    // object 에 초성필드 추가 {text:"홍길동", diassembled:"ㅎㄱㄷ"}
    data.map((item) => {
      const dis = Hangul.disassemble(item.text, true);
      const cho = dis.reduce(function (prev, el) {
        el = el[0] ? el[0] : el;
        return prev + el;
      }, '');
      item.diassembled = cho;
    });
    
    // 문자열 검색 || 초성검색
    data.filter((item) => {
      return item.text.includes(value) || item.diassembled.includes(hangulValue);
    }).map((item) => {
      const obj = {};
      obj.text = item.text;
      obj.onClick = () => onListClick(item.text);
      if(item.agency !== null) {
        obj.agency = item.agency;
      }
      tempArr.push(obj);
    });
    setListData(tempArr);
  };

  const onListClick = (text) => {
    setListData([]);
    setSearchValue(text);
    setSearchFocus(false);
  };

  useEffect(() => {
    const pageInit = () => {
      setData(tempData);

      // 검색영역 외의 영역 클릭 시, 검색창 꺼짐
      document.addEventListener('click', (e) => {
        const isParentClass = findParentWithClass(e.target, 'auto_search_wrap');
        
        if (!isParentClass) {
          setSearchFocus(false);
        }
      });
    };
    const findParentWithClass = (e, className) => {
      while (e && e !== document) {
        if (e.classList && e.classList.contains(className)) {
          return e;
        }
        e = e.parentNode;
      }
      return null;
    };

    return () => pageInit();
  }, []);

  return (
    <div className={(searchFocus) ? 'auto_search_wrap focus' : 'auto_search_wrap'}>
      <div className='search_wrap type01'>
        <label htmlFor='search_text'>검색어로 검색</label>
        <input 
          type='text'
          name='search_text'
          id='search_text'
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyUp={onSearchKeyUp}
          onFocus={() => setSearchFocus(true)}
          value={searchValue}
          placeholder='찾고 싶은 검색어를 입력해보세요.'
          autoComplete='off'
        />
        <Button name='ICT 키워드 검색' icon={ic_search} />
      </div>
      <div className='search_list'>
        <ul>
          {(listData?.length)
            ? listData?.map((e,i) => (
              <li key={i}>
                <button type='button' onClick={e.onClick}>
                  {(e.agency) ? <span className="tag_style01 mt-0.5">기업</span> : ''}
                  {e.text}
                </button>
              </li>
            ))
            : <li className='no_data'>
              {(searchValue) 
                ? '해당하는 검색어가 없습니다.'
                : '검색어를 입력해주세요.'
              }
            </li>
          }
        </ul>
      </div>
    </div>
  );
}
