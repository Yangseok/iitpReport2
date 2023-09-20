import React, { useEffect, useState, useCallback } from 'react';
import icReset from 'Assets/Images/ic_reset.png';
import icReset02 from 'Assets/Images/ic_reset02.png';
import icSearch from 'Assets/Images/ic_search.png';
import arrDrop from 'Assets/Images/arr_drop.png';
import Button from 'Domain/Home/Common/Componet/Button';
import KeywordDepth from './KeywordDepth';
import * as discoveryAPI from 'Domain/Home/Discovery/API/Call';
import common from 'Utill';

import { useSelector, useDispatch } from 'react-redux';
import { getSelectKeyword, getSearchKeywordResult, getSearchKeywordReset, setSelectKeyword, setSearchKeywordResult, setSearchKeywordReset } from 'Domain/Home/Common/Status/CommonSlice';

export default function KeywordWrap(props) {
  const dispatch = useDispatch();

  const searchKeywordResult = useSelector(getSearchKeywordResult) ?? {};
  const selectKeyword = useSelector(getSelectKeyword) ?? {};
  
  const searchKeywordReset = useSelector(getSearchKeywordReset);

  const { folded, chfold, setChFold } = props;
  const [selectedData, setSelectedData] = useState({});
  const [resetDisabled, setResetDisabled] = useState(true);
  const [fullFold, setFullFold] = useState(folded ?? false);

  const [tmpSearchKeywordResult, setTmpSearchKeywordResult] = useState(searchKeywordResult);
  const [tmpSelectKeyword, setTmpSelectKeyword] = useState(selectKeyword);

  //디스커버리 검색 이벤트
  const discoverySearchBttonClick = useCallback(async () => {
    dispatch(setSelectKeyword(tmpSelectKeyword));
    dispatch(setSearchKeywordResult(tmpSearchKeywordResult));
    props.discoverySearchBttonClick();
  }, [tmpSelectKeyword, tmpSearchKeywordResult]);

  // 키워드 클릭 이벤트
  const handleKeywordClick = (event, dep) => {
    const idx = +event.target.dataset.idx;

    const dataLength = Object.keys(tmpSearchKeywordResult).length;
    const newState = {
      ...tmpSearchKeywordResult,
      [dep]: {
        ...tmpSearchKeywordResult[dep],
        list: tmpSearchKeywordResult[dep]?.list?.map((e) => {
          if (e.id === idx) {
            return {...e, active: !e.active};
          }
          return e;
        }),
      },
    };
    for (let i = dep + 1; i <= dataLength; i++) {
      delete newState[i];
    }
    setTmpSearchKeywordResult(newState);
    // dispatch(setSearchKeywordResult(newState));
  };

  // 키워드 확장 버튼 클릭 이벤트
  const handleExpendClick = async (dep) => {
    let procKeyword = common.procSelectedData(selectedData, dep, props.keyword);
    const data = await discoveryAPI.discoveryKeyword(procKeyword.keyword, procKeyword.selectKeyword);
    const keywordData = common.procKeywordData(data?.data?.result ?? []);

    let newState = {};
    for (const key in tmpSearchKeywordResult) {
      newState[key] = { ...tmpSearchKeywordResult[key], fold: true };
    }
    newState = { ...newState, [dep]: { fold: false, list: keywordData } };
    
    setTmpSearchKeywordResult(newState);
    // dispatch(setSearchKeywordResult(newState));
  };

  // 키워드 선택 초기화
  const onKeywordReset = async () => {
    const data = await discoveryAPI.discoveryKeyword(props.keyword);
    const keywordData = common.procKeywordData(data?.data?.result ?? []);
    // console.log(keywordData);
    // 1depth 키워드 데이터 노출
    setTmpSearchKeywordResult({ 1: { fold: false, list: keywordData } });
    // dispatch(setSearchKeywordResult({ 1: { fold: false, list: keywordData } }));
    setSelectedData({});
  };

  useEffect(() => {
    // console.log('onKeywordReset : searchKeywordReset', searchKeywordReset);
    if (searchKeywordReset === true) {
      dispatch(setSearchKeywordReset(false));
      onKeywordReset();
    }
  }, [searchKeywordReset]);

  useEffect(() => {
    let newObj = {};

    Object.keys(tmpSearchKeywordResult).map((key) => {
      const arr = tmpSearchKeywordResult[key]?.list.filter((e) => (e.active));
      newObj[key] = { ...tmpSearchKeywordResult[key], list: arr };
      setSelectedData(newObj);
    });
    // console.log('TOTAL DATA : ', searchKeywordResult);
  }, [tmpSearchKeywordResult]);

  useEffect(() => {
    if(selectedData[1]?.list?.length > 0) {
      setResetDisabled(false);
    } else {
      setResetDisabled(true);
    }
    // console.log('SELECT DATA : ', selectedData);
    setTmpSelectKeyword(selectedData);
    // dispatch(setSelectKeyword(selectedData));
  }, [selectedData]);

  useEffect(() => {
    if (chfold) {
      setFullFold(true);
      setChFold(false);
    }
  }, [chfold]);

  return (
    <>
      <div className='flex items-center justify-between mt-10 px-4'>
        <h3 className='text-xl font-bold text-color-dark'>키워드 결과</h3>
        <div className='flex items-center gap-6'>
          <button type='button' className='discovery_reset_btn' disabled={resetDisabled} onClick={onKeywordReset}>
            선택 초기화
            <img src={(resetDisabled) ? icReset : icReset02} alt='선택 초기화' className='w-6' />
          </button>
          <button type='button' className={`discovery_fold_btn${(fullFold) ? ' fold' : ''}`} onClick={() => setFullFold(state => !state)}>
            {(fullFold) ? '펼치기' : '접기'} 
            <img src={arrDrop} alt='화살표' className='w-6' />
          </button>
        </div>
      </div>
      {(!fullFold)
        ? <>
          {Object.keys(tmpSearchKeywordResult).map((key, idx) => (
            <KeywordDepth 
              key={idx}
              idx={idx + 1}
              isFold={tmpSearchKeywordResult[key]?.fold}
              data={tmpSearchKeywordResult[key]?.list}
              selectedData={selectedData[key]?.list}
              onKeywordClick={handleKeywordClick}
              onExpendClick={handleExpendClick}
            />
          ))}
          <Button className='gap-2 mt-6 mx-auto py-3 px-6.5 rounded-3xl text-base font-bold btn_style03' name='디스커버리' icon={icSearch} onClick={() => discoverySearchBttonClick()} />
        </>
        : null
      }
    </>
  );
}
