import React, { useEffect, useState } from 'react';
import icReset from 'Assets/Images/ic_reset.png';
import icReset02 from 'Assets/Images/ic_reset02.png';
import icSearch from 'Assets/Images/ic_search.png';
import arrDrop from 'Assets/Images/arr_drop.png';
import Button from 'Domain/Home/Common/Componet/Button';
import KeywordDepth from './KeywordDepth';
import * as discoveryAPI from 'Domain/Home/Discovery/API/Call';
import common from 'Utill';
import { useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectKeyword, setSearchKeywordResult, getSearchKeywordResult, setSearchKeywordReset, getSearchKeywordReset, setTmpSearchKeyword, getTmpSearchKeyword } from 'Domain/Home/Common/Status/CommonSlice';
import { setMsg,setShow } from 'Domain/Home/Common/Status/MsgSlice';

export default function KeywordWrap(props) {
  const dispatch = useDispatch();

  const searchKeywordResult = useSelector(getSearchKeywordResult) ?? {};
  const searchKeywordReset = useSelector(getSearchKeywordReset);
  const tmpSearchKeyword = useSelector(getTmpSearchKeyword);
  
  const [searchParams] = useSearchParams();
  const searchParamKeyword = searchParams.get('keyword')??'';
  
  const se = common.getSegment();

  const { folded, chfold, setChFold } = props;
  const [selectedData, setSelectedData] = useState({});
  const [resetDisabled, setResetDisabled] = useState(true);
  const [fullFold, setFullFold] = useState(folded ?? false);

  // 키워드 클릭 이벤트
  const handleKeywordClick = (event, dep) => {
    const idx = +event.target.dataset.idx;

    const dataLength = Object.keys(searchKeywordResult).length;
    const newState = {
      ...searchKeywordResult,
      [dep]: {
        ...searchKeywordResult[dep],
        list: searchKeywordResult[dep]?.list?.map((e) => {
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
    dispatch(setSearchKeywordResult(newState));
  };

  // 키워드 확장 버튼 클릭 이벤트
  const handleExpendClick = async (dep) => {
    let procKeyword = common.procSelectedData(selectedData, dep, props.keyword);
    const data = await discoveryAPI.discoveryKeyword(procKeyword.keyword, procKeyword.selectKeyword);
    const keywordData = common.procKeywordData(data?.data?.result ?? []);

    let newState = {};
    for (const key in searchKeywordResult) {
      newState[key] = { ...searchKeywordResult[key], fold: true };
    }
    newState = { ...newState, [dep]: { fold: false, list: keywordData } };
    
    dispatch(setSearchKeywordResult(newState));
  };

  // 키워드 선택 초기화
  const onKeywordReset = async () => {
    const data = await discoveryAPI.discoveryKeyword(props.keyword);
    const keywordData = common.procKeywordData(data?.data?.result ?? []);
    // console.log(keywordData);
    // 1depth 키워드 데이터 노출
    dispatch(setSearchKeywordResult({ 1: { fold: false, list: keywordData } }));
    setSelectedData({});

    dispatch(setTmpSearchKeyword(props.keyword));
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

    Object.keys(searchKeywordResult).map((key) => {
      const arr = searchKeywordResult[key]?.list.filter((e) => (e.active));
      newObj[key] = { ...searchKeywordResult[key], list: arr };
      setSelectedData(newObj);
    });
    // console.log('TOTAL DATA : ', searchKeywordResult);
  }, [searchKeywordResult]);

  useEffect(() => {
    if(selectedData[1]?.list?.length > 0) {
      setResetDisabled(false);
    } else {
      setResetDisabled(true);
    }
    // console.log('SELECT DATA : ', selectedData);
    dispatch(setSelectKeyword(selectedData));
  }, [selectedData]);

  useEffect(() => {
    if (tmpSearchKeyword !== searchParamKeyword && se[4] !== undefined) {
      // searchEvent();
      // console.log('tmpSearchKeyword', tmpSearchKeyword);
      // console.log('searchParamKeyword', searchParamKeyword);
      // console.log('se4', se[4]);

      dispatch(setMsg({
        title: '알림',
        msg: '"'+searchParamKeyword+'"에서 "'+tmpSearchKeyword + '"로 키워드 분석을 변경하여 페이지를 이동합니다.',
        btnCss: ['inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200'],
        btnTxt: ['확인'],
        btnEvent: ['goKeyword']
      }));
      dispatch(setShow(true));
    }
  }, [tmpSearchKeyword, searchParamKeyword, se]);

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
          {Object.keys(searchKeywordResult).map((key, idx) => (
            <KeywordDepth 
              key={idx}
              idx={idx + 1}
              isFold={searchKeywordResult[key]?.fold}
              data={searchKeywordResult[key]?.list}
              selectedData={selectedData[key]?.list}
              onKeywordClick={handleKeywordClick}
              onExpendClick={handleExpendClick}
            />
          ))}
        </>
        : ''
      }
      <Button className='gap-2 mt-6 mx-auto py-3 px-6.5 rounded-3xl text-base font-bold btn_style03' name='디스커버리' icon={icSearch} onClick={props.discoverySearchBttonClick} />
    </>
  );
}
