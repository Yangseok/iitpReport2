import React, { useEffect, useState } from 'react';
import * as Hangul from 'hangul-js';
import Button from 'Domain/Home/Common/Componet/Button';
import { useSelector, useDispatch } from 'react-redux';
import { getSearchKeyword, setSearchKeyword } from 'Domain/Home/Common/Status/CommonSlice';
import $ from 'jquery';
import { useSearchParams } from 'react-router-dom';

export default function AutoCompleteSearch(props) {
  const { data, style } = props;
  const [listData, setListData] = useState([]);
  const [searchFocus, setSearchFocus] = useState(false);
  const dispatch = useDispatch();
  const keyword = useSelector(getSearchKeyword);
  const [searchParams] = useSearchParams();
  const searchParamKeyword = searchParams.get('keyword')??'';

  const onSearchKeyUp = async (e) => {
    if (e.keyCode == 13) {
      const handleSearch = props?.handleSearch;
      if (handleSearch !== undefined) handleSearch();
      return null;
    }
    const value = e.target.value;
    const hangulValue = Hangul.disassemble(value).join(''); // ㄺ=>ㄹㄱ
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
    resData.filter((item) => {
      return item.originData.includes(value) || item.diassembled.includes(hangulValue);
    }).map((item) => {
      const obj = {};
      obj.text = item.originData;
      obj.onClick = () => onListClick(item.originData);
      obj.agency = (item.type === 'company');
      tempArr.push(obj);
    });
    setListData(tempArr);
  };

  const onListClick = (text) => {
    setListData([]);
    dispatch(setSearchKeyword(text));
    setSearchFocus(false);
  };

  useEffect(() => {
    const findParentWithClass = (e, className) => {
      while (e && e !== document) {
        if (e.classList && e.classList.contains(className)) {
          return e;
        }
        e = e.parentNode;
      }
      return null;
    };
    const pageInit = () => {
      // 검색영역 외의 영역 클릭 시, 검색창 꺼짐
      $(document).on('click', (e) => {
        const isParentClass = findParentWithClass(e.target, 'auto_search_wrap');
        
        if (!isParentClass) {
          setSearchFocus(false);
        }
      });
      // 검색영역 바깥의 버튼 focus 시, 검색창 꺼짐
      $(document).on('focus', '.main_sec01 .keywords_box button:first-of-type', () => {
        setSearchFocus(false);
      });
    };

    pageInit();
  }, []);

  useEffect(() => {
    dispatch(setSearchKeyword(searchParamKeyword));
  }, [searchParamKeyword]);

  return (
    <div className={`auto_search_wrap${(searchFocus) ? ' focus' : ''}`}>
      <div className={`search_wrap${(style?.type === 1) ? ' type01' : (style?.type === 2) ? ' type02' : ''}`}>
        <label htmlFor='search_text'>검색어로 검색</label>
        <input 
          type='text'
          name='search_text'
          id='search_text'
          onChange={(e) => dispatch(setSearchKeyword(e.target.value))}
          onKeyUp={onSearchKeyUp}
          onFocus={() => setSearchFocus(true)}
          value={keyword}
          placeholder='찾고 싶은 검색어를 입력해보세요.'
          autoComplete='off'
        />
        <Button name={style?.name} onClick={props?.handleSearch} icon={style?.icon} />
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
              {(keyword) 
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
