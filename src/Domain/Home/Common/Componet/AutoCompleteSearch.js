import React, { useEffect, useState } from 'react';
import * as Hangul from 'hangul-js';
import Button from 'Domain/Home/Common/Componet/Button';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchKeyword, setTmpSearchKeyword, getTmpSearchKeyword } from 'Domain/Home/Common/Status/CommonSlice';
import $ from 'jquery';
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
    setSearchFocus(false);
  };

  useEffect(() => {
    const searchInputEl = $('.auto_search_wrap .search_wrap input');

    // 검색창 focus 되어있을 때 방향키 입력시, 아래 리스트로 이동
    searchInputEl.on('keydown', (e) => {
      const searchListLiEl = $('.auto_search_wrap .search_list ul li');
      const length = searchListLiEl.length;
      
      if(e.key === 'ArrowDown') {
        e.preventDefault();
        searchListLiEl.eq(0).find('button').focus();
      }
      if(e.key === 'ArrowUp') {
        e.preventDefault();
        searchListLiEl.eq(length - 1).find('button').focus();
      }
    });

    // 검색 리스트 focus 되어있을 때 방향키 입력시, 리스트 내에서 방향이동
    $(document).on('keydown', '.auto_search_wrap.focus .search_list ul li button', (e) => {
      const searchListLiEl = $('.auto_search_wrap .search_list ul li');
      const idx = $(e.target).parent().index();
      const length = searchListLiEl.length;

      if(e.key === 'ArrowDown') {
        e.preventDefault();
        if(idx === length - 1) {
          searchListLiEl.eq(0).find('button').focus();
        } else {
          searchListLiEl.eq(idx + 1).find('button').focus();
        }
      }
      if(e.key === 'ArrowUp') {
        e.preventDefault();
        if(idx === 0) {
          searchInputEl.focus();
        } else {
          searchListLiEl.eq(idx - 1).find('button').focus();
        }
      }
    });

    // 검색영역 외의 영역 클릭 시, 검색창 꺼짐
    $(document).on('click', function(e) {
      const searchWrap = $(e.target).parents('.auto_search_wrap');
      if (!searchWrap.hasClass('auto_search_wrap')) {
        setSearchFocus(false);
      }
    });

    // 검색영역 바깥의 버튼 focus 시, 검색창 꺼짐
    $('*').on('focusin', (e) => {
      const searchWrap = $(e.target).parents('.auto_search_wrap');
      if (!searchWrap.hasClass('auto_search_wrap')) {
        setSearchFocus(false);
      }
    });
  }, []);

  // useEffect(() => {
  //   dispatch(setSearchKeyword(searchParamKeyword));
  //   dispatch(setTmpSearchKeyword(searchParamKeyword));
  // }, [searchParamKeyword]);

  return (
    <div className={`auto_search_wrap${(searchFocus) ? ' focus' : ''}`}>
      <div className={`search_wrap${(style?.type === 1 || style?.type === 3) ? ' type01' : (style?.type === 2) ? ' type02' : ''}`}>
        <label htmlFor='search_text'>{labelText ?? '검색어로 검색'}</label>
        <input 
          type='text'
          name='search_text'
          id='search_text'
          onChange={(e) => dispatch(setTmpSearchKeyword(e.target.value))}
          onKeyUp={onSearchKeyUp}
          onFocus={() => setSearchFocus(true)}
          value={tmpSearchKeyword}
          placeholder='찾고 싶은 검색어를 입력해보세요.'
          autoComplete='off'
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
              <li key={i}>
                <button type='button' onClick={e.onClick}>
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
