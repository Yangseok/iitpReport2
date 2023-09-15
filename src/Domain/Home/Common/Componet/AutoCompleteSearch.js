import React, { useEffect, useState, useRef } from 'react';
import * as Hangul from 'hangul-js';
import Button from 'Domain/Home/Common/Componet/Button';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchKeyword, setTmpSearchKeyword, getTmpSearchKeyword } from 'Domain/Home/Common/Status/CommonSlice';
// import $ from 'jquery';
// import { useSearchParams } from 'react-router-dom';
import parse from 'html-react-parser';

export default function AutoCompleteSearch(props) {
  const { data, style, labelText } = props;
  const [listData, setListData] = useState([]);
  const [searchFocus, setSearchFocus] = useState(false);
  const dispatch = useDispatch();
  const tmpSearchKeyword = useSelector(getTmpSearchKeyword);
  // const [searchParams] = useSearchParams();
  // const searchParamKeyword = searchParams.get('keyword')??'';

  const searchEvent = async () => {
    setSearchFocus(false);
    dispatch(setSearchKeyword(tmpSearchKeyword));
    const handleSearch = props?.handleSearch;
    if (handleSearch !== undefined) handleSearch();
    return null;
  };

  const onSearchKeyUp = async (e) => {
    if (e.keyCode == 13) {
      searchEvent();
      return;
    }
    const value = e.target.value;
    // const hangulValue = Hangul.disassemble(value).join(''); // ㄺ=>ㄹㄱ
    const tempArr = [];
    setSearchFocus(true);
    
    if (value === '') {
      return setListData([]);
    }

    let resData = data;

    // object 에 초성필드 추가 {text:"홍길동", diassembled:"ㅎㄱㄷ"}
    resData.map((item) => {
      const dis = Hangul.disassemble(item.originData, true);
      const cho = dis.reduce(function (prev, el) {
        el = el[0] ? el[0] : el;
        return prev + el;
      }, '');
      item.diassembled = cho;
    });
    
    // 문자열 검색 || 초성검색
    resData
      // .filter((item) => {
      //   return item.originData.includes(value) || item.diassembled.includes(hangulValue);
      // })
      .map((item) => {
        const obj = {};
        obj.text = parse(item.data);
        obj.onClick = () => onListClick(item.originData);
        obj.agency = (item.type !== 'keyword');
        tempArr.push(obj);
      });
    setListData(tempArr);
  };

  const onListClick = (text) => {
    setListData([]);
    dispatch(setTmpSearchKeyword(text));
    dispatch(setSearchKeyword(text));
    setSearchFocus(false);

    const handleSearch = props?.handleSearch;
    if (handleSearch !== undefined) handleSearch();
  };

  const searchListButtonRef = useRef([]);
  const searchInputRef = useRef(null);
  const searchWrapRef = useRef(null);

  const handleInputKeyDown = (e) => {
    if(e.key === 'ArrowDown') {
      e.preventDefault();
      searchListButtonRef?.current?.[0]?.focus();
    }
    if(e.key === 'ArrowUp') {
      e.preventDefault();
      searchListButtonRef?.current?.[searchListButtonRef?.current?.length - 1]?.focus();
    }
  };

  const handleListKeyDown = (e, i) => {
    if(e.key === 'ArrowDown') {
      e.preventDefault();
      if ((searchListButtonRef?.current?.length - 1) === i) {
        searchInputRef.current.focus();
      } else {
        searchListButtonRef?.current?.[i+1]?.focus();
      }
    }
    if(e.key === 'ArrowUp') {
      e.preventDefault();
      if (i === 0) {
        searchInputRef.current.focus();
      } else {
        searchListButtonRef?.current?.[i-1]?.focus();
      }
    }
  };

  const handleClickOutside = (e) => {
    if (searchWrapRef.current && !searchWrapRef.current.contains(e.target)) {
      setSearchFocus(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('focusin', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('focusin', handleClickOutside);
    };
  }, []);

  // useEffect(() => {
  //   dispatch(setSearchKeyword(searchParamKeyword));
  //   dispatch(setTmpSearchKeyword(searchParamKeyword));
  // }, [searchParamKeyword]);

  return (
    <div className={`auto_search_wrap${(searchFocus) ? ' focus' : ''}`} ref={searchWrapRef} >
      <div className={`search_wrap${(style?.type === 1 || style?.type === 3) ? ' type01' : (style?.type === 2) ? ' type02' : ''}`}>
        <label htmlFor='search_text'>{labelText ?? '검색어로 검색'}</label>
        <input 
          type='text'
          name='search_text'
          id='search_text'
          onChange={(e) => dispatch(setTmpSearchKeyword(e.target.value))}
          onKeyUp={onSearchKeyUp}
          onKeyDown={handleInputKeyDown}
          onFocus={() => setSearchFocus(true)}
          value={tmpSearchKeyword}
          placeholder='찾고 싶은 검색어를 입력해보세요.'
          autoComplete='off'
          ref={searchInputRef}
        />
        <div className={`search_btn${(style?.type === 3) ? ' tooltip_wrap' : ''}`}>
          <Button name={style?.name} onClick={searchEvent} icon={style?.icon} />
          {(style?.type === 3) && <span className='tooltip_style05 min-w-16'>검색하기</span>}
        </div>
      </div>
      <div className='search_list'>
        <ul>
          {(listData?.length)
            ? listData?.map((e,i) => (
              <li key={i} onKeyDown={(e) => handleListKeyDown(e, i)}>
                <button type='button' onClick={e.onClick} ref={(e) => searchListButtonRef.current[i] = e}>
                  {(e.agency) ? <span className="tag_style01 mt-0.5">기업</span> : ''}
                  <span className='text'>{e.text}</span>
                </button>
              </li>
            ))
            : <li className='no_data'>
              {(tmpSearchKeyword) 
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
