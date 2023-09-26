import React, { useEffect, useState, useCallback } from 'react';
import 'Assets/Css/Demand.css';
import icGuide from 'Assets/Images/ic_guide.png';
import icFilter from 'Assets/Images/ic_filter.png';
import icFilter02 from 'Assets/Images/ic_filter02.png';
import icReset from 'Assets/Images/ic_reset.png';
import icReset02 from 'Assets/Images/ic_reset02.png';
import icSearch from 'Assets/Images/ic_search.png';
import Layout from 'Domain/Home/Common/Layout/Sub';
import Button from 'Domain/Home/Common/Componet/Button';
import Pagination from 'Domain/Home/Common/Componet/Pagination';
import CheckListWrap from 'Domain/Home/DemandBanking/Component/CheckListWrap';
import RcSlider from 'rc-slider';
import { useNavigate } from 'react-router-dom';
import GuidePopup from 'Domain/Home/Common/Componet/GuidePopup';
import { useSelector, useDispatch } from 'react-redux';
import { setLoading } from 'Domain/Home/Common/Status/CommonSlice';
import common from 'Utill';
// import * as viewCallAPI from 'Domain/Home/Discovery/API/ViewCall';
import * as demandCallAPI from 'Domain/Home/DemandBanking/API/Call';
import moment from 'moment';
import { getBigIctTmp, getMiddleIctTmp, getSmallIctTmp, getDetailIctTmp, getBigIctList, getMiddleIctList, getSmallIctList, getDetailIctList, setBigIctTmp, setMiddleIctTmp, setSmallIctTmp, setDetailIctTmp, setBigIctList, setMiddleIctList, setSmallIctList, setDetailIctList, setStartYear, setEndYear, getSelectedList, setSelectedList } from 'Domain/Home/DemandBanking/Status/DemandSlice';

