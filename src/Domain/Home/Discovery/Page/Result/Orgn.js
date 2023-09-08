import React, { useEffect, useState, useCallback } from 'react';
import icArrow from 'Assets/Images/ic_arrow02.png';
import icFilter from 'Assets/Images/ic_filter.png';
import icFilter02 from 'Assets/Images/ic_filter02.png';
import imgBuilding01 from 'Assets/Images/building_img01.png';
import imgBuilding02 from 'Assets/Images/building_img02.png';
import imgBuilding03 from 'Assets/Images/building_img03.png';
import imgBuilding04 from 'Assets/Images/building_img04.png';
import imgBuilding05 from 'Assets/Images/building_img05.png';
import imgBuilding06 from 'Assets/Images/building_img06.png';
import imgBuilding07 from 'Assets/Images/building_img07.png';
import imgBuilding08 from 'Assets/Images/building_img08.png';
import imgBuilding09 from 'Assets/Images/building_img09.png';
import DiscoveryResultLayout from 'Domain/Home/Discovery/Layout/DiscoveryResultLayout';
import Button from 'Domain/Home/Common/Componet/Button';
import Pagination from 'Domain/Home/Common/Componet/Pagination';
import ListItem from 'Domain/Home/Common/Componet/ListItem';
import common from 'Utill';
import { useSelector, useDispatch } from 'react-redux';
import { getSearchKeyword, getSelectKeyword, getFilterActive, setLoading, getSearchDetailData } from 'Domain/Home/Common/Status/CommonSlice';
import * as discoveryAPI from 'Domain/Home/Discovery/API/Call';
import * as orgnAPI from 'Domain/Home/Discovery/API/OrgnCall';
import Filter from 'Domain/Home/Discovery/Component/Filter';
import parse from 'html-react-parser';
import { NavLink } from 'react-router-dom';

