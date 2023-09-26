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

  const tempData3 = [
    {
      id: 0,
      pblanc: '정보통신방송 연구개발사업 기술수요조사서 (2023.01.05 ~ 2023.03.30)',
      title: '초실감 콘텐츠 제작용 버츄얼 스튜디오 기술 개발',
      agency: '한국표준과학연구원',
      name: '홍길동',
      registration: '증강/혼합현실(AR/MR)',
      recommend: '증강/혼합현실(AR/MR)',
    },
    {
      id: 1,
      pblanc: '정보통신방송 연구개발사업 기술수요조사서 (2023.01.05 ~ 2023.03.30)',
      title: '초실감 콘텐츠 제작용 버츄얼 스튜디오 기술 개발',
      agency: '한국표준과학연구원',
      name: '홍길동',
      registration: '증강/혼합현실(AR/MR)',
      recommend: '증강/혼합현실(AR/MR)',
    },
    {
      id: 2,
      pblanc: '정보통신방송 연구개발사업 기술수요조사서 (2023.01.05 ~ 2023.03.30)',
      title: '초실감 콘텐츠 제작용 버츄얼 스튜디오 기술 개발',
      agency: '한국표준과학연구원',
      name: '홍길동',
      registration: '증강/혼합현실(AR/MR)',
      recommend: '증강/혼합현실(AR/MR)',
    },
  ];

  const selectedList = useSelector(getSelectedList);

  const [data, setData] = useState([]);
  const [fold, setFold] = useState(false);
  const [filterShow, setFilterShow] = useState(false);
  const [demandActive, setDemandActive] = useState(null);

  const [page, setPage] = useState(1);
  const [size] = useState(10);
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

  const [surveyList, setSurveyList] = useState([]);

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
    setStartDate('');
    setEndDate('');
    setOrgnName('');
    setApplicant('');
    setSurveyTitle('');
    setBigIct('');
    setMiddleIct('');
    setSmallIct('');
    setDetailIct('');
    setPage(1);
  };

  const handleFilterApply = (e) => {
    setBigIct(bigIctTmp);
    setMiddleIct(middleIctTmp);
    setSmallIct(smallIctTmp);
    setDetailIct(detailIctTmp);
    setPage(1);
    setStartDate(startDateTmp);
    setEndDate(endDateTmp);
    setOrgnName(orgnNameTmp);
    setApplicant(applicantTmp);
    setSurveyTitle(surveyTitleTmp);
    e?.preventDefault();
  };
  
  const handleItemClick = (id) => {
    const newData = data?.map(e => {
      if(e.id === id) {
        return {...e, active: !e.active};
      }
      return e;
    });
    setData(newData);
  };

  // 유사 기술 조사서 버튼 클릭
  const onItemSlide = (e, id) => {
    const pd = 24;
    const liEl = $(e.currentTarget).parents('li');
    const contsEl = liEl.find('.conts_box');

    setDemandActive(id);
    liEl.siblings().removeClass('on');
    liEl.siblings().find('.conts_box').css({ 'height': 0, 'paddingTop': 0, 'paddingBottom': 0 });

    if(!liEl.hasClass('on')) {
      liEl.addClass('on');
      contsEl.css({ 
        'height': `${contsEl.prop('scrollHeight') + pd * 2}px`, 
        'paddingTop': `${pd}px`, 
        'paddingBottom': `${pd}px` 
      });
    } else {
      liEl.removeClass('on');
      contsEl.css({ 'height': 0, 'paddingTop': 0, 'paddingBottom': 0 });
      setDemandActive(null);
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
        id: data?.data?.result?.dataList?.[i]?.surveyId,
        pblanc: (data?.data?.result?.dataList?.[i]?.noticeTitle ?? '') + ' (' + (data?.data?.result?.dataList?.[i]?.period ?? '') + ')',
        title: data?.data?.result?.dataList?.[i]?.surveyTitle ?? '',
        agency: data?.data?.result?.dataList?.[i]?.orgnName ?? '',
        name: data?.data?.result?.dataList?.[i]?.applicant ?? '',
        registration: data?.data?.result?.dataList?.[i]?.registrationIctCode ?? '',
        recommend: data?.data?.result?.dataList?.[i]?.recommendIctCode ?? '',
      };
      tmpData.push(pushData);
    }
    // console.log('tmpData:', tmpData);
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

  useEffect(() => {
    handleFilterApply();
  }, []);

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
              <CheckListWrap data={data} onClick={handleItemClick} />
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
              <Button className='gap-2 h-12 px-4 rounded text-sm font-bold btn_style04 mr-2' name='목록 다운로드' icon={icArrow} onClick={() => {}} />
              <Button className={`gap-2 h-12 px-4 rounded text-sm font-bold btn_style01${filterShow ? ' on' : ''}`} name='필터' icon={filterShow ? icFilter02 : icFilter} onClick={() => setFilterShow(state => !state)} />
            </div>
          </div>

          {(filterShow) 
            ? <div className='relative mt-2 mb-10'>
              <div className='sorting_wrap'>
                <dl>
                  <dt>접수기간</dt>
                  <dd>
                    <input type='date' name='startDateTmp' value={startDateTmp} onChange={(e) => setStartDateTmp(e.target.value)} />
                    <span className='text-base font-medium text-color-dark mx-3'> - </span>
                    <input type='date' name='endDateTmp' value={endDateTmp} onChange={(e) => setEndDateTmp(e.target.value)} />
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
                <dl>
                  <dt>접수기관명</dt>
                  <dd>
                    <input type='text' name='orgnNameTmp' onChange={(e) => setOrgnNameTmp(e.target.value)} value={orgnNameTmp} />
                  </dd>
                </dl>
                <dl>
                  <dt>신청인</dt>
                  <dd>
                    <input type='text' name='applicantTmp' onChange={(e) => setApplicantTmp(e.target.value)} value={applicantTmp} />
                  </dd>
                </dl>
                <dl className='flex-1'>
                  <dt>기술수요조사명</dt>
                  <dd className='flex-1'>
                    <input type='text' name='surveyTitleTmp' onChange={(e) => setSurveyTitleTmp(e.target.value)} value={surveyTitleTmp} className='w-full' />
                  </dd>
                </dl>
              </div>
              <button type='button' onClick={initFilterClick} className='sorting_reset_btn text-sm font-medium text-color-placeholder'>선택 초기화 <img src={icReset ?? icReset02} alt='선택 초기화' className='w-6' /></button>
              <Button name="필터 적용" onClick={handleFilterApply} icon={icSearch} className="gap-2 mt-6 mx-auto py-3 px-6.5 rounded-3xl text-base font-bold btn_style03" />
            </div>
            : ''
          }

          <div className='list_style01 toggle_type mt-2'>
            <ul>
              {(surveyList?.length > 0)
                ? surveyList?.map(e => {
                  return <DemandListItem 
                    key={e.id}
                    className={(e.id === demandActive) ? 'on' : ''}
                    title={e.title}
                    contents={<>
                      <div className='text_style01'>
                        <p className='text-sm text-color-regular'>기관명: <span className='font-medium text-color-main'>{e.agency}</span></p>
                        <p className='text-sm text-color-regular'>신청인: <span className='font-medium text-color-main'>{e.name}</span></p>
                        <p className='text-sm text-color-regular'>등록 ICT 분류: <span className='font-medium text-color-main'>{e.registration}</span></p>
                        <p className='text-sm text-color-regular'>추천 ICT 분류: <span className='font-medium text-color-main'>{e.recommend}</span></p>
                      </div>
                    </>}
                    desc={<>
                      <p className='text-sm font-medium text-color-regular mb-2'>{e.pblanc}</p>
                    </>}
                    btns={<>
                      <div className='flex items-start gap-4'>
                        {/* 파일이 존재하면 파일 분석 버튼 생성 */}
                        <a href={'/demandbanking/file/result/projectout'} className='h-5 px-1.5 rounded-sm text-xs font-medium btn_style05' target="_blank" rel='noreferrer' title={`새창이동, ${e.title} 파일분석 페이지`}>파일 분석</a>
                        <div className='flex flex-col gap-2.5'>
                          <a href={`/demandbanking/view/${e.id}`} className='h-5 px-1.5 rounded-sm text-xs font-medium text-color-white bg-color-light1' target="_blank" rel='noreferrer' title={`새창이동, ${e.title} 상세 페이지`}>자세히 보기↗</a>
                          <a href={`/demandbanking/merge/${e.id}`} className='h-5 px-1.5 rounded-sm text-xs font-medium btn_style05' target="_blank" rel='noreferrer' title={`새창이동, ${e.title} 병합수요 페이지`}>병합수요↗</a>
                          <button type='button' className={`h-5 px-1.5 rounded-sm text-xs font-medium btn_style05${(e.id === demandActive) ? ' on' : ''}`} onClick={(event) => onItemSlide(event, e.id)}>유사기술조사서</button>
                        </div>
                      </div>
                    </>}
                  >
                    <DemandListItemDetail data={tempData3} />
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