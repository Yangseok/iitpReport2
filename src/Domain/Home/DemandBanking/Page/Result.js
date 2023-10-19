import React, { useEffect, useState, useCallback } from 'react';
import arrDrop from 'Assets/Images/arr_drop.png';
import icArrow from 'Assets/Images/ic_arrow02.png';
import icFilter from 'Assets/Images/ic_filter.png';
import icFilter02 from 'Assets/Images/ic_filter02.png';
import icReset from 'Assets/Images/ic_reset.png';
import icReset02 from 'Assets/Images/ic_reset02.png';
import icSearch from 'Assets/Images/ic_search.png';
import Layout from 'Domain/Home/Common/Layout/Sub';
import Button from 'Domain/Home/Common/Componet/Button';
import Pagination from 'Domain/Home/Common/Componet/Pagination';
import CheckListWrap from 'Domain/Home/DemandBanking/Component/CheckListWrap';
import DemandListItem from 'Domain/Home/DemandBanking/Component/DemandListItem';
import DemandListItemDetail from 'Domain/Home/DemandBanking/Component/DemandListItemDetail';
import $ from 'jquery';

import { useSelector, useDispatch } from 'react-redux';
import { getSelectedList, getBigIctTmp, getMiddleIctTmp, getSmallIctTmp, getDetailIctTmp, getBigIctList, getMiddleIctList, getSmallIctList, getDetailIctList, setBigIctTmp, setMiddleIctTmp, setSmallIctTmp, setDetailIctTmp, setBigIctList, setMiddleIctList, setSmallIctList, setDetailIctList } from 'Domain/Home/DemandBanking/Status/DemandSlice';
import { setLoading } from 'Domain/Home/Common/Status/CommonSlice';
import * as demandCallAPI from 'Domain/Home/DemandBanking/API/Call';
import common from 'Utill';