export default function Main() {
  const dispatch = useDispatch();

  let rangeMarks = {};
  const rangeMin = 2017;
  const rangeMax = Number(moment().format('YYYY'));
  for(let i = rangeMin; i <= rangeMax; i++) {
    rangeMarks[i] = i;
  }

  const navigate = useNavigate();
  const [rangeValue, setRangeValue] = useState([Number(moment().subtract(1, 'year').format('YYYY')), rangeMax]);
  const [filterShow, setFilterShow] = useState(false);
  const [sortType, setSortType] = useState('ALL');
  const [sortStatus, setSortStatus] = useState('ALL');
  
  const [bigIct, setBigIct] = useState('');
  const [middleIct, setMiddleIct] = useState('');
  const [smallIct, setSmallIct] = useState('');
  const [detailIct, setDetailIct] = useState('');

  const bigIctTmp = useSelector(getBigIctTmp);
  const middleIctTmp = useSelector(getMiddleIctTmp);
  const smallIctTmp = useSelector(getSmallIctTmp);
  const detailIctTmp = useSelector(getDetailIctTmp);

  const bigIctList = useSelector(getBigIctList);
  const middleIctList = useSelector(getMiddleIctList);
  const smallIctList = useSelector(getSmallIctList);
  const detailIctList = useSelector(getDetailIctList);

  const [checkAll, setCheckAll] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [data, setData] = useState([]);
  const [popup, setPopup] = useState(false);
  const [countData, setCountData] = useState([]);
  const [page, setPage] = useState(1);
  const [size] = useState(20);
  const [totalCount, setTotalCount] = useState(0);

  const selectedList = useSelector(getSelectedList);

  // useEffect(() => {
  //   console.log('selectedList:', selectedList);
  // }, [selectedList]);

  //필터 선택 초기화
  const initFilterClick = () => {
    getFilterList('BCLS','', true);
    // handleFilterApply();
  };

  // 전체 선택 클릭
  const onAllItemClick = () => {
    // console.log('onAllItemClick');
    const newData = data?.map(e => {
      return {...e, active: !checkAll};
    });
    setData(newData);
    setCheckAll(state => !state);
    // console.log('newData:', newData);

    let dataIds = [];
    if ((data?.length ?? 0) > 0) dataIds = data.map(e => e.id);
    // console.log('dataIds:', dataIds);

    if (checkAll) {
      // console.log('setSelectedList:', selectedList.filter(e => dataIds.indexOf(e.id) === -1));
      dispatch(setSelectedList(selectedList.filter(e => dataIds.indexOf(e.id) === -1)));
    } else {
      let newSelecedList = JSON.parse(JSON.stringify(selectedList));
      const addData = newData.filter(e => selectedList.map(s => s.id).indexOf(e.id) === -1);
      if ((addData?.length ?? 0) > 0) {
        for (let i in addData) {
          newSelecedList.push(addData[i]);
        }
      }
      dispatch(setSelectedList(newSelecedList));
    }
  };

  //개별 선택 클릭
  const handleItemClick = (id) => {
    // console.log('handleItemClick');
    const newData = data?.map(e => {
      if (e.id === id) {
        return {...e, active: !e.active};
      }
      return e;
    });
    // console.log('newData:', newData);
    setData(newData);
    
    // console.log('newData?.length:', newData?.length);
    // console.log('selectedList?.map(e => e.id === id)?.length:', selectedList?.map(e => e.id === id)?.length);

    if ((newData?.length ?? 0) > 0) {
      if ((selectedList?.filter(e => e.id === id)?.length ?? 0) > 0) {
        dispatch(setSelectedList(selectedList.filter(e => e.id !== id)));
      } else {
        let newSelecedList = JSON.parse(JSON.stringify(selectedList));
        const addData = newData.filter(e => e.id === id);
        if ((addData?.length ?? 0) > 0) {
          for (let i in addData) {
            newSelecedList.push(addData[i]);
          }
        }
        // console.log('selectedList:', selectedList);
        // console.log('newSelecedList:', newSelecedList);
        dispatch(setSelectedList(newSelecedList));
      }
    }
  };

  const handleInitSelectedClick = () => {
    const newData = data?.map(e => {
      return {...e, active: false};
    });
    setData(newData);
    dispatch(setSelectedList([]));
    setCheckAll(false);
  };

  const initFilterData = useCallback(async (type='BCLS') => {
    if (['BCLS'].indexOf(type) !== -1) {
      dispatch(setBigIctTmp(''));
      dispatch(setBigIctList([]));
    }
    if (['BCLS','LCLS'].indexOf(type) !== -1) {
      dispatch(setMiddleIctTmp(''));
      dispatch(setMiddleIctList([]));
    }
    if (['BCLS','LCLS','MCLS'].indexOf(type) !== -1) {
      dispatch(setSmallIctTmp(''));
      dispatch(setSmallIctList([]));
    }
    if (['BCLS','LCLS','MCLS','SCLS'].indexOf(type) !== -1) {
      dispatch(setDetailIctTmp(''));
      dispatch(setDetailIctList([]));
    }
  }, []);

  const handleFilterApply = (e) => {
    setBigIct(bigIctTmp);
    setMiddleIct(middleIctTmp);
    setSmallIct(smallIctTmp);
    setDetailIct(detailIctTmp);
    setPage(1);
    dispatch(setSelectedList([]));
    setCheckAll(false);
    e?.preventDefault();
  };

  const getSurveyCount = useCallback(async () => {
    let data = [];
    try {
      dispatch(setLoading(true));
      data = await demandCallAPI.surveyCount();
    } catch (e) {
      console.warn(e);
    } finally {
      dispatch(setLoading(false));  
    }
    console.log('getSurveyCount:', data?.data?.result);
    setCountData(data?.data?.result ?? []);
  }, []);

  const getNoticeList = useCallback(async () => {
    let data = [];
    try {
      dispatch(setLoading(true));
      dispatch(setStartYear(rangeValue[1]));
      dispatch(setEndYear(rangeValue[1]));
      data = await demandCallAPI.noticeList(rangeValue[0],rangeValue[1],sortType,sortStatus,bigIct,middleIct,smallIct,detailIct,size,page);
    } catch (e) {
      console.warn(e);
    } finally {
      dispatch(setLoading(false));  
    }
    console.log('getNoticeList:', data?.data?.result);

    const statusNumber = {
      PROGRESS: 1,
      END: 2,
    };
    const typeNumber = {
      REGULAR: 1,
      IRREGULAR: 2,
      NONE: 3,
    };

    let tmpData = [];
    for (let i in data?.data?.result?.dataList ?? []) {
      if (data?.data?.result?.dataList?.[i]?.noticeId === undefined) continue;
      let pushData = {
        id: data?.data?.result?.dataList?.[i]?.noticeId,
        status: statusNumber[data?.data?.result?.dataList?.[i]?.status ?? 'END'] ?? 2,
        type: typeNumber[data?.data?.result?.dataList?.[i]?.typeCode ?? 'NONE'] ?? 3,
        period: data?.data?.result?.dataList?.[i]?.period ?? '',
        title: data?.data?.result?.dataList?.[i]?.noticeTitle ?? '',
        count: data?.data?.result?.dataList?.[i]?.surveyCount ?? 0,
        active: ((selectedList?.filter(e => e.id === data?.data?.result?.dataList?.[i]?.noticeId)?.length ?? 0) === 1),
      };
      tmpData.push(pushData);
    }
    // console.log('tmpData:', tmpData);
    setData(tmpData);
    setTotalCount(data?.data?.result?.totalCount ?? 0);
  }, [rangeValue, sortType, sortStatus, bigIct, middleIct, smallIct, detailIct, size, page, selectedList]);

  const getFilterList = useCallback(async (type='BCLS',code='', handleApply=false) => {
    let data = [];
    try {
      dispatch(setLoading(true));
      data = await demandCallAPI.ictClass(type,code);
    } catch (e) {
      console.warn(e);
    } finally {
      dispatch(setLoading(false));
    }
    console.log('getFilterList:', data?.data?.result);
    initFilterData(type);
    switch (type) {
    case 'BCLS':
      dispatch(setBigIctList(data?.data?.result ?? []));
      break;
    case 'LCLS':
      dispatch(setMiddleIctList(data?.data?.result ?? []));
      break;
    case 'MCLS':
      dispatch(setSmallIctList(data?.data?.result ?? []));
      break;
    case 'SCLS':
      dispatch(setDetailIctList(data?.data?.result ?? []));
      break;
    }
    if (handleApply) {
      handleFilterApply();
    }
  }, []);

  useEffect(() => {
    const activeItems = data.filter(e => e.active === true);
    if (activeItems.length > 0) {
      if (activeItems.length === data.length) {
        setCheckAll(true);
      } else {
        setCheckAll(false);
      }
    }
  }, [data, page]);

  useEffect(() => {
    if (selectedList.length > 0) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [selectedList]);
  
  useEffect(() => {
    getNoticeList();
  }, [rangeValue, sortType, sortStatus, bigIct, middleIct, smallIct, detailIct, size, page]);

  //필터 활성화시 대분류 리스트를 가져옴.
  useEffect(() => {
    if (filterShow && bigIctTmp == '') {
      getFilterList('BCLS','');
    }
  }, [filterShow, bigIctTmp]);

  //대뷴류 선택시 중뷴류 리스트를 가져옴.
  useEffect(() => {
    if (bigIctTmp !== '') {
      getFilterList('LCLS',bigIctTmp);
    }
  }, [bigIctTmp]);

  //중분류 선택시 소분류 리스트를 가져옴
  useEffect(() => {
    if (middleIctTmp !== '') {
      getFilterList('MCLS',middleIctTmp);
    }
  }, [middleIctTmp]);

  //소분류 선택시 세분류 리스트를 가져옴.
  useEffect(() => {
    if (smallIctTmp !== '') {
      getFilterList('SCLS',smallIctTmp);
    }
  }, [smallIctTmp]);

  useEffect(() => {
    //수요조사 접수현황
    getSurveyCount();

    //페이지 이동하여 왔을시 초기화
    setRangeValue([Number(moment().subtract(1, 'year').format('YYYY')), rangeMax]);
    setSortType('ALL');
    setSortStatus('ALL');
    handleInitSelectedClick();
    getFilterList('BCLS','',true);
    
    const getDelaytNoticeList = () => {
      return setTimeout(() => {
        getNoticeList();
      }, 300);
    };
    getDelaytNoticeList();
    return () => clearTimeout(getDelaytNoticeList);
  }, []);

  return (
    <Layout>
      <section>
        <div className='container relative'>
          <div className='reception_wrap'>
            <p className='text-base font-bold text-color-dark'>
              <strong>수요조사 접수현황</strong>
            </p>
            <div className='float_wrap mt-2'>
              <p className='text-base font-bold text-color-dark float-left'>전체</p>
              <p className='text-base font-bold text-color-main float-right break-all text-right'>{common.setPriceInput(countData?.totalCount ?? 0)}건</p>
            </div>
            <div className='float_wrap mt-2'>
              <p className='text-base font-bold text-color-dark float-left'>정기</p>
              <p className='text-base font-bold text-color-main float-right break-all text-right'>{common.setPriceInput(countData?.regularCount ?? 0)}건</p>
            </div>
            <div className='float_wrap mt-2'>
              <p className='text-base font-bold text-color-dark float-left'>수시</p>
              <p className='text-base font-bold text-color-main float-right break-all text-right'>{common.setPriceInput(countData?.irregularCount ?? 0)}건</p>
            </div>
            {((countData?.noneCount ?? 0) !== 0) ? <div className='float_wrap mt-2'>
              <p className='text-base font-bold text-color-dark float-left'>해당없음</p>
              <p className='text-base font-bold text-color-main float-right break-all text-right'>{common.setPriceInput(countData?.noneCount ?? 0)}건</p>
            </div> : null}
          </div>

          <div className='flex items-center gap-10'>
            <h2 className='py-3 px-10 rounded-3xl text-base font-bold text-color-white bg-color-main'>
              공고별 보기
            </h2>
            <div className='rc_custom flex-1'>
              <RcSlider
                range
                min={rangeMin}
                max={rangeMax}
                marks={rangeMarks}
                value={rangeValue}
                onChange={(e) => setRangeValue(e)}
              />
            </div>
            <button type='button' className='guide_btn gap-1' onClick={() => setPopup(true)}>
              <img src={icGuide} alt='서비스 가이드' className='w-6' />
              서비스 가이드
            </button>
          </div>
          <div className='flex items-center justify-between mt-6'>
            <div className='sorting_wrap'>
              <dl>
                <dt>공고유형</dt>
                <dd className='tab_btns tab_style06'>
                  <ul>
                    <li className={(sortType === 'ALL') ? 'on' : ''}>
                      <button type='button' onClick={() => setSortType('ALL')}>전체</button>
                    </li>
                    <li className={(sortType === 'REGULAR') ? 'on' : ''}>
                      <button type='button' onClick={() => setSortType('REGULAR')}>정기</button>
                    </li>
                    <li className={(sortType === 'IRREGULAR') ? 'on' : ''}>
                      <button type='button' onClick={() => setSortType('IRREGULAR')}>수시</button>
                    </li>
                    <li className={(sortType === 'NONE') ? 'on' : ''}>
                      <button type='button' onClick={() => setSortType('NONE')}>해당없음</button>
                    </li>
                  </ul>
                </dd>
              </dl>
              <dl>
                <dt>공고상태</dt>
                <dd className='tab_btns tab_style06'>
                  <ul>
                    <li className={(sortStatus === 'ALL') ? 'on' : ''}>
                      <button type='button' onClick={() => setSortStatus('ALL')}>전체</button>
                    </li>
                    <li className={(sortStatus === 'PROGRESS') ? 'on' : ''}>
                      <button type='button' onClick={() => setSortStatus('PROGRESS')}>진행중</button>
                    </li>
                    <li className={(sortStatus === 'END') ? 'on' : ''}>
                      <button type='button' onClick={() => setSortStatus('END')}>마감</button>
                    </li>
                  </ul>
                </dd>
              </dl>
            </div>
            <Button className={`gap-2 h-12 px-4 rounded text-sm font-bold btn_style01${filterShow ? ' on' : ''}`} name='필터' icon={filterShow ? icFilter02 : icFilter} onClick={() => setFilterShow(state => !state)} />
          </div>
          {(filterShow)
            ? <div className='relative mt-6'>
              <div className='sorting_wrap'>
                <dl className='w-full'>
                  <dt>ICT 기술분류</dt>
                  <dd className='sorting_ict'>
                    <div>
                      <label htmlFor='sortBig' className='hidden_text'>대분류</label>
                      <select name='sortBig' id='sortBig' value={bigIctTmp} onChange={(e) => dispatch(setBigIctTmp(e.target.value))}>
                        <option value=''>대분류</option>
                        {bigIctList.map((e,i) => {
                          return <option key={i} value={e.code ?? ''}>{e.name ?? ''}</option>;
                        })}
                      </select>
                    </div>
                    <div>
                      <label htmlFor='sortMiddle' className='hidden_text'>중분류</label>
                      <select name='sortMiddle' id='sortMiddle' value={middleIctTmp} onChange={(e) => dispatch(setMiddleIctTmp(e.target.value))}>
                        <option value=''>중분류</option>
                        {middleIctList.map((e,i) => {
                          return <option key={i} value={e.code ?? ''}>{e.name ?? ''}</option>;
                        })}
                      </select>
                    </div>
                    <div>
                      <label htmlFor='sortSmall' className='hidden_text'>소분류</label>
                      <select name='sortSmall' id='sortSmall' value={smallIctTmp} onChange={(e) => dispatch(setSmallIctTmp(e.target.value))}>
                        <option value=''>소분류</option>
                        {smallIctList.map((e,i) => {
                          return <option key={i} value={e.code ?? ''}>{e.name ?? ''}</option>;
                        })}
                      </select>
                    </div>
                    <div>
                      <label htmlFor='sortDetail' className='hidden_text'>세분류</label>
                      <select name='sortDetail' id='sortDetail' value={detailIctTmp} onChange={(e) => dispatch(setDetailIctTmp(e.target.value))}>
                        <option value=''>세분류</option>
                        {detailIctList.map((e,i) => {
                          return <option key={i} value={e.code ?? ''}>{e.name ?? ''}</option>;
                        })}
                      </select>
                    </div>
                  </dd>
                </dl>
              </div>
              <button type='button' onClick={initFilterClick} className='sorting_reset_btn text-sm font-medium text-color-placeholder'>선택 초기화 <img src={icReset ?? icReset02} alt='선택 초기화' className='w-6' /></button>
              <Button name="필터 적용" onClick={handleFilterApply} icon={icSearch} className="gap-2 mt-6 mx-auto py-3 px-6.5 rounded-3xl text-base font-bold btn_style03" />
            </div>
            : ''
          }
        </div>
      </section>
      <div className='section mt-6'>
        <div className='container'>
          <div className='flex items-center justify-between'>
            <button type='button' className={`btn_check_text${checkAll ? ' check' : ''}`} onClick={onAllItemClick}>
              전체 선택
            </button>
            <div className='flex items-center gap-4'>
              <button type='button' className='discovery_reset_btn02' onClick={handleInitSelectedClick} disabled={btnDisabled ? true : false}>
                선택 초기화 <img src={btnDisabled ? icReset : icReset02} alt='선택 초기화' className='w-6' />
              </button>
              <Button name='선택보기' className={`h-12 px-4 rounded text-sm font-bold btn_style07${!btnDisabled ? ' on' : ''}`} onClick={() => (!btnDisabled) && navigate('/demandbanking/result')}></Button>
            </div>
          </div>
          <div className='mt-2'>
            <CheckListWrap data={data} onClick={handleItemClick} />
          </div>
          <div className='mt-10'>
            <Pagination total={totalCount} size={size} page={page} onClick={(page) => setPage(page)} />
          </div>
        </div>
      </div>
      {(popup) 
        ? <GuidePopup 
          popup={popup} 
          setPopup={setPopup} 
          title={'서비스 가이드'} 
          contents={<p>서비스 가이드 내용</p>} 
          focusClass={'guide_btn'}
        /> 
        : null}
    </Layout>
  );
}
