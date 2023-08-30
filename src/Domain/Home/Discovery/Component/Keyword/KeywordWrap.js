import React, { useEffect, useState } from 'react';
import ic_reset from 'Assets/Images/ic_reset.png';
import ic_reset02 from 'Assets/Images/ic_reset02.png';
import ic_search from 'Assets/Images/ic_search.png';
import arr_drop from 'Assets/Images/arr_drop.svg';
import Button from 'Domain/Home/Common/Componet/Button';
import KeywordDepth from './KeywordDepth';
import * as discoveryAPI from 'Domain/Home/Discovery/API/Call';
import common from 'Utill';
import { useDispatch } from 'react-redux';
import { setSelectKeyword } from 'Domain/Home/Common/Status/CommonSlice';

export default function KeywordWrap(props) {
  const dispatch = useDispatch();

  // const tempKeywordData = [
  //   {id: 0, term: '혼합현실', weight: 1},
  //   {id: 1, term: '증강현실', weight: 1},
  //   {id: 2, term: '텔레포트', weight: 1},
  //   {id: 3, term: '혼합현실', weight: 2},
  //   {id: 4, term: '혼합현실', weight: 2},
  //   {id: 5, term: '실감미디어', weight: 2},
  //   {id: 6, term: '현실', weight: 3},
  //   {id: 7, term: '인터렉션', weight: 3},
  //   {id: 8, term: '큐레이션', weight: 3},
  //   {id: 9, term: '큐레이션', weight: 3},
  //   {id: 10, term: '텔레포트', weight: 3},
  //   {id: 11, term: '텔레포트', weight: 3},
  //   {id: 12, term: '실감디바이스', weight: 3},
  //   {id: 13, term: '텔레포트', weight: 4},
  //   {id: 14, term: '실감미디어', weight: 4},
  //   {id: 15, term: '위치기반', weight: 4},
  //   {id: 16, term: '혼합현실', weight: 4},
  //   {id: 17, term: '혼합현실', weight: 4},
  //   {id: 18, term: '큐레이션', weight: 4},
  //   {id: 19, term: '큐레이션', weight: 5},
  //   {id: 20, term: '혼합현실', weight: 5},
  //   {id: 21, term: '실감미디어', weight: 5},
  // ];

  const { folded } = props;
  const [totalData, setTotalData] = useState({});
  const [selectedData, setSelectedData] = useState({});
  const [resetDisabled, setResetDisabled] = useState(true);
  const [fullFold, setFullFold] = useState(folded ?? false);

  // 키워드 클릭 이벤트
  const handleKeywordClick = (event, dep) => {
    const idx = +event.target.dataset.idx;

    setTotalData((state) => {
      const dataLength = Object.keys(totalData).length;
      const newState = {
        ...state,
        [dep]: {
          ...state[dep],
          list: state[dep]?.list?.map((e) => {
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
      return newState;
    });
  };

  // 키워드 확장 버튼 클릭 이벤트
  const handleExpendClick = async (dep) => {
    let procKeyword = common.procSelectedData(selectedData, dep, props.keyword);
    const data = await discoveryAPI.discoveryKeyword(procKeyword.keyword, procKeyword.selectKeyword);
    const keywordData = common.procKeywordData(data?.data?.result ?? []);

    // 2depth ~ 키워드 데이터 노출
    setTotalData((state) => {
      let newPrevState = {};
      
      for (const key in state) {
        newPrevState[key] = { ...state[key], fold: true };
      }
      
      return { ...newPrevState, [dep]: { fold: false, list: keywordData } };
    });
  };

  // 키워드 선택 초기화
  const onKeywordReset = async () => {
    const data = await discoveryAPI.discoveryKeyword(props.keyword);
    const keywordData = common.procKeywordData(data?.data?.result ?? []);
    // console.log(keywordData);
    // 1depth 키워드 데이터 노출
    setTotalData({ 1: { fold: false, list: keywordData } });
    setSelectedData({});
  };

  useEffect(() => {
    onKeywordReset();
  }, []);

  useEffect(() => {
    let newObj = {};

    Object.keys(totalData).map((key) => {
      const arr = totalData[key]?.list.filter((e) => (e.active));
      newObj[key] = { ...totalData[key], list: arr };
      setSelectedData(newObj);
    });
    // console.log('TOTAL DATA : ', totalData);
  }, [totalData]);

  useEffect(() => {
    if(selectedData[1]?.list?.length > 0) {
      setResetDisabled(false);
    } else {
      setResetDisabled(true);
    }
    // console.log('SELECT DATA : ', selectedData);
    dispatch(setSelectKeyword(selectedData));
  }, [selectedData]);

  return (
    <>
      <div className='flex items-center justify-between mt-10 px-4'>
        <h3 className='text-xl font-bold text-color-dark'>키워드 결과</h3>
        <div className='flex items-center gap-6'>
          <button type='button' className='keywords_reset_btn' disabled={resetDisabled} onClick={onKeywordReset}>
            선택 초기화
            <img src={(resetDisabled) ? ic_reset : ic_reset02} alt='선택 초기화' className='w-6' />
          </button>
          <button type='button' className={`keywords_fold_btn${(fullFold) ? ' fold' : ''}`} onClick={() => setFullFold(state => !state)}>
            {(fullFold) ? '펼치기' : '접기'} 
            <img src={arr_drop} alt='화살표' />
          </button>
        </div>
      </div>
      {(!fullFold)
        ? <>
          {Object.keys(totalData).map((key, idx) => (
            <KeywordDepth 
              key={idx}
              idx={idx + 1}
              isFold={totalData[key]?.fold}
              data={totalData[key]?.list}
              selectedData={selectedData[key]?.list}
              onKeywordClick={handleKeywordClick}
              onExpendClick={handleExpendClick}
            />
          ))}
        </>
        : ''
      }
      <Button className='gap-2 mt-6 mx-auto py-3 px-6.5 rounded-3xl text-base font-bold btn_style03' name='디스커버리' icon={ic_search} onClick={() => {}} />
    </>
  );
}
