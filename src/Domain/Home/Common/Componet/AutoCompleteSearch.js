import React, { useEffect, useState, useRef, useCallback } from 'react';
import Button from 'Domain/Home/Common/Componet/Button';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchKeyword, setTmpSearchKeyword, getTmpSearchKeyword } from 'Domain/Home/Common/Status/CommonSlice';
import parse from 'html-react-parser';
import * as mainAPI from 'Domain/Home/Main/API/Call';

export default function AutoCompleteSearch(props) {
  const { style, labelText } = props;
  const [listData, setListData] = useState([]);
  const [searchFocus, setSearchFocus] = useState(false);
  const dispatch = useDispatch();
  const tmpSearchKeyword = useSelector(getTmpSearchKeyword);
  // const [searchParams] = useSearchParams();
  // const searchParamKeyword = searchParams.get('keyword')??'';

  const [timeoutFn, setTimeoutFn] = useState(null);

  const searchEvent = async () => {
    const handleValid = props?.handleValid;
    if (handleValid !== undefined) {
      const validBool = handleValid(tmpSearchKeyword);
      if (!validBool) return null;
    }

    //todo: 검색어 입력..
    setSearchFocus(false);
    dispatch(setSearchKeyword(tmpSearchKeyword));
    const handleSearch = props?.handleSearch;
    if (handleSearch !== undefined) handleSearch(false, true, tmpSearchKeyword);

    const setSearchButtonClick = props?.setSearchButtonClick;
    if (setSearchButtonClick !== undefined) setSearchButtonClick(true);
  };

  const onSearchKeyUp = async (e) => {
    if (e.keyCode == 13) {
      searchEvent();
      return;
    }
    const value = e.target.value;
    setSearchFocus(true);
    if (value === '') {
      return setListData([]);
    }
  };

  const onListClick = (text, agency=false) => {
    setListData([]);
    dispatch(setTmpSearchKeyword(text));
    dispatch(setSearchKeyword(text));
    setSearchFocus(false);

    const handleSearch = props?.handleSearch;
    if (handleSearch !== undefined) handleSearch(agency, true, text);
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

  const getAutocompleteList = useCallback(async (keyword) => {
    if ((keyword?.trim() ?? '') !== '') {
      const data = await mainAPI.autocomplete(keyword);

      const tempArr = [];
      data?.data?.result?.map((item, idx) => {
        const obj = {};
        obj.id = idx;
        obj.text = parse(item.data);
        obj.agency = (item.type !== 'keyword');
        obj.onClick = () => onListClick(item.originData, obj.agency);
        tempArr.push(obj);
      });
      setListData(tempArr);
    }
  }, []);

  const onChangeInput = useCallback(async (e) => {
    dispatch(setTmpSearchKeyword(e.target.value));
    if (timeoutFn !== null) {
      clearTimeout(timeoutFn);
    }
    setTimeoutFn(setTimeout(async() => {
      await getAutocompleteList(e.target.value);
    }, 300));
  }, [timeoutFn]);

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
          onChange={onChangeInput}
          onKeyUp={onSearchKeyUp}
          onKeyDown={handleInputKeyDown}
          onFocus={(e) => {setSearchFocus(true); onSearchKeyUp(e);}}
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
              <li key={e.id} onKeyDown={(e) => handleListKeyDown(e, i)}>
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