export default function DemandResult() {
  const dispatch = useDispatch();

  const selectedList = useSelector(getSelectedList);

  const [data, setData] = useState([]);
  const [fold, setFold] = useState(false);
  const [filterShow, setFilterShow] = useState(false);
  const [demandActive, setDemandActive] = useState(null);

  const size = 10;
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [orgnName, setOrgnName] = useState('');
  const [applicant, setApplicant] = useState('');
  const [surveyTitle, setSurveyTitle] = useState('');

  const [startDateTmp, setStartDateTmp] = useState('');
  const [endDateTmp, setEndDateTmp] = useState('');
  const [orgnNameTmp, setOrgnNameTmp] = useState('');
  const [applicantTmp, setApplicantTmp] = useState('');
  const [surveyTitleTmp, setSurveyTitleTmp] = useState('');

  const bigIctTmp = useSelector(getBigIctTmp);
  const middleIctTmp = useSelector(getMiddleIctTmp);
  const smallIctTmp = useSelector(getSmallIctTmp);
  const detailIctTmp = useSelector(getDetailIctTmp);

  const bigIctList = useSelector(getBigIctList);
  const middleIctList = useSelector(getMiddleIctList);
  const smallIctList = useSelector(getSmallIctList);
  const detailIctList = useSelector(getDetailIctList);

  const [bigIct, setBigIct] = useState(bigIctTmp);
  const [middleIct, setMiddleIct] = useState(middleIctTmp);
  const [smallIct, setSmallIct] = useState(smallIctTmp);
  const [detailIct, setDetailIct] = useState(detailIctTmp);

  const [surveyList, setSurveyList] = useState([]);

  const subSize = 10;
  const [subPage, setSubPage] = useState(1);
  const [subTab, setSubTab] = useState('ALL');
  const [subTotalCount, setSubTotalCount] = useState(0);
  const [similarNoticeId, setSimilarNoticeId] = useState('');
  const [similarSurveyId, setSimilarSurveyId] = useState('');

  const [subData, setSubData] = useState([]);

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

  const initFilterClick = () => {
    initFilterData('BCLS');
    setPage(1);
    setBigIct('');
    setMiddleIct('');
    setSmallIct('');
    setDetailIct('');
    setStartDateTmp('');
    setEndDateTmp('');
    setOrgnNameTmp('');
    setApplicantTmp('');
    setSurveyTitleTmp('');
    setTimeout(() => {
      $('.filterApplyBtn').trigger('click');
    }, 300);
  };

  const handleFilterApply = (e) => {
    setPage(1);
    setBigIct(bigIctTmp);
    setMiddleIct(middleIctTmp);
    setSmallIct(smallIctTmp);
    setDetailIct(detailIctTmp);
    setStartDate(startDateTmp);
    setEndDate(endDateTmp);
    setOrgnName(orgnNameTmp);
    setApplicant(applicantTmp);
    setSurveyTitle(surveyTitleTmp);
    e?.preventDefault();
  };

  const listDownload = async (e) => {
    const noticeId = getNoticeId();
    try {
      dispatch(setLoading(true));
      const data = await demandCallAPI.surveyListDownload(noticeId);
      common.blobDownload(data.data, 'download.xlsx');
    } catch (e) {
      console.warn(e);
    } finally {
      dispatch(setLoading(false));
    }
    e?.preventDefault();
  };
  
  // 유사 기술 조사서 버튼 클릭
  const onItemSlide = (e, noticeId, surveyId) => {
    setSubPage(1);
    setSubTab('ALL');
    setSimilarNoticeId(noticeId);
    setSimilarSurveyId(surveyId);
    setDemandActive(surveyId);

    const liEl = $('.demand_'+surveyId);
    const contsEl = liEl.find('.conts_box');
    if(liEl.hasClass('on')) {
      liEl.removeClass('on');
      contsEl.css({ 'height': 0, 'paddingTop': 0, 'paddingBottom': 0 });
      setDemandActive(null);
      setSimilarSurveyId('');
    }
  };

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

  const getNoticeId = useCallback(() => {
    const selectedIds = selectedList.map(s => s.id);
    let noticeId = '';
    if (selectedIds.length > 0) noticeId = selectedIds?.join('|');
    return noticeId;
  }, [selectedList]);

  const getSurveyList = useCallback(async () => {
    const noticeId = getNoticeId();
    let data = [];
    try {
      dispatch(setLoading(true));
      data = await demandCallAPI.surveyList(noticeId,startDate,endDate,bigIct,middleIct,smallIct,detailIct,orgnName,applicant,surveyTitle,size,page);
    } catch (e) {
      console.warn(e);
    } finally {
      dispatch(setLoading(false));
    }
    console.log('getSurveyList:', data?.data?.result);

    let tmpData = [];
    for (let i in data?.data?.result?.dataList ?? []) {
      if (data?.data?.result?.dataList?.[i]?.surveyId === undefined) continue;
      let pushData = {
        key: i,
        noticeId: data?.data?.result?.dataList?.[i]?.noticeId ?? '',
        id: data?.data?.result?.dataList?.[i]?.surveyId,
        pblanc: (data?.data?.result?.dataList?.[i]?.noticeTitle ?? '') + ' (' + (data?.data?.result?.dataList?.[i]?.period ?? '') + ')',
        title: data?.data?.result?.dataList?.[i]?.surveyTitle ?? '',
        agency: data?.data?.result?.dataList?.[i]?.orgnName ?? '',
        name: data?.data?.result?.dataList?.[i]?.applicant ?? '',
        registration: data?.data?.result?.dataList?.[i]?.registrationIctCode ?? '',
        recommend: data?.data?.result?.dataList?.[i]?.recommendIctCode ?? '',
        mergeFlag: data?.data?.result?.dataList?.[i]?.mergeFlag ?? 'N',
        mergeLeaderFlag: data?.data?.result?.dataList?.[i]?.mergeLeaderFlag ?? 'N',
        mergeId: data?.data?.result?.dataList?.[i]?.mergeId ?? '',
      };
      tmpData.push(pushData);
    }
    setSurveyList(tmpData);
    setTotalCount(data?.data?.result?.totalCount ?? 0);
  }, [selectedList, startDate, endDate, bigIct, middleIct, smallIct, detailIct, orgnName, applicant, surveyTitle, size, page]);

  useEffect(() => {
    setData(selectedList);
  }, [selectedList]);

  useEffect(() => {
    getSurveyList();
  }, [selectedList, startDate, endDate, bigIct, middleIct, smallIct, detailIct, orgnName, applicant, surveyTitle, size, page]);

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

  const getSimilarSurvey = useCallback(async () => {
    let data = [];
    try {
      dispatch(setLoading(true));
      data = await demandCallAPI.similarSurvey(subTab,similarNoticeId,similarSurveyId,subSize,subPage);
    } catch (e) {
      console.warn(e);
    } finally {
      dispatch(setLoading(false));
    }

    let tmpData = [];
    for (let i in data?.data?.result ?? []) {
      if (data?.data?.result?.[i]?.surveyId === undefined) continue;
      console.log(data?.data?.result?.[i]?.surveyTitle);
      let pushData = {
        key: subTab + (subSize * subPage) + i,
        noticeId: data?.data?.result?.[i]?.noticeId ?? '',
        id: data?.data?.result?.[i]?.surveyId,
        pblanc: (data?.data?.result?.[i]?.noticeTitle ?? '') + ' (' + (data?.data?.result?.[i]?.period ?? '') + ')',
        title: data?.data?.result?.[i]?.surveyTitle ?? '',
        agency: data?.data?.result?.[i]?.orgnName ?? '',
        name: data?.data?.result?.[i]?.applicant ?? '',
        registration: data?.data?.result?.[i]?.registrationIctCode ?? '',
        recommend: data?.data?.result?.dataList?.[i]?.recommendIctCode ?? '',
        percent: ((data?.data?.result?.[i]?.weight ?? 0) * 100).toFixed(1),
      };
      tmpData.push(pushData);
    }

    setSubTotalCount((tmpData.length > 0) ? (subPage * subSize + 1) : 0);
    if (subPage === 1) {
      setSubData(tmpData);
    } else {
      setSubData([...subData, ...tmpData]);
    }


    const pd = 24;
    const liEl = $('.demand_'+similarSurveyId);
    const contsEl = liEl.find('.conts_box');
    contsEl.css({ 'height': 0, 'paddingTop': 0, 'paddingBottom': 0 });

    setTimeout(() => {
      liEl.siblings().removeClass('on');
      liEl.siblings().find('.conts_box').css({ 'height': 0, 'paddingTop': 0, 'paddingBottom': 0 });

      if(liEl.hasClass('on')) {
        console.log(1);
        liEl.addClass('on');
        contsEl.css({ 
          'height': `${contsEl.prop('scrollHeight') + pd * 2}px`, 
          'paddingTop': `${pd}px`, 
          'paddingBottom': `${pd}px` 
        });
      }
    }, 100);
  }, [similarNoticeId, similarSurveyId, subPage, subSize, subTab]);

  useEffect(() => {
    setSubPage(1);
  }, [subTab]);

  useEffect(() => {
    if (similarSurveyId) getSimilarSurvey();
  }, [similarNoticeId, similarSurveyId, subPage, subSize, subTab]);

  return (
    <Layout>
      <section>
        <div className='container'>
          <div className='flex items-center justify-between'>
            <h2 className='test-base font-bold text-color-dark'>선택한 공고</h2>
            <button type='button' className={`btn_fold${(fold) ? ' fold' : ''}`} onClick={() => setFold(state => !state)}>
              {(fold) ? '펼치기' : '접기'} 
              <img src={arrDrop} alt='화살표' className='w-6' />
            </button>
          </div>
          {(!fold)
            && <div className='mt-4'>
              <CheckListWrap data={data} />
            </div>
          }
        </div>
      </section>
      <section className='mt-10'>
        <div className='container'>
          <div className='flex items-center justify-between'>
            <h3 className='text-base font-bold text-color-dark'>
              기술수요조사서 <span className='text-color-main'>{common.setPriceInput(totalCount)}건</span>
            </h3>
            <div className='flex gap-4'>
              <Button className='gap-2 h-12 px-4 rounded text-sm font-bold btn_style04 mr-2' name='목록 다운로드' icon={icArrow} onClick={listDownload} />
              <Button className={`gap-2 h-12 px-4 rounded text-sm font-bold btn_style01${filterShow ? ' on' : ''}`} name='필터' icon={filterShow ? icFilter02 : icFilter} onClick={() => setFilterShow(state => !state)} />
            </div>
          </div>

          {(filterShow) 
            ? <div className='relative mt-2 mb-10'>
              <div className='sorting_wrap'>
                <dl>
                  <dt>접수기간</dt>
                  <dd>
                    <label htmlFor='startDateTmp' className='hidden_text'>접수기간 범위 - 시작 연도</label>
                    <input type='date' name='startDateTmp' id='startDateTmp' value={startDateTmp} onChange={(e) => setStartDateTmp(e.target.value)} />
                    <span className='text-base font-medium text-color-dark mx-3'> - </span>
                    <label htmlFor='endDateTmp' className='hidden_text'>접수기간 범위 - 끝 연도</label>
                    <input type='date' name='endDateTmp' id='endDateTmp' value={endDateTmp} onChange={(e) => setEndDateTmp(e.target.value)} />
                  </dd>
                </dl>
                <dl className='w-full'>
                  <dt>ICT 기술분류</dt>
                  <dd className='sorting_ict'>
                    <div>
                      <label htmlFor='sortBig' className='hidden_text'>대분류</label>
                      <select name='sortBig' id='sortBig' value={bigIctTmp} onChange={(e) => dispatch(setBigIctTmp(e.target.value))}>
                        <option value=''>대분류</option>
                        {bigIctList.map((e,i) => {
                          return <option key={e.code ?? i} value={e.code ?? ''}>{e.name ?? ''}</option>;
                        })}
                      </select>
                    </div>
                    <div>
                      <label htmlFor='sortMiddle' className='hidden_text'>중분류</label>
                      <select name='sortMiddle' id='sortMiddle' value={middleIctTmp} onChange={(e) => dispatch(setMiddleIctTmp(e.target.value))}>
                        <option value=''>중분류</option>
                        {middleIctList.map((e,i) => {
                          return <option key={e.code ?? i} value={e.code ?? ''}>{e.name ?? ''}</option>;
                        })}
                      </select>
                    </div>
                    <div>
                      <label htmlFor='sortSmall' className='hidden_text'>소분류</label>
                      <select name='sortSmall' id='sortSmall' value={smallIctTmp} onChange={(e) => dispatch(setSmallIctTmp(e.target.value))}>
                        <option value=''>소분류</option>
                        {smallIctList.map((e,i) => {
                          return <option key={e.code ?? i} value={e.code ?? ''}>{e.name ?? ''}</option>;
                        })}
                      </select>
                    </div>
                    <div>
                      <label htmlFor='sortDetail' className='hidden_text'>세분류</label>
                      <select name='sortDetail' id='sortDetail' value={detailIctTmp} onChange={(e) => dispatch(setDetailIctTmp(e.target.value))}>
                        <option value=''>세분류</option>
                        {detailIctList.map((e,i) => {
                          return <option key={e.code ?? i} value={e.code ?? ''}>{e.name ?? ''}</option>;
                        })}
                      </select>
                    </div>
                  </dd>
                </dl>
                <dl>
                  <dt><label htmlFor='orgnNameTmp'>접수기관명</label></dt>
                  <dd>
                    <input type='text' name='orgnNameTmp' id='orgnNameTmp' onChange={(e) => setOrgnNameTmp(e.target.value)} value={orgnNameTmp} />
                  </dd>
                </dl>
                <dl>
                  <dt><label htmlFor='applicantTmp'>신청인</label></dt>
                  <dd>
                    <input type='text' name='applicantTmp' id='applicantTmp' onChange={(e) => setApplicantTmp(e.target.value)} value={applicantTmp} />
                  </dd>
                </dl>
                <dl className='flex-1'>
                  <dt><label htmlFor='surveyTitleTmp'>기술수요조사명</label></dt>
                  <dd className='flex-1'>
                    <input type='text' name='surveyTitleTmp' id='surveyTitleTmp' onChange={(e) => setSurveyTitleTmp(e.target.value)} value={surveyTitleTmp} className='w-full' />
                  </dd>
                </dl>
              </div>
              <button type='button' onClick={initFilterClick} className='sorting_reset_btn text-sm font-medium text-color-placeholder'>선택 초기화 <img src={icReset ?? icReset02} alt='선택 초기화' className='w-6' /></button>
              <Button name="필터 적용" onClick={handleFilterApply} icon={icSearch} className="gap-2 mt-6 mx-auto py-3 px-6.5 rounded-3xl text-base font-bold btn_style03 filterApplyBtn" />
            </div>
            : ''
          }

          <div className='list_style01 toggle_type mt-2'>
            <ul>
              {(surveyList?.length > 0)
                ? surveyList?.map(e => {
                  return <DemandListItem 
                    key={e.id}
                    className={(e.id === demandActive) ? 'on demand_' + e.id : 'demand_' + e.id}
                    title={e.title}
                    contents={<div className='text_style01'>
                      <p className='text-sm text-color-regular'>기관명: <span className='font-medium text-color-main'>{e.agency}</span></p>
                      <p className='text-sm text-color-regular'>신청인: <span className='font-medium text-color-main'>{e.name}</span></p>
                      <p className='text-sm text-color-regular'>등록 ICT 분류: <span className='font-medium text-color-main'>{e.registration}</span></p>
                      <p className='text-sm text-color-regular'>추천 ICT 분류: <span className='font-medium text-color-main'>{e.recommend}</span></p>
                    </div>}
                    desc={<p className='text-sm font-medium text-color-regular mb-2'>{e.pblanc}</p>}
                    btns={<div className='flex items-start gap-4'>
                      {/* 파일이 존재하면 파일 분석 버튼 생성 */}
                      <a href={`/demandbanking/file/${e.noticeId}/${e.id}/result/projectout`} className='h-5 px-1.5 rounded-sm text-xs font-medium btn_style05' target="_blank" rel='noreferrer' title={`새창이동, ${e.title} 파일분석 페이지`}>파일 분석</a>
                      <div className='flex flex-col gap-2.5'>
                        <a href={`/demandbanking/view/${e.noticeId}/${e.id}`} className='h-5 px-1.5 rounded-sm text-xs font-medium text-color-white bg-color-light1' target="_blank" rel='noreferrer' title={`새창이동, ${e.title} 상세 페이지`}>자세히 보기↗</a>
                        {(e.mergeFlag === 'Y' || e.mergeLeaderFlag === 'Y') ? <a href={`/demandbanking/merge/${e.mergeId}`} className='h-5 px-1.5 rounded-sm text-xs font-medium btn_style05' target="_blank" rel='noreferrer' title={`새창이동, ${e.title} 병합수요 페이지`}>병합수요{(e.mergeLeaderFlag === 'Y') ? '(대표)' : ''}↗</a> : null}
                        <button type='button' className={`h-5 px-1.5 rounded-sm text-xs font-medium btn_style05${(e.id === demandActive) ? ' on' : ''}`} onClick={(event) => onItemSlide(event, e.noticeId, e.id)}>유사기술조사서</button>
                      </div>
                    </div>}
                  >
                    <DemandListItemDetail data={subData} setSubPage={setSubPage} subPage={subPage} subTotalCount={subTotalCount} subTab={subTab} setSubTab={setSubTab} subSize={subSize} />
                  </DemandListItem>;
                })
                : <li className='nodata'>
                  <p className='text-base text-color-placeholder'>데이터가 없습니다.</p>
                </li>
              }

            </ul>
          </div>
          <div className='mt-10'>
            <Pagination total={totalCount} size={size} page={page} onClick={(page) => setPage(page)} />
          </div>
        </div>
      </section>
    </Layout>
  );
}