export default function DiscoveryResult() {
  const dispatch = useDispatch();
  const se = common.getSegment();
  const se1 = se[1] ?? '';
  const se2 = se[2] ?? '';
  const selectKeyword = useSelector(getSelectKeyword);
  const keyword = useSelector(getSearchKeyword);
  const [tabCount, setTabCount] = useState({});
  const [totalCount, setTotalCount] = useState(0);
  const [projectData, setProjectData] = useState([]);
  const [orgnActive, setOrgnActive] = useState({id: -1, name: ''});
  const [simialityOrgn, setSimialityOrgn] = useState([]);
  const [subProjectList, setSubProjectList] = useState([]);
  const [subPatentList, setSubPatentList] = useState([]);
  const [subListMode, setSubListMode] = useState('project');

  const [searchButtonClick, setSearchButtonClick] = useState(false);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [sort, setSort] = useState('score');
  const [filterShow, setFilterShow] = useState(false);
  const [filterItem, setFileterItem] = useState({});

  const filterActive = useSelector(getFilterActive);
  const filterKey = 'search/orgn';

  const globalSearchDetailData = useSelector(getSearchDetailData);
  const searchDetailKey = 6;

  const getList = useCallback(async () => {
    await (async () => {
      let similarity = [];
      let filterObj = {
        orgnType: (filterActive[filterKey]?.selected?.orgnType ?? []).join('|'),
        industry: (filterActive[filterKey]?.selected?.industry ?? []).join('|'),
        address: (filterActive[filterKey]?.selected?.address ?? []).join('|'),
      };
      // console.log('filterObj:', filterObj);
      let searchParam = {};
      let etcParam = { aggs: true };
      let data = [];

      try {
        dispatch(setLoading(true));
        if (se1 == 'search') {
          searchParam = globalSearchDetailData[searchDetailKey];
          data = await orgnAPI.orgn('search',size,page,keyword,similarity,sort,filterObj,searchParam,etcParam);
        } else if (se1 == 'discovery') {
          if (se2 == 'keyword') {
            similarity = common.procSimilarity(selectKeyword);
            data = await orgnAPI.orgn('discovery',size,page,keyword,similarity,sort,filterObj,searchParam,etcParam);
          } else if (se2 == 'file') {
            data = await orgnAPI.orgn('discovery',size,page,keyword,similarity,sort,filterObj,searchParam,etcParam);
          } else if (se2 == 'project') {
            data = await orgnAPI.orgn('discovery',size,page,keyword,similarity,sort,filterObj,searchParam,etcParam);
          }
        }
      } catch (e) {
        console.warn(e);
      } finally {
        dispatch(setLoading(false));  
      }
    
      console.log(data?.data?.result);
      setTotalCount(data?.data?.result?.totalCount ?? 0);
      let procData = [];
      for (let i in data?.data?.result?.dataList ?? []) {
        // console.log(i, data?.data?.result?.dataList?.[i]);
        const pushData = {
          id: data?.data?.result?.dataList?.[i]?.id ?? i,
          name: parse(data?.data?.result?.dataList?.[i]?.orgnName ?? ''),
          assign: data?.data?.result?.dataList?.[i]?.projectCount ?? 0,
          patent: data?.data?.result?.dataList?.[i]?.patentCount ?? 0,
          institue: data?.data?.result?.dataList?.[i]?.researchInstitute ?? '',
          safety: [2,0,1][i%3],
          sales: data?.data?.result?.dataList?.[i]?.topRankSales ?? '',
          followup: data?.data?.result?.dataList?.[i]?.orgnVigilance ?? false,
        };
        procData.push(pushData);
      }
  
      setFileterItem(data?.data?.result?.aggsInfo ?? {});
      setProjectData(procData);
      setSearchButtonClick(false);
      setOrgnActive({ id: data?.data?.result?.dataList?.[0]?.id ?? -1, name: common.deHighlight(data?.data?.result?.dataList?.[0]?.orgnName ?? '') });
    })();
  }, [keyword, searchButtonClick, page, size, sort, se1, se2, filterActive, globalSearchDetailData]);

  const downExcel = useCallback(async () => {
    const excelSize = 1000;
    await (async () => {
      let similarity = [];
      let filterObj = {
        orgnType: (filterActive[filterKey]?.selected?.orgnType ?? []).join('|'),
        industry: (filterActive[filterKey]?.selected?.industry ?? []).join('|'),
        address: (filterActive[filterKey]?.selected?.address ?? []).join('|'),
      };
      let searchParam = {};
      let data = [];
      
      try {
        dispatch(setLoading(true));
        if (se1 == 'search') {
          searchParam = globalSearchDetailData[searchDetailKey];
          data = await orgnAPI.orgn('search',excelSize,1,keyword,similarity,sort,filterObj,searchParam);
        } else if (se1 == 'discovery') {
          if (se2 == 'keyword') {
            similarity = common.procSimilarity(selectKeyword);
            data = await orgnAPI.orgn('discovery',excelSize,1,keyword,similarity,sort,filterObj,searchParam);
          } else if (se2 == 'file') {
            data = await orgnAPI.orgn('discovery',excelSize,1,keyword,similarity,sort,filterObj,searchParam);
          } else if (se2 == 'project') {
            data = await orgnAPI.orgn('discovery',excelSize,1,keyword,similarity,sort,filterObj,searchParam);
          }
        }
      } catch (e) {
        console.warn(e);
      } finally {
        dispatch(setLoading(false));  
      }

      console.log(data?.data?.result);
      let procData = [];
      for (let i in data?.data?.result?.dataList ?? []) {
        // console.log(i, data?.data?.result?.dataList?.[i]);
        const pushData = [
          common.deHighlight(data?.data?.result?.dataList?.[i]?.orgnName ?? ''),
          data?.data?.result?.dataList?.[i]?.projectCount ?? 0,
          data?.data?.result?.dataList?.[i]?.patentCount ?? 0,
          (data?.data?.result?.dataList?.[i]?.orgnVigilance ?? false) ? 'O': 'X',
          data?.data?.result?.dataList?.[i]?.topRankSales ?? '',
        ];
        procData.push(pushData);
      }
      await common.excelExport('down', ['기관명', '과제갯수', '특허갯수', '사후관리대상기업', '매출상위(%)'], procData);
    })();
  }, [keyword, sort, se1, se2, filterActive, globalSearchDetailData]);

  const getDetail = useCallback(async () => {
    if (orgnActive.id === -1) return null;
    await (async () => {
      let data = [];

      try {
        dispatch(setLoading(true));
        if (se1 == 'search') {
          data = await orgnAPI.orgnDetail(orgnActive.id);
        } else if (se1 == 'discovery') {
          if (se2 == 'keyword') {
            data = await orgnAPI.orgnDetail(orgnActive.id);
          } else if (se2 == 'file') {
            data = await orgnAPI.orgnDetail(orgnActive.id);
          } else if (se2 == 'project') {
            data = await orgnAPI.orgnDetail(orgnActive.id);
          }
        }
      } catch (e) {
        console.warn(e);
      } finally {
        dispatch(setLoading(false));  
      }
    
      // const data = await orgnAPI.orgnDetail('0008634982');
      console.log(data?.data?.result);
      let simialityOrgn = [];
      for (let i in data?.data?.result?.simialityOrgnList ?? []) {
        // console.log(i, data?.data?.result?.dataList?.[i]);
        const simialityPushData = {
          id: i,
          name: data?.data?.result?.simialityOrgnList?.[i]?.orgnName ?? '',
          relation: common.colorSet(data?.data?.result?.simialityOrgnList?.[i]?.weight ?? 0)
        };
        simialityOrgn.push(simialityPushData);
      }
      setSimialityOrgn(simialityOrgn);

      let subProjectList = [];
      for (let i in data?.data?.result?.orgnResultInfo?.projectOut ?? []) {
        // console.log(i, data?.data?.result?.orgnResultInfo?.projectOut?.[i]);
        const period = data?.data?.result?.orgnResultInfo?.projectOut?.[i]?.period ?? '';
        const periodArr = period.split('~');
        let division = data?.data?.result?.orgnResultInfo?.projectOut?.[i]?.technicalClassification ?? [];
        if (division == '') division = [];
        let keywordt = data?.data?.result?.orgnResultInfo?.projectOut?.[i]?.keywords ?? [];
        if (keywordt == '') keywordt = [];
        const subProjectListPushData = {
          id: data?.data?.result?.orgnResultInfo?.projectOut?.[i]?.projectNumber ?? i,
          tag : ((periodArr?.[1]??'').replaceAll(' ','') === '9999-12-31') ? 1 : 2,
          title: data?.data?.result?.orgnResultInfo?.projectOut?.[i]?.bigProjectName ?? '',
          price: (data?.data?.result?.orgnResultInfo?.projectOut?.[i]?.fund ?? '') + '억',
          period: period.replaceAll('-','.'), 
          agency: data?.data?.result?.orgnResultInfo?.projectOut?.[i]?.researchAgencyName ?? '',
          name: data?.data?.result?.orgnResultInfo?.projectOut?.[i]?.researchManagerName ?? '',
          department: data?.data?.result?.orgnResultInfo?.projectOut?.[i]?.orderAgencyName ?? '',
          performance: data?.data?.result?.orgnResultInfo?.projectOut?.[i]?.performance ?? '',
          division: division.join(' / '),
          keyword: keywordt.join(', '),
        };
        subProjectList.push(subProjectListPushData);
      }
      setSubProjectList(subProjectList);

      let subPatentList = [];
      for (let i in data?.data?.result?.orgnResultInfo?.patent ?? []) {
        const agency = data?.data?.result?.orgnResultInfo?.patent?.[i]?.applicantName ?? [];
        const name = data?.data?.result?.orgnResultInfo?.patent?.[i]?.inventorName ?? [];
        const date = data?.data?.result?.orgnResultInfo?.patent?.[i]?.applDate ?? '';
        const subPatentListPushData = {
          id: data?.data?.result?.orgnResultInfo?.patent?.[i]?.applNumber ?? i,
          title: data?.data?.result?.orgnResultInfo?.patent?.[i]?.applName ?? '',
          project: data?.data?.result?.orgnResultInfo?.patent?.[i]?.applName ?? '',
          division: data?.data?.result?.orgnResultInfo?.patent?.[i]?.registrationType ?? '',
          num: data?.data?.result?.orgnResultInfo?.patent?.[i]?.applNumber ?? '',
          date: date.replace(/^(\d{4})(\d{2})(\d{2})$/, '$1.$2.$3'),
          agency: agency.join(', '),
          name: name.join(', '),
        };
        subPatentList.push(subPatentListPushData);
      }
      setSubPatentList(subPatentList);

      setSubListMode('project');
    })();
  }, [orgnActive, se1, se2]);

  // 기관 선택 시
  const onOrgnSelect = (e, id, name) => {
    if(e.currentTarget.nodeName !== 'BUTTON') {
      setOrgnActive({ id, name });
    }
  };

  useEffect(() => {
    getList();
  }, [keyword, page, size, sort, filterActive, globalSearchDetailData]);

  useEffect(() => {
    if (searchButtonClick) {
      setPage(1); 
      getList();
    }
  }, [searchButtonClick]);

  useEffect(() => {
    getDetail();
  }, [orgnActive]);

  useEffect(() => {
    (async () => {
      let data = [];
      try {
        dispatch(setLoading(true));
        if (se1 == 'search') {
          data = await discoveryAPI.searchCount('search',keyword);
        } else if (se1 == 'discovery') {
          if (se2 == 'keyword') {
            const procKeyword = common.procCountKeyword(keyword, selectKeyword);
            // console.log('procKeyword:', procKeyword);
            data = await discoveryAPI.searchCount('discovery',procKeyword.join('|'));
          } else if (se2 == 'file') {
            data = await discoveryAPI.searchCount('discovery',keyword);
          } else if (se2 == 'project') {
            data = await discoveryAPI.searchCount('discovery',keyword);
          }
        }
      } catch (e) {
        console.warn(e);
      } finally {
        dispatch(setLoading(false));  
      }
      // console.log('count:', data?.data?.result);

      setTabCount({
        'all': data?.data?.result?.countInfo?.all ?? 0,
        1: data?.data?.result?.countInfo?.project ?? 0,
        2: data?.data?.result?.countInfo?.patent ?? 0,
        3: data?.data?.result?.countInfo?.paper ?? 0,
        4: data?.data?.result?.countInfo?.ict_report ?? 0,
        5: data?.data?.result?.countInfo?.policy ?? 0,
        6: data?.data?.result?.countInfo?.indv ?? 0,
        7: data?.data?.result?.countInfo?.orgn ?? 0,
        8: data?.data?.result?.countInfo?.news ?? 0,
      });
    })();
  }, [keyword, se1, se2, selectKeyword]);

  // const tempData1 = [
  //   {
  //     id: 0,
  //     name: '주식회사 마인즈랩(MINDS LAB., INC.)',
  //     assign: '10',
  //     patent: '10',
  //     link: '#',
  //     institue: null,
  //     safety: 2,
  //     sales: 10,
  //     followup: true,
  //   },
  //   {
  //     id: 1,
  //     name: '주식회사 마인즈랩(MINDS LAB., INC.)',
  //     assign: '43',
  //     patent: '10',
  //     link: '#',
  //     institue: 'OOO연구소',
  //     safety: 0,
  //     sales: 5,
  //     followup: false,
  //   },
  //   {
  //     id: 2,
  //     name: '주식회사 마인즈랩(MINDS LAB., INC.)',
  //     assign: '10',
  //     patent: '10',
  //     link: '#',
  //     institue: 'OOO연구소',
  //     safety: 1,
  //     sales: 25,
  //     followup: true,
  //   },
  // ];
  // const tempData2 = [
  //   {
  //     id: 0,
  //     name: '주식회사 마인즈랩',
  //     relation: 0,
  //   },
  //   {
  //     id: 1,
  //     name: '솔트룩스',
  //     relation: 1,
  //   },
  //   {
  //     id: 2,
  //     name: '아이브릭스',
  //     relation: 2,
  //   },
  //   {
  //     id: 3,
  //     name: '주식회사 빅스터',
  //     relation: 3,
  //   },
  //   {
  //     id: 4,
  //     name: '주식회사 빅스터',
  //     relation: 4,
  //   },
  //   {
  //     id: 5,
  //     name: '주식회사 빅스터',
  //     relation: 5,
  //   },
  // ];
  // const tempData3 = [
  //   {
  //     id: 0,
  //     progress: true,
  //     title: '인공지능 학습 및 디지털 트윈을 위한 3차원 데이터 수집·전처리 및 가공 플랫폼 개발',
  //     price: '10억',
  //     period: '2023.04.01 ~ 2024.04.30',
  //     agency: '주식회사 오름',
  //     name: '홍길동',
  //     department: '중소벤처기업부',
  //     performance: '논문(1), 특허(3)',
  //     division: '정보 / 통신 / 소프트웨어 / S/W솔루션 ',
  //     keyword: '3D 데이터, 디지털 트윈, 지능형 데이터 가공 플랫폼, 깊이 추정',
  //   },
  //   {
  //     id: 1,
  //     progress: false,
  //     title: '인공지능 학습 및 디지털 트윈을 위한 3차원 데이터 수집·전처리 및 가공 플랫폼 개발',
  //     price: '10억',
  //     period: '2023.04.01 ~ 2024.04.30',
  //     agency: '주식회사 오름',
  //     name: '홍길동',
  //     department: '중소벤처기업부',
  //     performance: '논문(1), 특허(3)',
  //     division: '정보 / 통신 / 소프트웨어 / S/W솔루션 ',
  //     keyword: '3D 데이터, 디지털 트윈, 지능형 데이터 가공 플랫폼, 깊이 추정',
  //   },
  // ];

  return (
    <DiscoveryResultLayout totalCount={tabCount?.all} tabCount={tabCount} keyword={keyword} setSearchButtonClick={setSearchButtonClick} >
      <section className='mt-6'>
        <div className='container'>
          <div className='flex items-center justify-between'>
            <h4 className='text-base font-bold text-color-dark'>
              기관 <span className='text-color-main'>{common.setPriceInput(totalCount)}건</span>
            </h4>
            <div className='flex gap-4'>
              <Button className='gap-2 h-12 px-4 rounded text-sm font-bold btn_style04 mr-2' name='목록 다운로드' icon={icArrow} onClick={downExcel} />
              <div>
                <label htmlFor='sort_order' className='hidden_text'>정렬 순서</label>
                <select name='sort_order' id='sort_order' onChange={(e) => {setPage(1); setSort(e.target.value);}}>
                  <option value='score'>관련도순</option>
                  <option value='name'>이름순</option>
                </select>
              </div>
              <div>
                <label htmlFor='list_num' className='hidden_text'>노출되는 목록수</label>
                <select name='list_num' id='list_num' onChange={(e) => {setPage(1); setSize(e.target.value);}}>
                  <option value='10'>10</option>
                  <option value='20'>20</option>
                  <option value='30'>30</option>
                  <option value='50'>50</option>
                  <option value='100'>100</option>
                </select>
              </div>
              <Button className={`gap-2 h-12 px-4 rounded text-sm font-bold btn_style01${filterShow ? ' on' : ''}`} name='필터' icon={filterShow ? icFilter02 : icFilter} onClick={() => setFilterShow(state => !state)} />
            </div>
          </div>

          {filterShow && <Filter filterItem={filterItem} filterKey={filterKey} />}
          
          <div className='flex items-start gap-6 mt-2'>
            <div className='w-120'>
              <div className='list_style02'>
                <ul>
                  {(projectData?.length > 0)
                    ? projectData?.map((e) => {
                      return (
                        <li 
                          key={e.id} 
                          className={`flex items-center gap-4${(e.id === orgnActive.id) ? ' on' : ''}`}
                          onClick={(event) => onOrgnSelect(event, e.id, e.name)} 
                          onKeyUp={(event) => (event.key === 'Enter') && onOrgnSelect(event, e.id, e.name)} 
                          role={'button'}
                          tabIndex={0}
                        >
                          <div className='tooltip_wrap' tabIndex={0}>
                            {(e.safety === 0) 
                              ? <>
                                <img src={imgBuilding01} alt='기관 재무안전성: 위험 이미지' className='w-11' />
                                <span className='tooltip_style01 min-w-23'>재무안전성: 위험</span>
                              </>
                              : (e.safety === 1) 
                                ? <>
                                  <img src={imgBuilding02} alt='기관 재무안전성: 보통 이미지' className='w-11' />
                                  <div className='tooltip_style02 min-w-23'>재무안전성: 보통</div>
                                </>
                                : <>
                                  <img src={imgBuilding03} alt='기관 재무안전성: 안정 이미지' className='w-11' />
                                  <div className='tooltip_style03 min-w-23'>재무안전성: 안정</div>
                                </>}
                          </div>
                          <div className='conts_box'>
                            <div className='flex items-center justify-between gap-2'>
                              <p className='text-base font-bold text-color-main line1_text flex-1'>{e.name}</p>
                              <div className='flex items-center gap-2'>
                                <div className='tooltip_wrap' tabIndex={0}>
                                  {e.sales !== '' ? <span className="tag_style03">{e.sales}</span> : null}
                                  <div className='tooltip_style04 min-w-30'>해당 산업 매출상위(%)</div>
                                </div>
                                {(e.followup)
                                && (
                                  <div className='tooltip_wrap' tabIndex={0}>
                                    <span className="tag_style04">사후</span>
                                    <div className='tooltip_style04 min-w-25'>사후관리 대상 기업</div>
                                  </div>
                                )
                                }
                              </div>
                              <NavLink to={`/view/orgn/${e.id}`} className='h-5 px-1.5 rounded-sm text-xs font-medium text-color-white bg-color-light1 min-w-17'>기관 보기↗</NavLink>
                            </div>
                            <div className='text_style01'>
                              <p className='text-sm text-color-regular'>과제: <span className='font-medium text-color-main'>{e.assign}건</span></p>
                              <p className='text-sm text-color-regular'>특허: <span className='font-medium text-color-main'>{e.patent}건</span></p>
                              {(e?.institue) && <p className='text-sm text-color-regular'>부설연구소: <span className='font-medium text-color-main'>{e.institue}</span></p>}
                            </div>
                          </div>
                        </li>
                      );
                    })
                    : <li>
                      <p className='text-base text-color-placeholder'>데이터가 없습니다.</p>
                    </li>
                  }
                </ul>
              </div>
              <div className='mt-10'>
                <Pagination total={totalCount} page={page} onClick={(page) => setPage(page)} />
              </div>
            </div>
            <div className='flex-1 p-4 pb-10 bg-color-f_bg'>
              <div>
                <h5 className='text-base font-bold text-color-dark'>{orgnActive.name} 유사 기관</h5>
                <ul className='flex mt-4'>
                  {simialityOrgn?.map((e, i) => {
                    let imgSrc = '';
                    if(e.relation === 0) {
                      imgSrc = imgBuilding04;
                    } else if(e.relation === 1) {
                      imgSrc = imgBuilding05;
                    } else if(e.relation === 2) {
                      imgSrc = imgBuilding06;
                    } else if(e.relation === 3) {
                      imgSrc = imgBuilding07;
                    } else if(e.relation === 4) {
                      imgSrc = imgBuilding08;
                    } else if(e.relation === 5) {
                      imgSrc = imgBuilding09;
                    }

                    return <li key={e.id} className='w-1/6 px-1'>
                      <div className={`img_wrap rounded-full w-15 h-15 mx-auto ${(i === 0) ? 'bg-color-light2' : 'bg-color-white'}`}>
                        <img src={imgSrc} alt='기관 이미지' className='w-11' />
                      </div>
                      <p className={`mt-1 text-sm text-center ${(i === 0) ? 'text-color-main' : 'text-color-dark'}`}>{e.name}</p>
                    </li>;
                  })}
                </ul>
              </div>
              <div className='mt-10'>
                <div className='flex items-center gap-5'>
                  <h5 className='text-base font-bold text-color-dark'>{orgnActive.name}</h5>
                  <div className='tab_btns tab_style05'>
                    <ul>
                      <li className={(subListMode === 'project')? 'on' : ''}>
                        <button type='button' onClick={() => setSubListMode('project')}>과제({common.setPriceInput(subProjectList.length)})</button>
                      </li>
                      <li className={(subListMode === 'patent')? 'on' : ''}>
                        <button type='button' onClick={() => setSubListMode('patent')}>특허({common.setPriceInput(subPatentList.length)})</button>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className='list_style01 mt-4'>
                  <ul>
                    {
                      (subListMode === 'project') ?
                        (subProjectList?.length > 0) 
                          ? subProjectList?.map((e) => {
                            return  <ListItem 
                              key={e.id}
                              tag={(e?.progress !== null) 
                                ? (e.progress) ? 1 : 2 
                                : ''}
                              title={e.title}
                              contents={<>
                                <div>
                                  <p className='text-sm text-color-regular'>연구 개발비: <span className='font-medium text-color-main'>{e.price}</span></p>
                                  <p className='text-sm text-color-regular'>연구 개발기간: <span className='font-medium text-color-main'>{e.period}</span></p>
                                  <p className='text-sm text-color-regular'>연구 개발기관: <span className='font-medium text-color-main'>{e.agency}</span></p>
                                  <p className='text-sm text-color-regular'>연구 책임자: <span className='font-medium text-color-main'>{e.name}</span></p>
                                </div>
                                <div>
                                  <p className='text-sm text-color-regular'>부처명: <span className='font-medium text-color-main'>{e.department}</span></p>
                                  <p className='text-sm text-color-regular'>연구 개발성과: <span className='font-medium text-color-main'>{e.performance}</span></p>
                                  <p className='text-sm text-color-regular'>국가과학기술표준분류: <span className='font-medium text-color-main'>{e.division}</span></p>
                                </div>
                                <p className='text-sm text-color-regular'>한글 키워드: <span className='font-medium text-color-main'>{e.keyword}</span></p>
                              </>}
                              desc={<>
                                <NavLink to={`/view/projectout/${e.id}`} className='h-5 text-base font-bold text-color-footer'>더보기 ＋</NavLink>
                              </>}
                            />;
                          })
                          : <li>
                            <p className='text-base text-color-placeholder'>데이터가 없습니다.</p>
                          </li>
                        : null
                    }
                    {
                      (subListMode === 'patent') ?
                        (subPatentList?.length > 0) 
                          ? subPatentList?.map((e) => {
                            return  <ListItem 
                              key={e.id}
                              tag={(e?.progress !== null) 
                                ? (e.progress) ? 1 : 2 
                                : ''}
                              title={e.title}
                              contents={<>
                                <div>
                                  <p className='text-sm text-color-regular'>유발 과제: <span className='font-medium text-color-main'>{e.project}</span></p>
                                  <p className='text-sm text-color-regular'>출원등록구분: <span className='font-medium text-color-main'>{e.division}</span></p>
                                  <p className='text-sm text-color-regular'>출원(등록)번호: <span className='font-medium text-color-main'>{e.num}</span></p>
                                </div>
                                <div>
                                  <p className='text-sm text-color-regular'>출원(등록)일: <span className='font-medium text-color-main'>{e.date}</span></p>
                                  <p className='text-sm text-color-regular'>출원(등록)인: <span className='font-medium text-color-main'>{e.agency}</span></p>
                                  <p className='text-sm text-color-regular'>발명자: <span className='font-medium text-color-main'>{e.name}</span></p>
                                </div>
                              </>}
                              desc={<>
                                <NavLink to={`/view/patent/${e.id}`} className='h-5 text-base font-bold text-color-footer'>더보기 ＋</NavLink>
                              </>}
                            />;
                          })
                          : <li>
                            <p className='text-base text-color-placeholder'>데이터가 없습니다.</p>
                          </li>
                        : null
                    }
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </DiscoveryResultLayout>
  );
}
